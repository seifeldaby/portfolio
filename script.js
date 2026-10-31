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
const VALID_PAGES = ['home', 'about', 'services', 'achievements', 'portfolio', 'reviews', 'contact'];
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
    const match = t === name;
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
  // Load reviews the first time the Reviews page is opened
  if (name === 'reviews' && window.loadReviews) window.loadReviews();
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


// ── REVIEWS & RECOMMENDATIONS (Firebase Firestore, plain REST — no SDK, stays light) ──
// SETUP (once, see README section 19): create a free Firebase project + Firestore database,
// paste the Rules from the README, then fill in these two values from
// Firebase Console → Project settings → General → "Web API Key" and "Project ID".
// While they still say 'YOUR_...', the form falls back to sending the text to your email
// (via Formspree) and nothing is shown publicly.
const FIREBASE_PROJECT_ID = 'seif-portfolio-review';
const FIREBASE_API_KEY    = 'AIzaSyCZ3DbPaYuM26H8pTGeJ8Iba4RZaz88Reo';

(function () {
  const list = document.getElementById('rvList');
  const form = document.getElementById('reviewForm');
  if (!list || !form) return;

  const configured = FIREBASE_PROJECT_ID !== 'YOUR_PROJECT_ID' && FIREBASE_API_KEY !== 'YOUR_WEB_API_KEY';
  const BASE = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;
  let items = [], filter = 'all', loaded = false, rating = 0;

  const $ = id => document.getElementById(id);
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

  // ---- render (textContent only, so visitors can never inject HTML) ----
  function render() {
    list.textContent = '';
    const shown = items.filter(r => filter === 'all' || r.type === filter);
    $('rvCountAll').textContent = items.length;
    $('rvCountRec').textContent = items.filter(r => r.type === 'recommendation').length;
    $('rvCountRev').textContent = items.filter(r => r.type === 'review').length;
    const rated = items.filter(r => r.rating > 0);
    const avg = $('rvAvg');
    if (rated.length) { avg.hidden = false; avg.textContent = '★ ' + (rated.reduce((a, r) => a + r.rating, 0) / rated.length).toFixed(1) + ' · ' + rated.length + (rated.length === 1 ? ' rating' : ' ratings'); }
    else avg.hidden = true;
    if (!shown.length) {
      list.appendChild(el('p', 'rv-empty', configured ? 'Nothing here yet — be the first to leave one below.' : 'Reviews will appear here soon. You can already send yours below.'));
      return;
    }
    shown.forEach(r => {
      const card = el('div', 'rv-card');
      const top = el('div', 'rv-card-top');
      top.appendChild(el('div', 'rv-stars', r.rating ? '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating) : ''));
      top.appendChild(el('span', 'rv-badge', r.type === 'recommendation' ? 'Recommendation' : 'Review'));
      const who = el('div', 'rv-who');
      who.appendChild(el('div', 'rv-name', r.name));
      who.appendChild(el('div', 'rv-role', r.role));
      if (r.date) who.appendChild(el('div', 'rv-date', r.date));
      card.append(top, el('p', 'rv-text', r.message), who);
      list.appendChild(card);
    });
  }

  function parse(doc) {
    const f = doc.fields || {};
    const str = k => (f[k] && f[k].stringValue) || '';
    const d = f.createdAt && f.createdAt.timestampValue ? new Date(f.createdAt.timestampValue) : null;
    return {
      name: str('name'), role: str('role'), message: str('message'),
      type: str('type') === 'review' ? 'review' : 'recommendation',
      rating: Math.min(5, Math.max(0, parseInt(f.rating && f.rating.integerValue, 10) || 0)),
      date: d && !isNaN(d) ? d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }) : ''
    };
  }

  window.loadReviews = async function (force) {
    if (loaded && !force) return;
    if (!configured) { loaded = true; render(); return; }
    try {
      const res = await fetch(`${BASE}:runQuery?key=${FIREBASE_API_KEY}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ structuredQuery: {
          from: [{ collectionId: 'reviews' }],
          orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
          limit: 60 } })
      });
      if (!res.ok) throw new Error(res.status);
      const rows = await res.json();
      items = rows.filter(r => r.document).map(r => parse(r.document)).filter(r => r.name && r.message);
      loaded = true; render();
    } catch (e) {
      list.textContent = '';
      list.appendChild(el('p', 'rv-empty', 'Could not load reviews right now. Please try again later.'));
    }
  };

  // ---- filters ----
  $('rvFilters').addEventListener('click', e => {
    const b = e.target.closest('.rv-filter'); if (!b) return;
    filter = b.dataset.filter;
    document.querySelectorAll('.rv-filter').forEach(x => x.classList.toggle('active', x === b));
    render();
  });

  // ---- star input (click the same star again to clear) ----
  const stars = $('rvStarsInput');
  function paint(v) { stars.querySelectorAll('button').forEach(b => b.classList.toggle('on', +b.dataset.v <= v)); }
  stars.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    rating = (rating === +b.dataset.v) ? 0 : +b.dataset.v; paint(rating);
  });
  stars.addEventListener('mouseover', e => { const b = e.target.closest('button'); if (b) paint(+b.dataset.v); });
  stars.addEventListener('mouseleave', () => paint(rating));

  $('rvMessage').addEventListener('input', e => { $('rvChars').textContent = e.target.value.length + ' / 600'; });

  // ---- submit ----
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const msg = $('rvMsg'), btn = $('rvSubmit');
    msg.className = 'form-msg'; msg.textContent = '';
    if ($('rvWebsite').value) return;                       // honeypot: bots fill this, people never see it

    // simple client-side throttle: max 1 post / 60s and 3 per day per browser
    let log = [];
    try { log = JSON.parse(localStorage.getItem('rvPosts') || '[]').filter(t => Date.now() - t < 864e5); } catch (x) {}
    if (log.length && Date.now() - log[log.length - 1] < 60000) { msg.textContent = '⚠ Please wait a minute before posting again.'; msg.className = 'form-msg error'; return; }
    if (log.length >= 3) { msg.textContent = '⚠ Thanks — you have reached today\'s limit.'; msg.className = 'form-msg error'; return; }

    const data = {
      name: form.name.value.trim().slice(0, 60),
      role: form.role.value.trim().slice(0, 80),
      type: form.type.value === 'review' ? 'review' : 'recommendation',
      message: form.message.value.trim().slice(0, 600),
      rating
    };
    if (data.name.length < 2 || data.role.length < 2 || data.message.length < 10) { msg.textContent = '⚠ Please fill in every field (message: at least 10 characters).'; msg.className = 'form-msg error'; return; }

    btn.disabled = true; btn.textContent = 'Posting…';
    try {
      if (configured) {
        const res = await fetch(`${BASE}/reviews?key=${FIREBASE_API_KEY}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fields: {
            name: { stringValue: data.name }, role: { stringValue: data.role },
            type: { stringValue: data.type }, message: { stringValue: data.message },
            rating: { integerValue: String(data.rating) },
            createdAt: { timestampValue: new Date().toISOString() } } })
        });
        if (!res.ok) throw new Error(res.status);
        msg.textContent = '✓ Thank you! Your ' + data.type + ' is now live.';
        await window.loadReviews(true);
      } else {
        // Not connected to Firebase yet: send it to the owner's email instead.
        const fd = new FormData();
        fd.append('subject', 'New ' + data.type + ' from the portfolio');
        Object.keys(data).forEach(k => fd.append(k, data[k]));
        const res = await fetch(FORMSPREE_URL, { method: 'POST', headers: { 'Accept': 'application/json' }, body: fd });
        if (!res.ok) throw new Error(res.status);
        msg.textContent = '✓ Thank you! Your ' + data.type + ' was sent to Seif.';
      }
      msg.className = 'form-msg success';
      log.push(Date.now()); try { localStorage.setItem('rvPosts', JSON.stringify(log)); } catch (x) {}
      form.reset(); rating = 0; paint(0); $('rvChars').textContent = '0 / 600';
    } catch (err) {
      msg.textContent = '⚠ Could not post right now. Please try again in a moment.';
      msg.className = 'form-msg error';
    } finally {
      btn.disabled = false; btn.textContent = 'Post';
    }
  });

  // if someone opens yoursite/#reviews directly
  if (document.getElementById('page-reviews').classList.contains('active')) window.loadReviews();
})();
