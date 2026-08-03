/* ============================================================
   CSSLLC — Main JavaScript v2
   main.js | Hamburger, scroll-spy, reveal, form, portfolio scroll
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initScrollSpy();
  initSmoothScroll();
  initScrollReveal();
  initContactForm();
  initCounters();
  initNewsletterForm();
  initModals();
  initAccordion();
  initTestimonialsCarousel();
  initTestimonialReactions();
});

// ─── Navbar Glass on Scroll ──────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ─── Hamburger ────────────────────────────────────────────────
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  const toggle = (open) => {
    const isOpen = open !== undefined ? open : hamburger.getAttribute('aria-expanded') !== 'true';
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', () => toggle());

  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));

  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      toggle(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggle(false);
      hamburger.focus();
    }
  });
}

// ─── Scroll Spy ───────────────────────────────────────────────
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a, .mobile-menu-links a');
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach(s => observer.observe(s));
}

// ─── Smooth Scroll ────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ─── Scroll Reveal ────────────────────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  els.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 0.07}s`;
    observer.observe(el);
  });
}

// ─── Contact Form ─────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  const validate = (field) => {
    const group = field.closest('.form-group');
    const errEl = group?.querySelector('.form-error');
    let valid = true, msg = '';

    if (field.required && !field.value.trim()) {
      valid = false; msg = 'This field is required.';
    } else if (field.type === 'email' && field.value.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
        valid = false; msg = 'Please enter a valid email.';
      }
    }

    field.classList.toggle('error', !valid);
    if (errEl) { errEl.textContent = msg; errEl.classList.toggle('show', !valid); }
    return valid;
  };

  form.querySelectorAll('.form-input, .form-textarea').forEach(f => {
    f.addEventListener('blur', () => validate(f));
    f.addEventListener('input', () => { if (f.classList.contains('error')) validate(f); });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('.form-input, .form-textarea')];
    if (!fields.every(validate)) return;

    const btn = form.querySelector('.form-submit');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
      form.style.display = 'none';
      if (success) success.classList.add('show');
    }, 1200);
  });
}

// ─── Animated Counters ────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const steps = duration / 16;
    const inc = target / steps;
    let cur = 0;

    const timer = setInterval(() => {
      cur += inc;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = Math.floor(cur) + suffix;
    }, 16);
  };

  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { animate(e.target); observer.unobserve(e.target); }
    }),
    { threshold: 0.5 }
  );

  counters.forEach(c => observer.observe(c));
}

// ─── Newsletter Form ──────────────────────────────────────────
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    if (!input || !input.value.trim()) return;

    const btn = form.querySelector('.newsletter-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Subscribed!'; }
  });
}

// ─── Modal Logic ──────────────────────────────────────────────
function initModals() {
  /* =========================================================================
     TODO: DB-DRIVEN DATA SOURCE — The track modal details and mentor profiles
     are currently hardcoded for client demonstration.
     In production, this data (tracks, mentors, pictures, & curriculum)
     will be fetched dynamically from the backend Database API.
     ========================================================================= */
  const trackModalData = {
  'track-frontend': {
    title: 'Frontend Software Developer Track',
    html: `
        <div class="square-modal-body">
          <div class="square-modal-col-main">
            <p class="square-modal-desc">
              Master component-driven frontend engineering, state management, responsive UI design, and modern Web performance. Build &amp; ship real production interfaces for enterprise applications.
            </p>

            <div class="square-section">
              <h4 class="square-section-title">Core Technology Stack</h4>
              <div class="square-pills">
                <span class="square-pill">HTML5 &amp; CSS3</span>
                <span class="square-pill">JavaScript (ES6+)</span>
                <span class="square-pill">Angular Framework</span>
                <span class="square-pill">TypeScript</span>
                <span class="square-pill">NPM &amp; Webpack</span>
                <span class="square-pill">RxJS</span>
              </div>
            </div>

            <div class="square-section">
              <h4 class="square-section-title">Technical Tools &amp; Cloud</h4>
              <div class="square-pills">
                <span class="square-pill">Git / GitLab CI Workflow</span>
                <span class="square-pill">Postman API Testing</span>
                <span class="square-pill">Swagger OpenAPI Specs</span>
                <span class="square-pill">AWS Cloud Systems</span>
              </div>
            </div>

            <div class="square-section">
              <h4 class="square-section-title">Methodologies &amp; AI</h4>
              <div class="square-pills">
                <span class="square-pill">Agile Scrum Rhythms</span>
                <span class="square-pill">AI-Native Development</span>
                <span class="square-pill">Software Dev Intuition</span>
              </div>
            </div>

            <div class="square-exposure-box">
              <span class="square-exposure-icon">💼</span>
              <div>
                <strong>Live Enterprise Exposure:</strong> Work directly on an Enterprise-Level Job Portal Website &amp; Application codebase.
              </div>
            </div>
          </div>

          <div class="square-modal-col-side">
            <div class="square-mentor-card">
              <div class="square-mentor-header">
                <img src="assets/images/mentor-anish.png" alt="Anish" class="square-mentor-img" onerror="this.src='https://ui-avatars.com/api/?name=Anish&background=1D4ED8&color=fff';" />
                <div class="square-mentor-meta">
                  <span class="square-mentor-tag">Frontend Lead</span>
                  <h5 class="square-mentor-name">Anish</h5>
                  <span class="square-mentor-role">Lead Frontend Mentor &amp; Web Architect</span>
                </div>
              </div>
              <p class="square-mentor-bio">
                Specialist in Angular Framework, component architecture, state management, and high-performance Web application engineering.
              </p>
            </div>
          </div>
        </div>
      `
  },
  'track-android': {
    title: 'Android Software Developer Track',
    html: `
        <div class="square-modal-body">
          <div class="square-modal-col-main">
            <p class="square-modal-desc">
              Develop native Android applications using Java and Kotlin. Learn mobile app architecture, unit testing, SonarQube code quality audits, and Google Play Store deployment guidelines.
            </p>

            <div class="square-section">
              <h4 class="square-section-title">Core Technology Stack</h4>
              <div class="square-pills">
                <span class="square-pill">Android SDK</span>
                <span class="square-pill">Java &amp; Kotlin</span>
                <span class="square-pill">Jetpack Layouts</span>
                <span class="square-pill">Unit Testing</span>
                <span class="square-pill">SonarQube</span>
                <span class="square-pill">Play Store Guidelines</span>
              </div>
            </div>

            <div class="square-section">
              <h4 class="square-section-title">Technical Tools &amp; Cloud</h4>
              <div class="square-pills">
                <span class="square-pill">Git / GitLab CI</span>
                <span class="square-pill">Postman &amp; Swagger</span>
                <span class="square-pill">AWS Mobile Backend Cloud</span>
              </div>
            </div>

            <div class="square-section">
              <h4 class="square-section-title">Methodologies &amp; AI</h4>
              <div class="square-pills">
                <span class="square-pill">Agile Methodologies</span>
                <span class="square-pill">AI-Native Mobile Dev</span>
                <span class="square-pill">Mobile Dev Intuition</span>
              </div>
            </div>

            <div class="square-exposure-box">
              <span class="square-exposure-icon">📱</span>
              <div>
                <strong>Live Enterprise Exposure:</strong> Build mobile app features for an Enterprise-Level Job Portal Application.
              </div>
            </div>
          </div>

          <div class="square-modal-col-side">
            <div class="square-mentor-card">
              <div class="square-mentor-header">
                <img src="assets/images/mentor-aditya.png" alt="Aditya" class="square-mentor-img" onerror="this.src='https://ui-avatars.com/api/?name=Aditya&background=1D4ED8&color=fff';" />
                <div class="square-mentor-meta">
                  <span class="square-mentor-tag">Android Lead</span>
                  <h5 class="square-mentor-name">Aditya</h5>
                  <span class="square-mentor-role">Lead Android Developer &amp; Mobile Mentor</span>
                </div>
              </div>
              <p class="square-mentor-bio">
                Expert in Android SDK, Kotlin, Java, REST API integrations, and mobile production release pipelines.
              </p>
            </div>
          </div>
        </div>
      `
  },
  'track-springboot': {
    title: 'Spring Boot Backend Developer Track',
    html: `
        <div class="square-modal-body">
          <div class="square-modal-col-main">
            <p class="square-modal-desc">
              Architect scalable microservices with Spring Boot, Java OOPs, MongoDB &amp; SQL databases, JWT authentication, web scraping, and RESTful API engineering.
            </p>

            <div class="square-section">
              <h4 class="square-section-title">Core Technology Stack</h4>
              <div class="square-pills">
                <span class="square-pill">Java 17+ &amp; OOPS</span>
                <span class="square-pill">Spring Boot</span>
                <span class="square-pill">MongoDB &amp; SQL</span>
                <span class="square-pill">JWT Security</span>
                <span class="square-pill">RESTful APIs</span>
                <span class="square-pill">JUnit Testing</span>
              </div>
            </div>

            <div class="square-section">
              <h4 class="square-section-title">Technical Tools &amp; Cloud</h4>
              <div class="square-pills">
                <span class="square-pill">GitLab CI/CD Pipelines</span>
                <span class="square-pill">Postman &amp; Swagger OpenAPI</span>
                <span class="square-pill">AWS EC2 / Lambda</span>
              </div>
            </div>

            <div class="square-section">
              <h4 class="square-section-title">Methodologies &amp; AI</h4>
              <div class="square-pills">
                <span class="square-pill">Agile Scrum Sprint Rhythms</span>
                <span class="square-pill">AI-Native Backend Coding</span>
                <span class="square-pill">Software Dev Intuition</span>
              </div>
            </div>

            <div class="square-exposure-box">
              <span class="square-exposure-icon">⚙️</span>
              <div>
                <strong>Live Enterprise Exposure:</strong> Build backend microservices for an Enterprise-Level Job Portal platform.
              </div>
            </div>
          </div>

          <div class="square-modal-col-side">
            <div class="square-mentor-card">
              <div class="square-mentor-header">
                <img src="assets/images/mentor-ankan.png" alt="Ankan" class="square-mentor-img" onerror="this.src='https://ui-avatars.com/api/?name=Ankan&background=1D4ED8&color=fff';" />
                <div class="square-mentor-meta">
                  <span class="square-mentor-tag">Java Lead</span>
                  <h5 class="square-mentor-name">Ankan</h5>
                  <span class="square-mentor-role">Lead Java Backend &amp; Microservices Mentor</span>
                </div>
              </div>
              <p class="square-mentor-bio">
                Specialist in Spring Boot microservices, high-throughput REST APIs, JWT security, and enterprise database architecture.
              </p>
            </div>
          </div>
        </div>
      `
  },
  'track-python': {
    title: 'Python Backend Developer Track',
    html: `
        <div class="square-modal-body">
          <div class="square-modal-col-main">
            <p class="square-modal-desc">
              Build high-performance asynchronous API services using Python 3, FastAPI, Django/Flask, MongoDB, and PostgreSQL. Integrate AI capabilities and cloud services.
            </p>

            <div class="square-section">
              <h4 class="square-section-title">Core Technology Stack</h4>
              <div class="square-pills">
                <span class="square-pill">Python 3.11+</span>
                <span class="square-pill">FastAPI</span>
                <span class="square-pill">Django / Flask</span>
                <span class="square-pill">MongoDB &amp; PostgreSQL</span>
                <span class="square-pill">AsyncIO</span>
              </div>
            </div>

            <div class="square-section">
              <h4 class="square-section-title">Technical Tools &amp; Cloud</h4>
              <div class="square-pills">
                <span class="square-pill">Git / GitLab Flow</span>
                <span class="square-pill">Postman &amp; Swagger OpenAPI</span>
                <span class="square-pill">AWS Cloud Infrastructure</span>
              </div>
            </div>

            <div class="square-section">
              <h4 class="square-section-title">Methodologies &amp; AI</h4>
              <div class="square-pills">
                <span class="square-pill">Agile Methodologies</span>
                <span class="square-pill">AI-Native Development</span>
                <span class="square-pill">Software Dev Intuition</span>
              </div>
            </div>

            <div class="square-exposure-box">
              <span class="square-exposure-icon">🐍</span>
              <div>
                <strong>Live Enterprise Exposure:</strong> Build AI data pipelines &amp; APIs for an Enterprise-Level Job Portal platform.
              </div>
            </div>
          </div>

          <div class="square-modal-col-side">
            <div class="square-mentor-card">
              <div class="square-mentor-header">
                <img src="assets/images/mentor-yash.png" alt="Yash" class="square-mentor-img" onerror="this.src='https://ui-avatars.com/api/?name=Yash&background=1D4ED8&color=fff';" />
                <div class="square-mentor-meta">
                  <span class="square-mentor-tag">Python &amp; AI Lead</span>
                  <h5 class="square-mentor-name">Yash</h5>
                  <span class="square-mentor-role">Lead Python &amp; AI Systems Mentor</span>
                </div>
              </div>
              <p class="square-mentor-bio">
                Expert in FastAPI, Python asynchronous architectures, AI integrations, and scalable cloud database solutions.
              </p>
            </div>
          </div>
        </div>
      `
  },
  'bucket-3k': {
    title: 'Industrial Training Track (₹3,000)',
    html: `
        <div class="square-modal-body">
          <div class="square-modal-col-main">
            <p class="square-modal-desc">
              100-hour evaluated cohort designed for students and career switchers to gain real workplace experience, US support, and live enterprise system exposure.
            </p>

            <div class="square-section">
              <h4 class="square-section-title">Program Highlights</h4>
              <div class="square-pills">
                <span class="square-pill">Evaluated Cohort (30 Seats)</span>
                <span class="square-pill">100 Hours / 30 Days</span>
                <span class="square-pill">Official Certification</span>
                <span class="square-pill">US Team Mentorship</span>
              </div>
            </div>

            <div class="square-section">
              <h4 class="square-section-title">Tools &amp; Methodologies</h4>
              <div class="square-pills">
                <span class="square-pill">Git / GitLab</span>
                <span class="square-pill">Postman &amp; Swagger</span>
                <span class="square-pill">AWS Cloud</span>
                <span class="square-pill">Agile Scrum</span>
              </div>
            </div>

            <div class="square-exposure-box">
              <span class="square-exposure-icon">🚀</span>
              <div>
                <strong>Live Enterprise Project:</strong> Hands-on work on an Enterprise-Level Job Portal Website &amp; Application.
              </div>
            </div>
          </div>

          <div class="square-modal-col-side">
            <div class="square-mentor-card">
              <div class="square-mentor-header">
                <img src="assets/images/mentor-anish.png" alt="Anish" class="square-mentor-img" onerror="this.src='https://ui-avatars.com/api/?name=Anish&background=1D4ED8&color=fff';" />
                <div class="square-mentor-meta">
                  <span class="square-mentor-tag">Foundation Lead</span>
                  <h5 class="square-mentor-name">Anish</h5>
                  <span class="square-mentor-role">Lead Foundation &amp; Web Mentor</span>
                </div>
              </div>
              <p class="square-mentor-bio">
                Guiding students through core technical skills, workplace rhythms, and live project onboarding.
              </p>
            </div>
          </div>
        </div>
      `
  },
  'bucket-9k': {
    title: 'Career Accelerator Track (₹9,000)',
    html: `
        <div class="square-modal-body">
          <div class="square-modal-col-main">
            <p class="square-modal-desc">
              Exclusive 10-candidate merit cohort. Includes 16 weeks of deep enterprise engineering, live production deployment, placement support (&gt;95% success rate), and direct US hiring opportunities.
            </p>

            <div class="square-section">
              <h4 class="square-section-title">Program Highlights</h4>
              <div class="square-pills">
                <span class="square-pill">16 Weeks Duration</span>
                <span class="square-pill">Exclusive (10 Candidates)</span>
                <span class="square-pill">Placement Support (&gt;95%)</span>
                <span class="square-pill">US Hiring Opportunity</span>
              </div>
            </div>

            <div class="square-section">
              <h4 class="square-section-title">Tools &amp; Methodologies</h4>
              <div class="square-pills">
                <span class="square-pill">GitLab CI/CD</span>
                <span class="square-pill">Postman &amp; Swagger</span>
                <span class="square-pill">AWS Cloud</span>
                <span class="square-pill">AI-Native Dev</span>
              </div>
            </div>

            <div class="square-exposure-box">
              <span class="square-exposure-icon">🌟</span>
              <div>
                <strong>Live Enterprise Exposure:</strong> Full codebase access &amp; contributions to Enterprise Job Portal applications.
              </div>
            </div>
          </div>

          <div class="square-modal-col-side">
            <div class="square-mentor-card">
              <div class="square-mentor-header">
                <img src="assets/images/mentor-ankan.png" alt="Ankan" class="square-mentor-img" onerror="this.src='https://ui-avatars.com/api/?name=Ankan&background=1D4ED8&color=fff';" />
                <div class="square-mentor-meta">
                  <span class="square-mentor-tag">Accelerator Lead</span>
                  <h5 class="square-mentor-name">Ankan</h5>
                  <span class="square-mentor-role">Lead Enterprise &amp; Placement Mentor</span>
                </div>
              </div>
              <p class="square-mentor-bio">
                Directing enterprise production workflows, code reviews, system design, and career placement preparation.
              </p>
            </div>
          </div>
        </div>
      `
    }
  };
  const modal = document.getElementById('popup-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  function openModal(title, html) {
    if (!modal) return;
    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = html;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Close handlers
  document.querySelectorAll('[data-close-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobile-menu');
      const hamburger = document.getElementById('hamburger');
      if (mobileMenu && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }

      const type = trigger.getAttribute('data-open-modal');
      
      if (trackModalData[type]) {
        openModal(trackModalData[type].title, trackModalData[type].html);
      } else if (type === 'training') {
        openModal('Industrial Training', 'This program is coming soon. Stay tuned for updates on our latest training modules.');
      } else if (type === 'careers') {
        openModal('Careers', 'We do all our job postings at <a href="https://reviewprobe.com" target="_blank" rel="noopener noreferrer">https://reviewprobe.com</a>. Check there for open roles!');
      }
    });
  });
}

// ─── Accordion Logic ──────────────────────────────────────────
function initAccordion() {
  const toggles = document.querySelectorAll('.accordion-toggle');
  
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      const panelId = toggle.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      
      if (!panel) return;
      
      if (isExpanded) {
        toggle.setAttribute('aria-expanded', 'false');
        panel.classList.remove('is-open');
      } else {
        toggle.setAttribute('aria-expanded', 'true');
        panel.classList.add('is-open');
      }
    });
  });
}

// ─── Testimonials Carousel Logic ─────────────────────────────────
function initTestimonialsCarousel() {
  const carousel = document.getElementById('testimonials-carousel');
  const prevBtn  = document.getElementById('testimonial-prev');
  const nextBtn  = document.getElementById('testimonial-next');
  if (!carousel) return;

  const scrollAmount = 360;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Mouse drag-to-scroll support
  let isDown = false;
  let startX, scrollLeft;

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => { isDown = false; });
  carousel.addEventListener('mouseup', () => { isDown = false; });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;
  });
}

// ─── Testimonials Like/Dislike Logic ──────────────────────────────
/* =========================================================================
   TODO: DB-DRIVEN DATA SOURCE — Testimonials, like/dislike counts, and user
   reaction states are currently stored locally for client demonstration.
   In production, these records will be fetched and persisted in backend
   Database tables via real-time API endpoints.
   ========================================================================= */
function initTestimonialReactions() {
  const containers = document.querySelectorAll('.testimonial-reactions');
  if (!containers.length) return;

  const STORAGE_KEY = 'cssllc_testimonial_reactions_v1';
  let storedData = {};

  try {
    storedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    storedData = {};
  }

  const saveStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
    } catch (e) {
      /* ignore */
    }
  };

  containers.forEach(container => {
    const id = container.getAttribute('data-testimonial-id');
    if (!id) return;

    const likeBtn = container.querySelector('.like-btn');
    const dislikeBtn = container.querySelector('.dislike-btn');
    const likeCountEl = container.querySelector('.like-count');
    const dislikeCountEl = container.querySelector('.dislike-count');

    if (!likeBtn || !dislikeBtn || !likeCountEl || !dislikeCountEl) return;

    // Base counts from HTML
    const initialLikeCount = parseInt(likeCountEl.textContent, 10) || 0;
    const initialDislikeCount = parseInt(dislikeCountEl.textContent, 10) || 0;

    // Restore user reaction state if saved
    const userReaction = storedData[id]?.userState || null; // 'liked' | 'disliked' | null
    const deltaLike = storedData[id]?.deltaLike || 0;
    const deltaDislike = storedData[id]?.deltaDislike || 0;

    const updateUI = (userState, dLike, dDislike, triggerAnimBtn = null) => {
      const currentLike = initialLikeCount + dLike;
      const currentDislike = initialDislikeCount + dDislike;

      likeCountEl.textContent = currentLike;
      dislikeCountEl.textContent = currentDislike;

      if (userState === 'liked') {
        likeBtn.classList.add('is-liked');
        dislikeBtn.classList.remove('is-disliked');
      } else if (userState === 'disliked') {
        likeBtn.classList.remove('is-liked');
        dislikeBtn.classList.add('is-disliked');
      } else {
        likeBtn.classList.remove('is-liked');
        dislikeBtn.classList.remove('is-disliked');
      }

      if (triggerAnimBtn) {
        triggerAnimBtn.classList.remove('reaction-pop');
        // Trigger reflow to restart CSS animation
        void triggerAnimBtn.offsetWidth;
        triggerAnimBtn.classList.add('reaction-pop');
      }
    };

    updateUI(userReaction, deltaLike, deltaDislike);

    likeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let currentState = storedData[id]?.userState || null;
      let dLike = storedData[id]?.deltaLike || 0;
      let dDislike = storedData[id]?.deltaDislike || 0;

      if (currentState === 'liked') {
        // Toggle off
        currentState = null;
        dLike -= 1;
      } else if (currentState === 'disliked') {
        // Switch from dislike to like
        currentState = 'liked';
        dDislike -= 1;
        dLike += 1;
      } else {
        // Add like
        currentState = 'liked';
        dLike += 1;
      }

      storedData[id] = { userState: currentState, deltaLike: dLike, deltaDislike: dDislike };
      saveStorage();
      updateUI(currentState, dLike, dDislike, likeBtn);
    });

    dislikeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let currentState = storedData[id]?.userState || null;
      let dLike = storedData[id]?.deltaLike || 0;
      let dDislike = storedData[id]?.deltaDislike || 0;

      if (currentState === 'disliked') {
        // Toggle off
        currentState = null;
        dDislike -= 1;
      } else if (currentState === 'liked') {
        // Switch from like to dislike
        currentState = 'disliked';
        dLike -= 1;
        dDislike += 1;
      } else {
        // Add dislike
        currentState = 'disliked';
        dDislike += 1;
      }

      storedData[id] = { userState: currentState, deltaLike: dLike, deltaDislike: dDislike };
      saveStorage();
      updateUI(currentState, dLike, dDislike, dislikeBtn);
    });
  });
}
