// AI Learn — small progressive enhancements. The pages read fine without this file.
(function () {
  var root = document.documentElement, body = document.body, page = body.dataset.page;
  var store = {
    get: function (k) { try { return localStorage.getItem('ailearn:' + k); } catch (e) { return null; } },
    set: function (k, v) { try { v === null ? localStorage.removeItem('ailearn:' + k) : localStorage.setItem('ailearn:' + k, v); } catch (e) {} }
  };
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  // Theme toggle
  var themeBtn = $('.theme-btn');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    store.set('theme', root.dataset.theme);
  });

  // Mobile navigation drawer
  var menuBtn = $('.menu-btn');
  function setNav(open) { body.classList.toggle('nav-open', open); if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open)); }
  if (menuBtn) menuBtn.addEventListener('click', function () { setNav(!body.classList.contains('nav-open')); });
  var scrim = $('.scrim'); if (scrim) scrim.addEventListener('click', function () { setNav(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });
  var active = $('.sidebar a.active'); if (active && active.scrollIntoView) active.scrollIntoView({ block: 'center' });

  // Reading progress bar
  var bar = $('.read-progress div');
  function onScroll() {
    var max = root.scrollHeight - innerHeight;
    if (bar) bar.style.width = (max > 0 ? Math.min(100, scrollY / max * 100) : 0) + '%';
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Copy buttons on code blocks
  $$('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = $('.code-block', btn.closest('.code-wrap')).textContent;
      var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy'; }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () {});
    });
  });

  // "Mark this page as done" + progress in the sidebar and top bar
  var doneBtn = $('.done-btn');
  function isDone(p) { return store.get('done:' + p) === '1'; }
  function paintProgress() {
    var links = $$('.sidebar a[data-page]'), total = links.length, count = 0;
    links.forEach(function (a) { var d = isDone(a.dataset.page); a.classList.toggle('done', d); if (d) count++; });
    $$('.nav-group').forEach(function (g) {
      var ls = $$('a[data-page]', g), n = ls.filter(function (a) { return a.classList.contains('done'); }).length;
      $('.nav-count', g).textContent = n ? n + '/' + ls.length : '';
    });
    var tp = $('.topbar-progress'); if (tp) tp.textContent = count ? count + ' of ' + total + ' done' : '';
    if (doneBtn) {
      var d = isDone(page);
      doneBtn.classList.toggle('is-done', d);
      doneBtn.setAttribute('aria-pressed', String(d));
      doneBtn.textContent = d ? '✓ Done — click to undo' : 'Mark this page as done';
    }
  }
  if (doneBtn) doneBtn.addEventListener('click', function () { store.set('done:' + page, isDone(page) ? null : '1'); paintProgress(); });
  paintProgress();

  // Checklists (- [ ] items) become tickable and are remembered in this browser
  $$('.main input[type=checkbox]').forEach(function (box, i) {
    var key = 'check:' + page + ':' + i;
    box.disabled = false;
    box.checked = store.get(key) === '1';
    box.addEventListener('change', function () { store.set(key, box.checked ? '1' : null); });
  });

  // Optional deep dives: open one when a link points into it, and open all for printing
  function openForHash() {
    if (!location.hash) return;
    var target; try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) { return; }
    for (var el = target; el; el = el.parentElement) { if (el.tagName === 'DETAILS') el.open = true; }
    if (target && target.scrollIntoView) target.scrollIntoView();
  }
  addEventListener('hashchange', openForHash); openForHash();
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (a && a.getAttribute('href') === location.hash) openForHash();
  });
  addEventListener('beforeprint', function () { $$('details.optional').forEach(function (d) { d.open = true; }); });

  // Highlight the current section in the "On this page" list
  var tocLinks = $$('.toc-rail a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {}; tocLinks.forEach(function (a) { byId[decodeURIComponent(a.hash.slice(1))] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.remove('here'); });
        var a = byId[en.target.id]; if (a) a.classList.add('here');
      });
    }, { rootMargin: '-70px 0px -70% 0px' });
    $$('.main h2[id]').forEach(function (h) { io.observe(h); });
  }
})();
