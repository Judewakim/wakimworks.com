/* WakimWorks LLC — behavior.
   A hairline on the nav once you scroll, the footer year, and a lightbox for
   the product screenshots. Versioned filename; bump it whenever this file
   changes, because the deploy pipeline never invalidates CloudFront. */
(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  if (nav) {
    var syncNav = function () { nav.classList.toggle('is-stuck', window.scrollY > 16); };
    window.addEventListener('scroll', syncNav, { passive: true });
    syncNav();
  }

  /* --- lightbox ---------------------------------------------------------- *
   * <dialog> gives focus trapping, Escape-to-close and the backdrop for free,
   * so there is no hand-rolled focus management to get wrong. Browsers without
   * showModal() just open the image in a new tab.                            */
  var dlg = document.getElementById('lightbox');
  var dlgImg = document.getElementById('lightboxImg');
  var dlgClose = document.getElementById('lightboxClose');
  var buttons = document.querySelectorAll('.shot__btn');

  Array.prototype.forEach.call(buttons, function (btn) {
    var thumb = btn.querySelector('img');
    var full = btn.getAttribute('data-full') || (thumb && thumb.getAttribute('src'));

    // the button's accessible name comes from the image it wraps
    if (thumb && thumb.alt) btn.setAttribute('aria-label', 'Enlarge: ' + thumb.alt);

    btn.addEventListener('click', function () {
      if (!dlg || typeof dlg.showModal !== 'function') {
        window.open(full, '_blank', 'noopener');
        return;
      }
      dlgImg.src = full;
      dlgImg.alt = thumb ? thumb.alt : '';
      dlg.showModal();
    });
  });

  if (dlg) {
    if (dlgClose) dlgClose.addEventListener('click', function () { dlg.close(); });

    // a click that lands on the dialog box itself (i.e. outside the image) closes
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

    // drop the src on close so a large image isn't held decoded in memory
    dlg.addEventListener('close', function () { dlgImg.removeAttribute('src'); });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
