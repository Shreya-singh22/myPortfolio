/* ============================================================
   SHREYA SINGH CHAUHAN — PORTFOLIO JAVASCRIPT
   ============================================================ */

'use strict';

/* -------- THEME TOGGLE -------- */
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const isDark = theme === 'dark';

  // Main toggle icons
  const iconMoon = document.getElementById('icon-moon');
  const iconSun  = document.getElementById('icon-sun');
  if (iconMoon) iconMoon.style.display = isDark ? 'block' : 'none';
  if (iconSun)  iconSun.style.display  = isDark ? 'none'  : 'block';

  // Footer toggle icons
  const fMoon = document.getElementById('footer-icon-moon');
  const fSun  = document.getElementById('footer-icon-sun');
  if (fMoon) fMoon.style.display = isDark ? 'block' : 'none';
  if (fSun)  fSun.style.display  = isDark ? 'none'  : 'block';
}

function initTheme() {
  const saved     = localStorage.getItem('theme');
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(saved || preferred || 'dark');
}

function attachThemeToggle(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    btn.classList.add('spinning');
    setTimeout(() => btn.classList.remove('spinning'), 400);
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

initTheme();
attachThemeToggle('theme-toggle');
attachThemeToggle('footer-theme-toggle');


/* -------- NAVBAR: SCROLL + ACTIVE -------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// Active nav link via IntersectionObserver
const sections = document.querySelectorAll('main section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach((sec) => sectionObserver.observe(sec));


/* -------- MOBILE HAMBURGER MENU -------- */
const hamburger  = document.getElementById('hamburger');
const navMenu    = document.getElementById('nav-menu');
const navOverlay = document.getElementById('nav-overlay');

function openMenu() {
  hamburger.classList.add('open');
  navMenu.classList.add('open');
  navOverlay.classList.add('open');
  navOverlay.removeAttribute('aria-hidden');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
  navOverlay.classList.remove('open');
  navOverlay.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (navMenu.classList.contains('open')) closeMenu();
  else openMenu();
});

navOverlay.addEventListener('click', closeMenu);

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});


/* -------- SMOOTH SCROLL OFFSET -------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = navbar.getBoundingClientRect().height + 12;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ============================================================
   ANIMATIONS — only when prefers-reduced-motion is NOT set
   ============================================================ */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {

  /* -------- HERO STAGGER -------- */
  const heroWords    = document.querySelectorAll('.hero-word');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCta      = document.querySelector('.hero-cta');
  const heroSocials  = document.querySelector('.hero-socials');

  heroWords.forEach((word, i) => {
    setTimeout(() => word.classList.add('visible'), i * 100);
  });

  setTimeout(() => heroSubtitle && heroSubtitle.classList.add('visible'), 500);
  setTimeout(() => heroCta      && heroCta.classList.add('visible'),      700);
  setTimeout(() => heroSocials  && heroSocials.classList.add('visible'),  900);


  /* -------- TYPEWRITER -------- */
  const roles = [
    'Full Stack Developer',
    'AI/ML Enthusiast',
    'CS @ Bennett University',
  ];

  let roleIdx   = 0;
  let charIdx   = 0;
  let deleting  = false;
  const speed   = { type: 65, delete: 35, pause: 2200 };
  const target  = document.getElementById('typewriter-text');

  function typeLoop() {
    if (!target) return;
    const current = roles[roleIdx];

    if (!deleting) {
      target.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, speed.pause);
        return;
      }
    } else {
      target.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
      }
    }

    setTimeout(typeLoop, deleting ? speed.delete : speed.type);
  }

  setTimeout(typeLoop, 1000);


  /* -------- DOT GRID CANVAS (Hero Background) -------- */
  const canvas = document.getElementById('dot-canvas');
  const ctx    = canvas && canvas.getContext('2d');
  let dotOffset = 0;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function drawDots(scrollY) {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isDark   = html.getAttribute('data-theme') === 'dark';
    const dotColor = isDark ? 'rgba(56,189,248,0.07)' : 'rgba(3,105,161,0.06)';
    const spacing  = 36;
    const parallax = scrollY * 0.3;

    ctx.fillStyle = dotColor;

    for (let x = 0; x < canvas.width + spacing; x += spacing) {
      for (let y = -spacing; y < canvas.height + spacing; y += spacing) {
        const dy = (y + parallax) % (canvas.height + spacing);
        ctx.beginPath();
        ctx.arc(x, dy, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  resizeCanvas();
  drawDots(0);

  window.addEventListener('resize', () => {
    resizeCanvas();
    drawDots(window.scrollY);
  }, { passive: true });

  // Only parallax on non-touch devices
  const isTouchDevice = 'ontouchstart' in window;
  if (!isTouchDevice) {
    let rafId;
    window.addEventListener('scroll', () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        drawDots(window.scrollY);
        rafId = null;
      });
    }, { passive: true });
  }


  /* -------- SCROLL REVEAL (IntersectionObserver) -------- */
  const revealEls = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // Section rule width animation (also data-reveal)
  const ruleEls = document.querySelectorAll('.section-rule');
  const ruleObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          ruleObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  ruleEls.forEach((el) => ruleObs.observe(el));


  /* -------- SKILL PILLS STAGGER -------- */
  const allPills = document.querySelectorAll('.pill');

  const pillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pills = entry.target.querySelectorAll('.pill');
          pills.forEach((pill, i) => {
            setTimeout(() => pill.classList.add('revealed'), i * 40);
          });
          pillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.skill-pills').forEach((group) => {
    pillObserver.observe(group);
  });


  /* -------- COUNT-UP STATS -------- */
  const statCards = document.querySelectorAll('.stat-card[data-count]');

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCount(el) {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const display  = el.querySelector('.stat-number');
    if (!display) return;

    const duration = 1200;
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value    = easeOutQuart(progress) * target;
      display.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statCards.forEach((card) => statObserver.observe(card));


  /* -------- CUSTOM CURSOR -------- */
  const cursorDot  = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  // Only show on non-touch devices
  if (!isTouchDevice && cursorDot && cursorRing) {
    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }, { passive: true });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Expand ring on interactive elements
    document.querySelectorAll('a, button, .pill, .project-card, .stat-card, .cert-card').forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity  = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity  = '1';
      cursorRing.style.opacity = '0.6';
    });
  } else {
    // Hide cursor elements on touch
    if (cursorDot)  cursorDot.style.display  = 'none';
    if (cursorRing) cursorRing.style.display  = 'none';
  }

} else {
  /* ---- Reduced motion: show everything immediately ---- */
  document.querySelectorAll('[data-reveal], .hero-word, .hero-subtitle, .hero-cta, .hero-socials').forEach((el) => {
    el.style.opacity   = '1';
    el.style.transform = 'none';
  });
  document.querySelectorAll('.pill').forEach((p) => {
    p.style.opacity   = '1';
    p.style.transform = 'none';
  });
  document.querySelectorAll('.section-rule').forEach((r) => {
    r.style.width = '100%';
  });
  // Static text for typewriter
  const target = document.getElementById('typewriter-text');
  if (target) target.textContent = 'Full Stack Developer';
}

/* -------- NAVBAR SCROLLED STYLE -------- */
const navbarStyle = document.createElement('style');
navbarStyle.textContent = `
  .navbar.scrolled {
    box-shadow: 0 4px 30px rgba(0,0,0,0.15);
  }
`;
document.head.appendChild(navbarStyle);
