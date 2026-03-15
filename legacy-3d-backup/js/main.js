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
        // Close mobile nav if open
        var nav = document.querySelector('.nav');
        if (nav && nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
        }
      }
    });
  });

  // Store last focused element to return focus when modal closes
  var lastFocusedElement = null;

  // Get all focusable elements within a container
  function getFocusableElements(container) {
    return container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  }

  // Trap focus within modal
  function trapFocus(modal) {
    var focusableElements = getFocusableElements(modal);
    var firstFocusable = focusableElements[0];
    var lastFocusable = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  }

  // Open modal function
  function openModal(modal, triggerElement) {
    lastFocusedElement = triggerElement || document.activeElement;
    modal.removeAttribute('hidden');
    modal.setAttribute('data-open', 'true');
    document.body.style.overflow = 'hidden';
    
    // Focus the close button or first focusable element
    var closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      setTimeout(function () { closeBtn.focus(); }, 10);
    }
    
    trapFocus(modal);
  }

  // Close modal function
  function closeModal(modal) {
    modal.setAttribute('data-open', 'false');
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    
    // Return focus to the element that opened the modal
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  // Project cards: open modal on click or keyboard (Enter/Space)
  document.querySelectorAll('.project-card[data-modal]').forEach(function (card) {
    // Make card keyboard accessible
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');

    function activate() {
      var id = card.getAttribute('data-modal');
      var modal = document.getElementById(id);
      if (modal) {
        openModal(modal, card);
      }
    }

    card.addEventListener('click', activate);
    
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });

  // Close modal: backdrop or close button
  document.querySelectorAll('.modal-backdrop[data-close], .modal-close[data-close]').forEach(function (el) {
    el.addEventListener('click', function () {
      var modal = el.closest('.modal');
      if (modal) {
        closeModal(modal);
      }
    });
  });

  // Close modal on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('.modal[data-open="true"]');
    if (open) {
      closeModal(open);
    }
  });

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
})();
