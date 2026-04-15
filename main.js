/* ============================================
   HOSPITALITY INTELLIGENCE — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === NAV SCROLL EFFECT ===
  const nav = document.querySelector('.nav');

  const updateNavClasses = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
      nav.classList.remove('nav--inverse');
    } else {
      nav.classList.remove('scrolled');
      nav.classList.add('nav--inverse');
    }
  };
  window.addEventListener('scroll', updateNavClasses, { passive: true });
  updateNavClasses();

  // === ACTIVE NAV LINK ===
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // === HAMBURGER MENU ===
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';

      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(4.5px, 4.5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // === SCROLL REVEAL ===
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  // === NUMBER COUNTER ANIMATION ===
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const duration = 1600;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => countObserver.observe(el));
  }

  // === CONTACT FORM SUBMISSION (placeholder) ===
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Enviando…';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Mensaje enviado';
        form.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 3000);
      }, 1400);
    });
  }

});
