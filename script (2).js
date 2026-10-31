// ── LOGO: find assets/logo.<any extension> ──
// The logo is referenced by NAME ONLY (assets/logo). Upload your logo as
// logo.png, logo.svg, logo.webp, logo.jpg, ... — whichever extension you like —
// and this finds it and fills in the loader, navbar, footer and the browser-tab
// favicon. If none of them exists, the logo spots simply stay hidden.
(function () {
  const BASE = 'assets/logo';
  const EXTS = ['png', 'svg', 'webp', 'jpg', 'jpeg', 'gif', 'avif', 'ico'];
  const MIME = { png: 'image/png', svg: 'image/svg+xml', webp: 'image/webp', jpg: 'image/jpeg',
                 jpeg: 'image/jpeg', gif: 'image/gif', avif: 'image/avif', ico: 'image/x-icon' };

  function probe(i) {
    if (i >= EXTS.length) return;
    const ext = EXTS[i];
    const url = BASE + '.' + ext;
    const test = new Image();
    test.onload = () => apply(url, ext);
    test.onerror = () => probe(i + 1);
    test.src = url;
  }

  function apply(url, ext) {
    document.querySelectorAll('img[data-logo]').forEach(img => { img.src = url; });
    const fav = document.getElementById('siteFavicon');
    if (fav) { fav.type = MIME[ext] || ''; fav.href = url; }
    const apple = document.getElementById('siteAppleIcon');
    if (apple) apple.href = url;
  }

  probe(0);
})();

// ── CLEAR OUT ANY OLD CACHED VERSION ──
// Belt-and-braces: if a service worker or the Cache Storage API was ever
// registered for this site (e.g. by a future PWA setup), drop it so a
// refresh always gets the latest files instead of a stale cached copy.
(function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister())).catch(() => {});
  }
  if (window.caches && caches.keys) {
    caches.keys().then(keys => keys.forEach(k => caches.delete(k))).catch(() => {});
  }
})();

// ── FRESHNESS CHECK ──
// If this tab is left open and idle (no clicks/scrolling/typing) for 5+ minutes,
// reload it the next time it's focused again, so it never shows a stale cached
// version of the site if content was updated in the meantime.
(function () {
  const STALE_AFTER_MS = 5 * 60 * 1000; // 5 minutes
  let lastActiveAt = Date.now();
  ['click', 'scroll', 'keydown', 'mousemove', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, () => { lastActiveAt = Date.now(); }, { passive: true });
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      if (Date.now() - lastActiveAt > STALE_AFTER_MS) {
        window.location.reload();
        return;
      }
      lastActiveAt = Date.now();
    }
  });
})();

// ── LOADER ──
// First visit in this browser session: the full ~7s logo reveal.
// Refreshing / coming back in the same session: logo + name appear instantly
// (no animation) and the loader leaves after 2 seconds. The 'intro-seen' class
// is set by a tiny inline script in <head> so there's no flash of the animation.
(function () {
  const loaderEl = document.getElementById('loader');
  if (!loaderEl) return;
  const returning = document.documentElement.classList.contains('intro-seen');
  if (returning) {
    setTimeout(() => loaderEl.classList.add('hide'), 2000);
  } else {
    try { sessionStorage.setItem('introPlayed', '1'); } catch (e) {}
    setTimeout(() => loaderEl.classList.add('hide'), 7000);
  }
})();

// ── TYPING EFFECT ──
const phrases = ['EE Engineer & Builder','PCB Designer','Autonomous Systems Dev','Technical Instructor'];
let pi = 0, ci = 0, del = false;
const tEl = document.getElementById('typingText');
function type() {
  const cur = phrases[pi];
  if (!del) { tEl.textContent = cur.slice(0, ++ci); if (ci === cur.length) { del = true; setTimeout(type, 1800); return; } }
  else { tEl.textContent = cur.slice(0, --ci); if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; } }
  setTimeout(type, del ? 50 : 80);
}
setTimeout(type, 4000);

// ── SPA NAVIGATION (with # deep-linking, e.g. yoursite.com/#services) ──
const VALID_PAGES = ['home', 'about', 'services', 'achievements', 'portfolio', 'contact'];
let isRoutingFromHash = false;

function showPage(name, updateHash = true) {
  if (!VALID_PAGES.includes(name)) name = 'home';
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target
  document.getElementById('page-' + name).classList.add('active');
  // Update desktop nav
  document.querySelectorAll('.nav-links button').forEach(b => {
    const t = b.textContent.toLowerCase();
    const match = (name === 'home' && t === 'home') ||
                  (name === 'about' && t === 'about') ||
                  (name === 'services' && t === 'services') ||
                  (name === 'achievements' && t === 'achievements') ||
                  (name === 'portfolio' && t === 'portfolio') ||
                  (name === 'contact' && t === 'contact');
    b.classList.toggle('active', match);
  });
  // Update mobile nav
  document.querySelectorAll('.mob-nav button').forEach(b => {
    const t = b.textContent.toLowerCase();
    const match = t === name || (t === 'achieve' && name === 'achievements');
    b.classList.toggle('active', match);
  });
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Trigger reveal for new page
  setTimeout(triggerReveal, 100);
  // Keep the URL hash in sync so this page can be linked/bookmarked/shared directly
  if (updateHash && !isRoutingFromHash) {
    const hash = '#' + name;
    if (window.location.hash !== hash) window.location.hash = hash;
  }
}

// Handle direct links (e.g. someone opens yoursite.com/#portfolio) and browser back/forward
function routeFromHash() {
  const name = (window.location.hash || '#home').replace('#', '') || 'home';
  isRoutingFromHash = true;
  showPage(name, false);
  isRoutingFromHash = false;
}
window.addEventListener('hashchange', routeFromHash);
routeFromHash(); // run once on initial load so a direct/shared link opens the right page

// Used by the "✉ Email" quick link on the Contact page itself:
// scrolls to and focuses the working form instead of relying on mailto.
function focusContactForm(e) {
  if (e) e.preventDefault();
  const form = document.getElementById('contactForm');
  if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const nameField = document.getElementById('formName');
  if (nameField) setTimeout(() => nameField.focus(), 400);
}

// Used by the "✉ Email" buttons on the Services page: jumps to the Contact
// form and pre-fills the Subject field so the visitor doesn't retype it.
function goToContactWithSubject(e, subject) {
  if (e) e.preventDefault();
  const subjectField = document.getElementById('formSubject');
  if (subjectField) subjectField.value = subject;
  showPage('contact');
  setTimeout(() => {
    const msgField = document.getElementById('formMessage');
    if (msgField) msgField.focus();
  }, 450);
}

// ── SCROLL REVEAL ──
function triggerReveal() {
  const els = document.querySelectorAll('.page.active .reveal:not(.visible)');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}
triggerReveal();
window.addEventListener('scroll', triggerReveal);

// ── THEME SWITCH ──
const themeSwitch = document.getElementById('themeSwitch');
const thumb = document.getElementById('themeSwitchThumb');
const photo = document.getElementById('profilePhoto');

function applyTheme(isLight) {
  document.body.classList.toggle('light', isLight);
  thumb.textContent = isLight ? '☀️' : '🌙';
  document.documentElement.style.setProperty('--gold', isLight ? '#8B6914' : '#C9A84C');
  themeSwitch.setAttribute('aria-pressed', String(isLight));
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) themeColorMeta.setAttribute('content', isLight ? '#F5F2EB' : '#0D0D0D');
  if (photo) {
    photo.style.opacity = '0';
    setTimeout(() => { photo.src = isLight ? 'assets/seif-photo-light.png' : 'assets/seif-photo.png'; photo.style.opacity = '1'; }, 300);
  }
}

// On first visit (no saved preference), follow the visitor's OS/browser setting.
// After that, always respect whatever the visitor last chose manually.
let savedTheme = null;
try { savedTheme = localStorage.getItem('theme'); } catch (e) { /* storage unavailable */ }
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
const initialIsLight = savedTheme ? savedTheme === 'light' : prefersLight;
applyTheme(initialIsLight);

themeSwitch.addEventListener('click', () => {
  const isLight = !document.body.classList.contains('light');
  applyTheme(isLight);
  try { localStorage.setItem('theme', isLight ? 'light' : 'dark'); } catch (e) { /* storage unavailable */ }
});
themeSwitch.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    themeSwitch.click();
  }
});

// If the visitor hasn't manually chosen a theme yet, keep following OS changes live.
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    let hasManualChoice = null;
    try { hasManualChoice = localStorage.getItem('theme'); } catch (err) { /* storage unavailable */ }
    if (!hasManualChoice) applyTheme(e.matches);
  });
}

// ── BLOG ──
const blogData = [
  {
    date: 'Coming Soon',
    title: 'Building an Autonomous Racing Stack from Scratch with ROS 2',
    body: '<div class="blog-coming-soon"><p>This article is <span>coming soon.</span></p></div>'
  },
  {
    date: 'Coming Soon',
    title: 'Designing Your First Custom ESP32 PCB with EasyEDA',
    body: '<div class="blog-coming-soon"><p>This article is <span>coming soon.</span></p></div>'
  },
  {
    date: 'Coming Soon',
    title: 'SLAM & Localization: A Practical Guide for Robotics Students',
    body: '<div class="blog-coming-soon"><p>This article is <span>coming soon.</span></p></div>'
  }
];
function openBlog(i) {
  const art = document.getElementById('blogArticle');
  document.getElementById('articleDate').textContent = blogData[i].date;
  document.getElementById('articleTitle').textContent = blogData[i].title;
  document.getElementById('articleBody').innerHTML = blogData[i].body;
  art.classList.add('open');
  art.scrollTop = 0;
}
function closeBlog() {
  document.getElementById('blogArticle').classList.remove('open');
}

// ── BACK TO TOP ──
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => { btt.classList.toggle('show', window.scrollY > 400); });

// ── CONTACT FORM ──
// STEP 1: Sign up free at https://formspree.io and create a new form.
// STEP 2: Copy your form ID (looks like "xyzabc123") and paste it below,
//         replacing "YOUR_FORM_ID". That's the only change needed.
const FORMSPREE_ID = 'mbgllepa';
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = this;
  const btn = document.getElementById('formSubmit');
  const msg = document.getElementById('formMsg');
  const name = document.getElementById('formName').value;
  const email = document.getElementById('formEmail').value;
  const subject = document.getElementById('formSubject').value;
  const message = document.getElementById('formMessage').value;

  btn.disabled = true; btn.textContent = 'Sending...';
  msg.textContent = ''; msg.className = 'form-msg';

  // Fallback: if the Formspree ID hasn't been set up yet, use mailto so the form still works.
  if (FORMSPREE_ID === 'YOUR_FORM_ID') {
    window.location.href = `mailto:seif123eldaby@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
    setTimeout(() => {
      msg.textContent = '✓ Your email client has been opened. Thank you!';
      msg.className = 'form-msg success';
      btn.disabled = false; btn.textContent = 'Send Message';
      form.reset();
    }, 1000);
    return;
  }

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
    if (res.ok) {
      msg.textContent = '✓ Message sent — thank you! I\'ll get back to you soon.';
      msg.className = 'form-msg success';
      form.reset();
    } else {
      throw new Error('Formspree request failed');
    }
  } catch (err) {
    msg.textContent = '⚠ Something went wrong. Please email me directly at seif123eldaby@gmail.com.';
    msg.className = 'form-msg error';
  } finally {
    btn.disabled = false; btn.textContent = 'Send Message';
  }
});

// ── CERTIFICATE PDFs: render page 1 straight onto the card, lazily ──
// Draws each PDF's first page onto a <canvas> inside its card so the actual
// certificate shows on the site itself — no click-through needed to see it.
// Only renders once a card scrolls near the viewport, and only once per card,
// so all 8 certificates don't load at the same time.
(function () {
  const thumbs = document.querySelectorAll('.cert-thumb-pdf[data-pdf-src]');
  if (!thumbs.length || typeof pdfjsLib === 'undefined') return;
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  async function renderPdfThumb(anchor) {
    const src = anchor.dataset.pdfSrc;
    const canvas = anchor.querySelector('.cert-pdf-canvas');
    const placeholder = anchor.querySelector('.cert-pdf-preview');
    if (!canvas || !src) return;
    try {
      const pdf = await pdfjsLib.getDocument(src).promise;
      const page = await pdf.getPage(1);
      const baseViewport = page.getViewport({ scale: 1 });
      const targetWidth = (anchor.clientWidth || 300) * Math.min(window.devicePixelRatio || 1, 2);
      const scale = targetWidth / baseViewport.width;
      const viewport = page.getViewport({ scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;
      canvas.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
    } catch (err) {
      // File not uploaded yet (or failed to load) — the icon+label placeholder stays, which is the intended default.
    }
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          renderPdfThumb(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '300px 0px' });
    thumbs.forEach(t => observer.observe(t));
  } else {
    thumbs.forEach(renderPdfThumb);
  }
})();

// ── PROFILE PHOTO: subtle 3D tilt that follows the cursor ──
// Skipped on touch devices (no real cursor) and when the OS asks for less motion.
(function () {
  const frame = document.getElementById('photoFrame');
  const img = document.getElementById('profilePhoto');
  if (!frame || !img) return;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
  if (prefersReduced || isTouch) return;

  let raf = null;
  frame.addEventListener('mousemove', (e) => {
    const r = frame.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      img.style.setProperty('--tiltX', (px * 10).toFixed(2) + 'deg');
      img.style.setProperty('--tiltY', (-py * 7).toFixed(2) + 'deg');
      raf = null;
    });
  });
  frame.addEventListener('mouseleave', () => {
    img.style.setProperty('--tiltX', '0deg');
    img.style.setProperty('--tiltY', '0deg');
  });
})();
