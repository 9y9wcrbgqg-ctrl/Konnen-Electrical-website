(() => {
  const config = window.KONNEN_CONFIG || {};

  // Internal pages may not include the brand stylesheet directly. Add it only
  // when it is genuinely missing; the homepage already includes a versioned copy.
  if (!document.querySelector('link[href*="brand-refresh.css"]')) {
    const brandStyles = document.createElement('link');
    brandStyles.rel = 'stylesheet';
    brandStyles.href = '/brand-refresh.css?v=20260825f';
    document.head.appendChild(brandStyles);
  }

  const qsa = (selector) => Array.from(document.querySelectorAll(selector));
  const setText = (selector, value) => {
    if (!value) return;
    qsa(selector).forEach((el) => { el.textContent = value; });
  };

  setText('[data-phone]', config.phone);
  setText('[data-email]', config.email);
  setText('[data-service-area]', config.serviceArea || 'Southern Oregon');
  setText('[data-ccb]', config.ccb);
  setText('[data-electrical-license]', config.electricalContractorLicense);
  setText('[data-pronunciation]', config.pronunciation || 'KEN-en');
  setText('[data-year]', String(new Date().getFullYear()));

  qsa('[data-phone-link]').forEach((link) => {
    if (config.phone && config.phoneHref) {
      link.href = `tel:${config.phoneHref}`;
      link.hidden = false;
    }
  });
  qsa('[data-email-link]').forEach((link) => {
    if (config.email) {
      link.href = `mailto:${config.email}`;
      link.hidden = false;
    }
  });
  qsa('[data-ccb-wrap]').forEach((el) => { if (config.ccb) el.hidden = false; });
  qsa('[data-electrical-license-wrap]').forEach((el) => { if (config.electricalContractorLicense) el.hidden = false; });

  qsa('.footer-brand p').forEach((el) => {
    if (el.textContent.includes('Delivered with Können')) {
      el.textContent = 'Built on knowledge. Delivered with Konnen.';
    }
  });

  const header = document.querySelector('[data-header]');
  const onScroll = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = qsa('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach((el) => observer.observe(el));
  }

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = document.querySelector('[data-form-status]');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      if (!config.email) {
        if (status) {
          status.textContent = 'The business email address has not been added to the website configuration yet.';
          status.classList.add('is-error');
        }
        return;
      }

      const data = new FormData(form);
      const first = String(data.get('firstName') || '').trim();
      const last = String(data.get('lastName') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const email = String(data.get('email') || '').trim();
      const location = String(data.get('location') || '').trim();
      const projectType = String(data.get('projectType') || '').trim();
      const timing = String(data.get('timing') || '').trim();
      const details = String(data.get('details') || '').trim();
      const notes = String(data.get('notes') || '').trim();

      const subject = `Project request - ${projectType || 'Electrical work'} - ${first} ${last}`;
      const body = [
        'Konnen Electrical project request',
        '',
        `Name: ${first} ${last}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Project location: ${location}`,
        `Project type: ${projectType}`,
        `Timing: ${timing}`,
        '',
        'Project / problem:',
        details,
        '',
        'Additional notes:',
        notes || 'None provided',
        '',
        'Sent from konnenelectrical.com'
      ].join('\n');

      if (status) {
        status.textContent = 'Opening your email app with the project details. Review the message, then send it to Konnen.';
        status.classList.remove('is-error');
      }
      window.location.href = `mailto:${encodeURIComponent(config.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  if (document.body.dataset.page === 'home') {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Electrician',
      name: config.company || 'Konnen Electrical LLC',
      legalName: config.legalName || 'Konnen Electrical LLC',
      alternateName: config.displayName || 'KÖNNEN ELECTRICAL',
      url: 'https://konnenelectrical.com/',
      description: 'Electrical service, troubleshooting, upgrades, remodel and project work in Southern Oregon.',
      areaServed: config.serviceArea || 'Southern Oregon'
    };
    if (config.phone) schema.telephone = config.phone;
    if (config.email) schema.email = config.email;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
})();
