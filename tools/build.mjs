// Builds <root>/site/*.html from <root>/docs/*.md for a site folder under the repo root.
// Usage: node tools/build.mjs            -> gh-600 site
//        node tools/build.mjs ai-fundamentals  -> ai-fundamentals site, configured by ai-fundamentals/docs/site.json
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
const root = join(repo, process.argv[2] || 'gh-600');
const docs = join(root, 'docs');
const out = join(root, 'site');
const outLabel = process.argv[2] ? `${process.argv[2]}/site` : 'site';
mkdirSync(out, { recursive: true });
copyFileSync(join(docs, 'style.css'), join(out, 'style.css'));

const cfgPath = join(docs, 'site.json');
const cfg = {
  logo: ['GH-', '600'],
  badge: 'GH-600 · Corrected study guide',
  titleSuffix: 'GH-600 Study',
  footer: 'GH-600 Study Guide (corrected) · Based on official Microsoft Learn modules and GitHub Docs · Not affiliated with GitHub or Microsoft',
  pages: [
    ['index', 'Home'], ['basics', 'Start Here'], ['domain-1', 'D1: Architecture'], ['domain-2', 'D2: Tooling &amp; MCP'],
    ['domain-3', 'D3: Memory &amp; State'], ['domain-4', 'D4: Evaluation'], ['domain-5', 'D5: Multi-Agent'],
    ['domain-6', 'D6: Guardrails'], ['glossary', 'Glossary'], ['resources', 'Resources'],
  ],
  ...(existsSync(cfgPath) ? JSON.parse(readFileSync(cfgPath, 'utf8')) : {}),
};
const pages = cfg.pages;

const slug = s => s.replace(/<[^>]+>/g, '').replace(/&[a-z#0-9]+;/gi, '').toLowerCase().trim()
  .replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

function hero(md, name) {
  const lines = md.split(/\r?\n/);
  const h1Idx = lines.findIndex(l => l.startsWith('# '));
  const title = lines[h1Idx].slice(2).trim();
  lines.splice(h1Idx, 1);

  let badge = cfg.badge;
  const wIdx = lines.findIndex(l => /^\*\*[^*]*Weight[^*]*\*\*/.test(l));
  if (wIdx >= 0) {
    const m = lines[wIdx].match(/^\*\*([^*]*)\*\*/);
    badge = m[1].trim();
    const num = name.match(/^domain-(\d)/);
    if (num && !badge.startsWith('Domain')) badge = `Domain ${num[1]} · ${badge}`;
    const rest = lines[wIdx].slice(m[0].length).trim();
    lines[wIdx] = rest;
  } else {
    // A standalone bold line (e.g. "**Beginner primer**") becomes the badge.
    const bIdx = lines.findIndex(l => /^\*\*[^*]+\*\*$/.test(l.trim()));
    if (bIdx >= 0 && bIdx < 4) { badge = lines[bIdx].trim().slice(2, -2); lines[bIdx] = ''; }
  }

  // First plain paragraph becomes the hero text.
  let intro = '';
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!l || l.startsWith('>') || l.startsWith('#') || l.startsWith('|') || /Navigation:/.test(l) || l === '---') continue;
    intro = l;
    lines.splice(i, 1);
    break;
  }
  return { title, badge, intro: marked.parseInline(intro), body: lines.join('\n') };
}

function inlineSvg(src) {
  return readFileSync(join(docs, src), 'utf8').replace(/^\uFEFF?<\?xml[^>]*>\s*/, '');
}

function transform(html) {
  html = html.replace(/<hr>\s*/g, '');

  html = html.replace(/<p><img src="(images\/[^"]+\.svg)" alt="([^"]*)"\s*\/?><\/p>\s*(?:<p><em>([\s\S]*?)<\/em><\/p>)?/g,
    (_, src, alt, cap) => `<div class="diagram-wrap">${inlineSvg(src)}${cap ? `<div class="diagram-caption">${cap}</div>` : ''}</div>`);

  html = html.replace(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g, (_, code) => `<div class="code-block">${code.replace(/\n$/, '')}</div>`);

  html = html.replace(/<table>([\s\S]*?)<\/table>/g, '<div class="table-wrap"><table>$1</table></div>');

  html = html.replace(/<blockquote>\s*([\s\S]*?)\s*<\/blockquote>/g, (_, inner) => {
    const lead = inner.replace(/<[^>]+>/g, '').trim().slice(0, 4);
    const cls = /⚠/.test(lead) ? ' warning'
      : /✅/.test(lead) ? ' success'
      : /📘|💡|🎯|🎬|🚀/u.test(lead) ? ' tip'
      : /⚠️|Trap|Warning|Anti-pattern/i.test(inner) ? ' warning' : '';
    return `<div class="callout${cls}">${inner}</div>`;
  });

  html = html.replace(/href="([\w-]+)\.md(#[^"]*)?"/g, 'href="$1.html$2"');
  html = html.replace(/<a href="(https?:[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener"');

  html = html.replace(/<(h[23])>([\s\S]*?)<\/\1>/g, (_, tag, text) => `<${tag} id="${slug(text)}">${text}</${tag}>`);

  // Index: domain summaries become domain cards.
  html = html.replace(/<h3 id="[^"]*">Domain (\d) · (.+?) — (.+?)<\/h3>\s*<p>([\s\S]+?)<\/p>\s*<p><a href="([^"]+)">Study this domain →<\/a><\/p>/g,
    (_, n, weight, title, desc, href) => `<div class="domain-card"><div class="domain-num">Domain ${n} · ${weight}</div>` +
      `<h3>${title}</h3><p>${desc}</p><span class="weight${/Heaviest/.test(weight) ? ' heavy' : ''}">Weight: ${weight}</span> ` +
      `&nbsp;<a href="${href}">Study this domain →</a></div>`);

  // A trailing paragraph of prev/next links becomes the nav bar.
  html = html.replace(/<p>((?:\s*(?:<a [^>]+>[^<]*<\/a>)\s*[·|]?)+)<\/p>\s*$/,
    (m, links) => /[←→]/.test(links) ? `<div class="nav-links">${links.replace(/\s*[·|]\s*/g, '')}</div>` : m);

  // Wrap each h2 block in a section.
  return html.split(/(?=<h2 )/).map(s => s.trim() ? `<div class="section">\n${s}\n</div>` : '').join('\n');
}

for (const [name] of pages) {
  const { title, badge, intro, body } = hero(readFileSync(join(docs, `${name}.md`), 'utf8'), name);
  const nav = pages.map(([p, label]) => `      <a href="${p}.html"${p === name ? ' class="active"' : ''}>${label}</a>`).join('\n');
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title.replace(/<[^>]+>/g, '')} — ${cfg.titleSuffix}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
<style>.section td code,.callout code,.diagram-caption code{background:var(--primary-light);color:var(--primary);padding:1px 5px;border-radius:4px;font-family:var(--mono);font-size:13px}.callout p+p{margin-top:8px}.callout ul{margin:8px 0 0 20px}</style>
</head>
<body>

<header class="site-header">
  <div class="header-inner">
    <div class="header-logo"><span>${cfg.logo[0]}</span>${cfg.logo[1]}</div>
    <nav class="header-nav">
${nav}
    </nav>
  </div>
</header>

<section class="hero">
  <div class="hero-badge">${badge}</div>
  <h1>${marked.parseInline(title)}</h1>
  <p>${intro}</p>
</section>

<main class="main">
${transform(marked.parse(body))}
</main>

<footer class="site-footer">${cfg.footer}</footer>
</body>
</html>
`;
  writeFileSync(join(out, `${name}.html`), html);
  console.log(`${outLabel}/${name}.html`);
}
