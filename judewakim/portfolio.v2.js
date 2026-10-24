/* Hamburger menu: toggles the panel, closes on Escape or outside click,
   returns focus to the button. Versioned filename (CloudFront isn't invalidated). */
(function () {
  'use strict';
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (!btn || !menu) return;

  function set(open) {
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  btn.addEventListener('click', function () { set(menu.hidden); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) { set(false); btn.focus(); }
  });

  document.addEventListener('click', function (e) {
    if (!menu.hidden && !menu.contains(e.target) && !btn.contains(e.target)) set(false);
  });
})();
