(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;

  /* ---------- Menu mobile ---------- */
  var sidebar = $('#sidebar'), backdrop = $('#backdrop'), menuBtn = $('#menuBtn');
  function toggleMenu(open) {
    sidebar.classList.toggle('open', open);
    backdrop.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', function () { toggleMenu(!sidebar.classList.contains('open')); });
  backdrop.addEventListener('click', function () { toggleMenu(false); });
  $$('a', sidebar).forEach(function (a) { a.addEventListener('click', function () { toggleMenu(false); }); });

  /* ---------- Thème clair / sombre ---------- */
  $('#themeBtn').addEventListener('click', function () {
    var current = root.dataset.theme;
    if (current === 'auto' || !current) {
      current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    var next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ---------- Impression ---------- */
  $('#printBtn').addEventListener('click', function () { window.print(); });

  /* ---------- Recherche d'appareils ---------- */
  var search = $('#search');
  var chapters = $$('.chapter, .cover');
  var noResult = $('#no-result');
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  function runSearch() {
    var q = norm(search.value.trim());
    var anyVisible = false;
    chapters.forEach(function (ch) {
      var tables = $$('table.devices', ch);
      if (!q) { ch.classList.remove('hide'); $$('tr.hide', ch).forEach(function (r) { r.classList.remove('hide'); }); return; }
      if (!tables.length) { ch.classList.add('hide'); return; }
      var count = 0;
      $$('tbody tr', ch).forEach(function (tr) {
        var ok = norm(tr.textContent).indexOf(q) !== -1;
        tr.classList.toggle('hide', !ok);
        if (ok) count++;
      });
      ch.classList.toggle('hide', count === 0);
      if (count) anyVisible = true;
    });
    noResult.hidden = !q || anyVisible;
  }
  var timer;
  search.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(runSearch, 120); });

  /* ---------- Scrollspy ---------- */
  var links = $$('a[href^="#"]', sidebar);
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (l) { l.classList.remove('active'); });
          map[en.target.id].classList.add('active');
          map[en.target.id].scrollIntoView({ block: 'nearest' });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- Bouton retour en haut ---------- */
  var toTop = $('#toTop');
  window.addEventListener('scroll', function () { toTop.hidden = window.scrollY < 600; }, { passive: true });
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0 }); });

  /* ---------- Lightbox ---------- */
  var lb = $('#lightbox'), lbImg = $('img', lb), lbCap = $('.lb-caption', lb);
  function closeLb() { lb.hidden = true; lbImg.removeAttribute('src'); }
  $$('figure img').forEach(function (img) {
    img.addEventListener('click', function () {
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = img.alt;
      lb.hidden = false;
    });
  });
  lb.addEventListener('click', closeLb);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeLb(); toggleMenu(false); }
  });
})();
