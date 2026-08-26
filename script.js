(() => {
  const config = window.KONNEN_CONFIG || {};

  // Add a little more life without turning the site into a flashy template.
  // Motion stays subtle and is disabled for visitors who prefer reduced motion.
  const livelyStyle = document.createElement('style');
  livelyStyle.textContent = `
    .hero-light:before,
    .page-hero:before{
      content:"";
      position:absolute;
      width:420px;
      height:420px;
      left:-170px;
      top:-180px;
      border-radius:50%;
      background:radial-gradient(circle,rgba(183,119,77,.18) 0,rgba(183,119,77,.07) 32%,rgba(183,119,77,0) 70%);
      pointer-events:none;
    }
    .page-hero:after{
      content:"";
      position:absolute;
      width:360px;
      height:360px;
      right:-130px;
      bottom:-220px;
      border-radius:50%;
      background:radial-gradient(circle,rgba(127,146,121,.2),rgba(127,146,121,0) 68%);
      pointer-events:none;
    }
    .topo-field{animation:konnenTopoDrift 18s ease-in-out infinite alternate}

    .brand-mark i{
      box-shadow:0 0 0 0 rgba(183,119,77,0);
      transition:box-shadow .3s ease,transform .3s ease;
    }
    .brand:hover .brand-mark i:first-child{transform:scale(1.12);box-shadow:0 0 0 5px rgba(183,119,77,.10)}
    .brand:hover .brand-mark i:last-child{transform:scale(1.12);box-shadow:0 0 0 5px rgba(127,146,121,.10)}
    .brand-mark b:after{animation:konnenNodePulse 3.8s ease-in-out infinite}

    .primary-nav a:not(.nav-cta){position:relative}
    .primary-nav a:not(.nav-cta):after{
      content:"";
      position:absolute;
      left:0;
      right:100%;
      bottom:-9px;
      height:2px;
      background:linear-gradient(90deg,var(--copper),var(--sage));
      transition:right .25s ease;
    }
    .primary-nav a:not(.nav-cta):hover:after,
    .primary-nav a.is-active:not(.nav-cta):after{right:0}

    .button{position:relative;overflow:hidden;isolation:isolate;box-shadow:0 7px 18px rgba(32,36,39,.06)}
    .button:after{
      content:"";
      position:absolute;
      inset:-2px;
      background:linear-gradient(110deg,transparent 28%,rgba(255,255,255,.34) 47%,transparent 66%);
      transform:translateX(-125%);
      transition:transform .58s ease;
      pointer-events:none;
      z-index:-1;
    }
    .button:hover:after{transform:translateX(125%)}
    .button:hover{box-shadow:0 12px 26px rgba(32,36,39,.11)}

    .hero-system{
      border:1px solid rgba(255,255,255,.08);
      box-shadow:0 28px 80px rgba(28,31,33,.18),0 0 0 1px rgba(183,119,77,.08);
      animation:konnenFloat 7s ease-in-out infinite;
    }
    .hero-system:before{
      content:"";
      position:absolute;
      inset:0;
      background:linear-gradient(130deg,rgba(183,119,77,.08),transparent 38%,rgba(127,146,121,.07));
      pointer-events:none;
    }
    .system-diagram .wire{
      background:linear-gradient(90deg,var(--copper-light),rgba(212,155,115,.15),var(--sage),rgba(212,155,115,.15),var(--copper-light));
      background-size:220% 100%;
      animation:konnenCurrent 4.5s linear infinite;
    }
    .system-diagram .terminal{animation:konnenTerminal 3.2s ease-in-out infinite}
    .system-diagram .t2{animation-delay:.45s}.system-diagram .t3{animation-delay:.9s}.system-diagram .t4{animation-delay:1.35s}

    .trust-row span{
      transition:transform .22s ease,border-color .22s ease,background .22s ease,box-shadow .22s ease;
      backdrop-filter:blur(8px);
    }
    .trust-row span:hover{transform:translateY(-2px);border-color:rgba(183,119,77,.34);background:rgba(255,255,255,.82);box-shadow:0 8px 22px rgba(32,36,39,.07)}

    .proof-grid>div{transition:background .25s ease,transform .25s ease}
    .proof-grid>div:hover{background:linear-gradient(135deg,rgba(244,240,232,.72),rgba(223,230,220,.34));transform:translateY(-2px)}

    .service-card{
      background:linear-gradient(145deg,#fff 0,#fff 66%,rgba(244,240,232,.55) 100%);
    }
    .service-card:before{
      content:"";
      position:absolute;
      width:150px;
      height:150px;
      right:-80px;
      top:-85px;
      border-radius:50%;
      background:radial-gradient(circle,rgba(183,119,77,.15),rgba(183,119,77,0) 68%);
      opacity:0;
      transform:scale(.78);
      transition:opacity .3s ease,transform .35s ease;
    }
    .service-card:hover:before{opacity:1;transform:scale(1)}
    .service-card:hover{transform:translateY(-7px);box-shadow:0 24px 55px rgba(28,31,33,.11)}
    .service-card>span{display:inline-grid;place-items:center;width:33px;height:33px;border:1px solid rgba(183,119,77,.28);border-radius:50%;background:rgba(244,240,232,.62)}
    .service-card-accent{background:linear-gradient(145deg,var(--sage-light),#eef2eb)}
    .service-card a b{display:inline-block;transition:transform .2s ease}.service-card:hover a b{transform:translateX(5px)}

    .section-dark{
      overflow:hidden;
      background:
        radial-gradient(circle at 12% 12%,rgba(183,119,77,.10),transparent 28%),
        radial-gradient(circle at 90% 78%,rgba(127,146,121,.11),transparent 30%),
        var(--charcoal);
    }
    .expect-list article{transition:transform .25s ease,background .25s ease,padding-left .25s ease}
    .expect-list article:hover{transform:translateX(6px);background:rgba(255,255,255,.025);padding-left:10px}

    .experience-graphic,.area-art,.local-art,.detail-visual,.meaning-card,.form-card,.process-grid article{
      transition:transform .35s ease,box-shadow .35s ease,border-color .35s ease;
    }
    .experience-graphic:hover,.area-art:hover,.local-art:hover,.detail-visual:hover,.meaning-card:hover,.form-card:hover{
      transform:translateY(-5px);
      box-shadow:0 26px 62px rgba(28,31,33,.11);
      border-color:rgba(183,119,77,.32);
    }
    .experience-graphic svg path,.area-art path,.local-art path{stroke-dasharray:8 7;animation:konnenPath 16s linear infinite}
    .area-art .area-ring,.local-art .area-ring{transform-origin:center;animation:konnenMapPulse 3.5s ease-in-out infinite}

    .faq-list details{transition:background .22s ease,padding .22s ease}
    .faq-list details:hover{background:linear-gradient(90deg,rgba(244,240,232,.55),transparent);padding-left:12px}
    .faq-list summary:after{transition:transform .22s ease}.faq-list details[open] summary:after{transform:rotate(180deg)}

    .process-grid article{position:relative;overflow:hidden}
    .process-grid article:after{
      content:"";
      position:absolute;
      left:0;
      top:0;
      width:3px;
      height:0;
      background:linear-gradient(var(--copper),var(--sage));
      transition:height .3s ease;
    }
    .process-grid article:hover{transform:translateY(-5px);box-shadow:0 20px 42px rgba(28,31,33,.08)}
    .process-grid article:hover:after{height:100%}

    .cta-section{
      position:relative;
      overflow:hidden;
      background:linear-gradient(118deg,#8f5635 0,var(--copper-dark) 42%,#7d654f 100%);
      background-size:160% 160%;
      animation:konnenCtaShift 11s ease-in-out infinite alternate;
    }
    .cta-section:after{
      content:"";
      position:absolute;
      width:340px;
      height:340px;
      right:-120px;
      top:-150px;
      border:1px solid rgba(255,255,255,.13);
      border-radius:50%;
      box-shadow:0 0 0 35px rgba(255,255,255,.025),0 0 0 70px rgba(255,255,255,.018);
      pointer-events:none;
    }
    .cta-inner{position:relative;z-index:1}

    @keyframes konnenFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
    @keyframes konnenNodePulse{0%,100%{box-shadow:0 0 0 0 rgba(127,146,121,0)}50%{box-shadow:0 0 0 7px rgba(127,146,121,.13)}}
    @keyframes konnenCurrent{to{background-position:220% 0}}
    @keyframes konnenTerminal{0%,100%{box-shadow:0 0 0 0 rgba(212,155,115,0)}50%{box-shadow:0 0 0 6px rgba(212,155,115,.10)}}
    @keyframes konnenTopoDrift{0%{transform:translate3d(0,0,0) scale(1)}100%{transform:translate3d(-12px,8px,0) scale(1.018)}}
    @keyframes konnenPath{to{stroke-dashoffset:-120}}
    @keyframes konnenMapPulse{0%,100%{opacity:.65}50%{opacity:1}}
    @keyframes konnenCtaShift{0%{background-position:0 50%}100%{background-position:100% 50%}}

    @media(max-width:980px){
      .primary-nav a:not(.nav-cta):after{display:none}
      .hero-system{animation:none}
    }
    @media(prefers-reduced-motion:reduce){
      .topo-field,.brand-mark b:after,.hero-system,.system-diagram .wire,.system-diagram .terminal,
      .experience-graphic svg path,.area-art path,.local-art path,.area-art .area-ring,.local-art .area-ring,.cta-section{
        animation:none!important;
      }
      .service-card:hover,.experience-graphic:hover,.area-art:hover,.local-art:hover,.detail-visual:hover,.meaning-card:hover,.form-card:hover,.process-grid article:hover,.expect-list article:hover{transform:none}
    }
  `;
  document.head.appendChild(livelyStyle);

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

  // Keep the umlaut in the visual wordmark and German etymology only.
  // Running English copy uses the registered/public spelling: Konnen.
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
