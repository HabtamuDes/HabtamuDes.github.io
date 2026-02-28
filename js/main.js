(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute('href');
    if (id === '#') return;
    a.addEventListener('click', function (e) {
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Project cards: open modal
  document.querySelectorAll('.project-card[data-modal]').forEach(function (card) {
    card.addEventListener('click', function () {
      var id = card.getAttribute('data-modal');
      var modal = document.getElementById(id);
      if (modal) {
        modal.removeAttribute('hidden');
        modal.setAttribute('data-open', 'true');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal: backdrop or close button
  document.querySelectorAll('.modal-backdrop[data-close], .modal-close[data-close]').forEach(function (el) {
    el.addEventListener('click', function () {
      var modal = el.closest('.modal');
      if (modal) {
        modal.setAttribute('data-open', 'false');
        modal.setAttribute('hidden', '');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modal on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('.modal[data-open="true"]');
    if (open) {
      open.setAttribute('data-open', 'false');
      open.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }
  });

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      nav.hidden = false;
    });
  }
})();
