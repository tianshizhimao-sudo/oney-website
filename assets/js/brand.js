// Oney & Co — shared interactive behaviour (theme, fade-up, mobile nav)
(function () {
  // Theme switcher (shared storage key with homepage)
  var stored = localStorage.getItem('oney-theme') || 'dark';
  document.documentElement.classList.add('no-transition');
  document.documentElement.setAttribute('data-theme', stored);
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.documentElement.classList.remove('no-transition');
    });
  });

  function syncDots(theme) {
    document.querySelectorAll('.theme-dot').forEach(function (d) {
      var active = d.dataset.theme === theme;
      d.classList.toggle('active', active);
      d.setAttribute('aria-checked', String(active));
    });
  }
  syncDots(stored);

  var sw = document.querySelector('.theme-switcher');
  if (sw) {
    sw.addEventListener('click', function (e) {
      var dot = e.target.closest('.theme-dot');
      if (!dot) return;
      var t = dot.dataset.theme;
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('oney-theme', t);
      syncDots(t);
    });
    sw.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (e.target.click) e.target.click();
      }
    });
  }

  // Fade-up reveal (idempotent — safe to call multiple times)
  window.oneyRevealFadeUps = function () {
    var items = document.querySelectorAll('.fade-up:not(.visible)');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { observer.observe(el); });
  };
  window.oneyRevealFadeUps();

  // Mobile nav dropdown tap support
  if ('ontouchstart' in window || window.innerWidth <= 768) {
    document.querySelectorAll('.nav-dropdown-toggle').forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        this.closest('.nav-dropdown').classList.toggle('dropdown-open');
      });
    });
  }
})();
