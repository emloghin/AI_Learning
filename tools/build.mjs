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
// Optional rich layout: "groups" in site.json turns on the sidebar, table of contents,
// labelled code blocks and study-progress features. Sites without it build exactly as before.
const rich = Array.isArray(cfg.groups);
const pages = rich ? cfg.groups.flatMap(g => g.pages) : cfg.pages;
if (rich && existsSync(join(docs, 'site.js'))) copyFileSync(join(docs, 'site.js'), join(out, 'site.js'));
const CODE_KINDS = {
  terminal: ['term', 'Terminal'], powershell: ['term', 'Terminal'], shell: ['term', 'Terminal'], bash: ['term', 'Terminal'],
  chat: ['chat', 'Agent chat'], prompt: ['chat', 'Prompt'],
  json: ['file', 'JSON'], yaml: ['file', 'YAML'], python: ['file', 'Python'], markdown: ['file', 'Markdown'], file: ['file', 'File'],
};

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
  // Links in the hero paragraph need the same .md -> .html rewrite as the body.
  const introHtml = marked.parseInline(intro).replace(/href="([\w-]+)\.md(#[^"]*)?"/g, 'href="$1.html$2"');
  return { title, badge, intro: introHtml, body: lines.join('\n') };
}

function inlineSvg(src) {
  return readFileSync(join(docs, src), 'utf8').replace(/^\uFEFF?<\?xml[^>]*>\s*/, '');
}

function transform(html) {
  html = html.replace(/<hr>\s*/g, '');

  html = html.replace(/<p><img src="(images\/[^"]+\.svg)" alt="([^"]*)"\s*\/?><\/p>\s*(?:<p><em>([\s\S]*?)<\/em><\/p>)?/g,
    (_, src, alt, cap) => `<div class="diagram-wrap">${inlineSvg(src)}${cap ? `<div class="diagram-caption">${cap}</div>` : ''}</div>`);

  html = html.replace(/<pre><code(?: class="language-([\w-]+)")?[^>]*>([\s\S]*?)<\/code><\/pre>/g, (_, lang, code) => {
    const block = `<div class="code-block">${code.replace(/\n$/, '')}</div>`;
    if (!rich) return block;
    const [kind, label] = CODE_KINDS[lang] || ['plain', ''];
    return `<div class="code-wrap ${kind}"><div class="code-head"><span class="code-label">${label}</span>` +
      `<button class="copy-btn" type="button">Copy</button></div>${block}</div>`;
  });

  html = html.replace(/<table>([\s\S]*?)<\/table>/g, '<div class="table-wrap"><table>$1</table></div>');

  html = html.replace(/<blockquote>\s*([\s\S]*?)\s*<\/blockquote>/g, (_, inner) => {
    const lead = inner.replace(/<[^>]+>/g, '').trim().slice(0, 4);
    const cls = /⚠/.test(lead) ? ' warning'
      : /✅/.test(lead) ? ' success'
      : /📘|💡|🎯|🎬|🚀/u.test(lead) ? ' tip'
      : /⚠️|Trap|Warning|Anti-pattern/i.test(inner) ? ' warning' : '';
    return `<div class="callout${cls}">${inner}</div>`;
  });

  // Practice-question answers hide behind a native <details> reveal.
  html = html.replace(/<div class="callout success"><p><strong>✅ Answer:<\/strong>([\s\S]*?)<\/p><\/div>/g,
    (_, body) => `<details class="reveal-answer"><summary>Show answer</summary><div class="callout success"><p><strong>✅ Answer:</strong>${body}</p></div></details>`);

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
    (m, links) => !/[←→]/.test(links) ? m : rich ? '' : `<div class="nav-links">${links.replace(/\s*[·|]\s*/g, '')}</div>`);

  // Wrap each h2 block in a section.
  if (!rich) return html.split(/(?=<h2 )/).map(s => s.trim() ? `<div class="section">\n${s}\n</div>` : '').join('\n');
  const sections = html.split(/(?=<h2 )/).filter(s => s.trim());
  // Rich layout: a heading followed by <!-- optional --> becomes a collapsed "deep dive".
  const pill = '<span class="optional-pill">Optional deep dive</span>';
  return sections.map(sec => {
    sec = sec.trim().replace(/(<h3 id="[^"]*">(?:(?!<\/h3>)[\s\S])*<\/h3>)\s*<!-- optional -->([\s\S]*?)(?=<h3 |$)/g,
      (_, h3, body) => `<details class="optional sub"><summary>${h3}${pill}</summary>\n${body.trim()}\n</details>\n`);
    const m = sec.match(/^(<h2 id="[^"]*">(?:(?!<\/h2>)[\s\S])*<\/h2>)\s*<!-- optional -->([\s\S]*)$/);
    return m
      ? `<details class="section optional"><summary>${m[1]}${pill}</summary>\n${m[2].trim()}\n</details>`
      : `<div class="section">\n${sec}\n</div>`;
  }).join('\n');
}

function richPage(name, idx) {
  const md = readFileSync(join(docs, `${name}.md`), 'utf8');
  const { title, badge, intro, body } = hero(md, name);
  const main = transform(marked.parse(body));
  const plain = title.replace(/<[^>]+>/g, '');
  // Reading time for the core path; optional deep dives are counted separately.
  const words = t => t.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).length;
  let optionalMd = '';
  // An optional h2 includes its h3 children; an optional h3 ends at the next heading.
  for (const m of md.matchAll(/^(#{2,3}) [^\r\n]*(?:\r?\n)+<!-- optional -->\r?\n/gm)) {
    const rest = md.slice(m.index + m[0].length);
    const stop = rest.search(m[1].length === 2 ? /^## /m : /^#{2,3} /m);
    optionalMd += stop < 0 ? rest : rest.slice(0, stop);
  }
  const optMinutes = optionalMd ? Math.max(1, Math.round(words(optionalMd) / 200)) : 0;
  const minutes = Math.max(1, Math.round((words(md) - (optionalMd ? words(optionalMd) : 0)) / 200));
  const group = cfg.groups.find(g => g.pages.some(([p]) => p === name));
  const toc = [...main.matchAll(/<h2 id="([^"]*)">([\s\S]*?)<\/h2>/g)]
    .map(([, id, text]) => `<a href="#${id}">${text.replace(/<[^>]+>/g, '')}</a>`).join('\n');
  const nav = cfg.groups.map(g => `<div class="nav-group${g === group ? ' current' : ''}">
<div class="nav-group-title">${g.title}<span class="nav-count"></span></div>
${g.pages.map(([p, label]) => `<a href="${p}.html" data-page="${p}"${p === name ? ' class="active" aria-current="page"' : ''}>${label}</a>`).join('\n')}
</div>`).join('\n');
  const prev = pages[idx - 1], next = pages[idx + 1];
  const pager = `<div class="pager">
${prev ? `<a class="pager-prev" href="${prev[0]}.html"><span>← Previous</span><strong>${prev[1]}</strong></a>` : '<span></span>'}
${next ? `<a class="pager-next" href="${next[0]}.html"><span>Next →</span><strong>${next[1]}</strong></a>` : '<span></span>'}
</div>`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${plain} — ${cfg.titleSuffix}</title>
<script>try{var t=localStorage.getItem('ailearn:theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body data-page="${name}">
<div class="read-progress" aria-hidden="true"><div></div></div>
<header class="topbar">
  <button class="icon-btn menu-btn" type="button" aria-label="Open navigation" aria-expanded="false">☰</button>
  <a class="header-logo" href="index.html"><span>${cfg.logo[0]}</span>${cfg.logo[1]}</a>
  <span class="topbar-crumb">${group.title} <b>›</b> ${pages[idx][1]}</span>
  <span class="topbar-progress" title="Pages you marked as done"></span>
  <button class="icon-btn theme-btn" type="button" aria-label="Switch between light and dark theme">◐</button>
</header>
<div class="shell">
<aside class="sidebar" aria-label="Site navigation">
<nav>
${nav}
</nav>
</aside>
<div class="content">
<section class="hero">
  <div class="hero-badge">${badge}</div>
  <h1>${marked.parseInline(title)}</h1>
  <p>${intro}</p>
  <div class="hero-meta"><span>⏱ about ${minutes} min of reading</span>${optMinutes ? `<span>+ ${optMinutes} min optional</span>` : ''}<span>Page ${idx + 1} of ${pages.length}</span></div>
</section>
<main class="main">
${toc ? `<details class="toc-inline"><summary>On this page</summary><nav>${toc}</nav></details>` : ''}
${main}
<div class="done-row"><button class="done-btn" type="button" aria-pressed="false">Mark this page as done</button></div>
${pager}
</main>
<footer class="site-footer">${cfg.footer}</footer>
</div>
<aside class="toc-rail" aria-label="On this page">
${toc ? `<div class="toc-title">On this page</div><nav>${toc}</nav>` : ''}
</aside>
</div>
<div class="scrim"></div>
<script src="site.js"></script>
</body>
</html>
`;
}

for (const [idx, [name]] of pages.entries()) {
  if (rich) {
    writeFileSync(join(out, `${name}.html`), richPage(name, idx));
    console.log(`${outLabel}/${name}.html`);
    continue;
  }

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
