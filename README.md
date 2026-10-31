# Portfolio Maintenance Guide — Seif Eldaby

*This file is available in two languages: [English](#english) first, then [العربية](#عربي) below.*

---

<a name="english"></a>
# 🇬🇧 English

A complete reference for editing and extending your portfolio site — no need to understand the whole codebase. Every section below has: **where to look**, **the code to use**, and **a ready-to-paste example**.

> 💡 General tip: open the files in any code editor (VS Code is free and great), and use Ctrl+F (or Cmd+F) to search for the keyword mentioned under each section.

## 📁 Table of Contents

1. [Project Structure](#project-structure)
2. [Adding a New Project](#1-adding-a-new-project)
3. [Adding a New Certification](#2-adding-a-new-certification)
4. [Adding a New Work Experience](#3-adding-a-new-work-experience)
5. [Adding a New Skill](#4-adding-a-new-skill)
6. [Adding a Tool/Service Image](#5-adding-a-toolservice-image)
7. [Your Logo](#6-your-logo)
8. [The Intro Loader](#7-the-intro-loader)
9. [Optimizing Images for Speed](#8-optimizing-images-for-speed)
10. [Updating Your CV](#9-updating-your-cv)
11. [Changing the Live Domain & Share Image](#10-changing-the-live-domain--share-image)
12. [The Contact Form (Formspree)](#11-the-contact-form-formspree)
13. [Adding a New Subsection](#12-adding-a-new-subsection)
14. [Removing/Disabling a Project or Certification](#13-removingdisabling-a-project-or-certification)
15. [How the Theme Works (Dark/Light)](#14-how-the-theme-works-darklight)
16. [How Deep Linking Works](#15-how-deep-linking-works)
17. [Publishing Changes to GitHub](#16-publishing-changes-to-github)
18. [Common Issues & Fixes](#17-common-issues--fixes)
19. [Pre-Publish Checklist](#18-pre-publish-checklist)

---

## Project Structure

The site is made of **three files** plus an `assets` folder:

| File | What it holds | You edit it when you want to… |
|---|---|---|
| `index.html` | All the **content**: text, projects, certificates, links, SEO tags | add/remove a project, certificate, skill, experience, change wording or links |
| `style.css` | All the **design**: colors, fonts, layout, animations, loader timing, phone adjustments | change colors, sizes, spacing, animation speed |
| `script.js` | All the **behavior**: page switching, loader, theme, contact form, logo finder, certificate PDF previews | change the Formspree ID, the loader duration, or how something behaves |

> ⚠️ The three files work together: `index.html` loads `style.css` and `script.js`. They must sit **in the same folder**, and when you publish, upload whichever ones you changed (see [Publishing Changes](#16-publishing-changes-to-github)).

The site runs as a **Single Page Application (SPA)** — every page (Home, About, Services, Achievements, Portfolio, Contact) lives inside `index.html`, and JavaScript shows/hides the right one.

Each page block looks like this:
```html
<div class="page" id="page-about">
  ...content...
</div>
```
To find a specific page, search (Ctrl+F) for `id="page-` + the page name (e.g. `id="page-portfolio"`).

Required folder structure:
```
/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── logo.png                 ← any extension works, see "Your Logo"
    ├── seif-photo.png
    ├── seif-photo-light.png     ← portrait shown in light theme
    ├── Seif_Eldaby_CV.pdf
    ├── tools/
    │   ├── altium.png  kicad.png  easyeda.png
    │   └── proteus.png  ltspice.png  multisim.png
    ├── services/
    │   ├── pcb-design.png  prototyping.png  assembly.png
    └── certificates/
        └── (certificate images / PDFs — exact names are in section 2)
```

---

## 1) Adding a New Project

**Search for:** `class="subsection-title">PCB & Hardware Design` (or `Autonomous Systems & Robotics` / `AI & Software`, depending on which section you want to add to).

Each project is one line in this format. Copy it, paste it right before the closing `</div>` of that `projects-grid`, and edit the values:

```html
<div class="project-card reveal reveal-delay-1" data-num="XX"><div class="project-icon">⚡</div><div class="project-name">Your Project Name</div><div class="project-desc">A short 1–2 sentence description of the project.</div><a href="https://github.com/seifeldaby/repo-name" target="_blank" rel="noopener noreferrer" class="project-link">View on GitHub ↗</a></div>
```

**What to change:**
| Part | What it is |
|---|---|
| `data-num="XX"` | Sequential number (continue from the last one used in that section) |
| `reveal-delay-1` | A number 1–4 (controls the reveal-animation timing, just for variety) |
| `⚡` | An emoji representing the project |
| Project name & description | Plain text |
| `href="..."` | GitHub or Google Drive link |
| Button text | Use `View on GitHub ↗` for GitHub, or `View Project Files ↗` for Google Drive |

**If the project doesn't have a link yet:**
```html
<a href="#" class="project-link">GitHub — Coming Soon</a>
```
(drop `target="_blank" rel="noopener noreferrer"` in this case since it won't open anything anyway)

---

## 2) Adding a New Certification

**Search for:** the name of the closest matching section (`PCB & Hardware`, `Robotics & Autonomous Systems`, `AI & Data Science`, or `Professional Development & Competitions`).

Every certificate card has two parts: a **preview** on top (the actual certificate, shown right on the site) and a **text block** under it (`cert-body`).

### Certificate that is an IMAGE (png / jpg):
```html
<div class="cert-card reveal reveal-delay-1">
  <a href="assets/certificates/My_Certificate.png" target="_blank" rel="noopener noreferrer" class="cert-thumb"><img src="assets/certificates/My_Certificate.png" alt="Certificate Name" loading="lazy" onerror="this.closest('.cert-thumb').style.display='none'"></a>
  <div class="cert-body">
    <div class="cert-icon">🏅</div>
    <div class="cert-name">Certificate Name</div>
    <div class="cert-issuer">Issuing Organization</div>
    <div class="cert-date">Date (optional)</div>
    <a href="https://drive.google.com/..." target="_blank" rel="noopener noreferrer" class="cert-link">View Certificate ↗</a>
  </div>
</div>
```

### Certificate that is a PDF:
Replace the first line (the `cert-thumb` link) with this:
```html
<a href="assets/certificates/My_Certificate.pdf" target="_blank" rel="noopener noreferrer" class="cert-thumb cert-thumb-pdf" data-pdf-src="assets/certificates/My_Certificate.pdf"><div class="cert-pdf-preview"><span class="cert-pdf-icon">📄</span><span class="cert-pdf-label">PDF Certificate</span></div><canvas class="cert-pdf-canvas" aria-hidden="true"></canvas></a>
```
`script.js` draws the **first page** of the PDF onto that card automatically — only when the card scrolls near the screen, so the page stays fast.

### Certificate with no file yet:
Just leave the preview line out — the card still looks fine (text only, centered). Add it later whenever you have the file.

**Rules that matter:**
- The filename in `href`/`src` must match the uploaded file **exactly, including the extension** and capital letters. Spaces must be written as `%20` (e.g. `My%20File.pdf`).
- If the image file isn't uploaded (or the name is wrong), the preview hides itself and the card falls back to the normal text card — nothing breaks.
- No date? Delete the `cert-date` line. No link? Delete the `<a ... class="cert-link">` line.
- Files currently expected in `assets/certificates/` (upload with these exact names):
  `CSWA_SolidWorks_CAD_Design_Associate.pdf` · `Professional_PCB_Design_Altium_Udemy.pdf` · `Arduino_Workshop_Completion_Amper.png` · `Electronics_Workshop_Completion_Amper.png` · `ESP32_Custom_PCB_Design_Workshop_IEEE.jpg` · `ICRA_2026_RoboRacer_League_Participation.pdf` · `Assiut_Motorsport_Kickdown_2025_Participation.pdf` · `Certificate of Qualification - 5th International RoboRacer Sim Racing.pdf` · `Robotics_32Hrs_Appreciation_EME_ITIDA.png` · `AI_for_Beginners_Almentor.jpg` · `Basics_of_AI_and_ChatGPT_Almentor.jpg` · `Machine_Learning_40Hrs_EME_ITIDA.jpg` · `AWS_Educate_Program_Completion.pdf` · `1st_Place_Better_Teacher_Competition.png` · `DECI_Level_Two_Nanodegree_Udacity_Oct_2023.jpg` · `DECI_Geeks_L2_Midyear_Competition_Microsoft_Feb_2023.pdf` · `AAKRUTI_2025_Innovation_Competition.pdf`
- Five cards are "optional": they look for `PCB_Design_Level_1_KiCAD_INNOVA`, `Technical_Training_Certificate`, `AI_Data_Scientist_Track_DEPI`, `ITIDA_Assiut_Summer_Training` and `Digital_Badge_McKinsey` — as **.png first, then .jpg**. Upload one of those (png or jpg) and it appears by itself; if you don't, the card stays a normal text card.

---

## 3) Adding a New Work Experience

**Search for:** `class="exp-list"` (found on the About page).

Ready template — paste it in the right spot based on date order (most recent on top):

```html
<div class="exp-item reveal">
  <div class="exp-meta"><div class="exp-date">Jan 2027 – Present</div><div class="exp-company">Company Name</div></div>
  <div class="exp-content">
    <div class="exp-role">Job Title</div>
    <div class="exp-desc">A brief description of your responsibilities and achievements in this role.</div>
    <div class="exp-tags"><span class="tag">Skill 1</span><span class="tag">Skill 2</span></div>
  </div>
</div>
```

---

## 4) Adding a New Skill

**Search for:** `skill-cat-title` — you'll find 4 categories (Hardware & PCB, Software & Tools, Technical Domains, Languages).

Inside any category, add a line like this next to the existing ones:
```html
<span class="skill-pill">Skill Name</span>
```

---

## 5) Adding a Tool/Service Image

### Directly on GitHub (no local software needed):
1. Open your repo on github.com
2. Navigate into `assets/tools/` (or `assets/services/`)
3. Click **Add file → Upload files**
4. Drag your image in, making sure the filename **matches exactly** (case-sensitive)

### Required exact filenames:
**Inside `assets/tools/`:** `altium.png` · `kicad.png` · `easyeda.png` · `proteus.png` · `ltspice.png` · `multisim.png`

**Inside `assets/services/`:** `pcb-design.png` · `prototyping.png` · `assembly.png`

> The code already looks for these exact filenames, so no edits are needed — the image appears automatically once uploaded. Until then a small placeholder icon shows.

### Adding a brand-new tool/service (not in the list above):
Search for `class="tools-grid"` and copy the template of any existing `tool-item`, then change the image name and label.

---

## 6) Your Logo

The logo is used in **four places**: the intro loader, the top-left of the navbar (next to your name), the footer, and the browser-tab icon (favicon).

**You only need ONE file named `logo`, in the `assets` folder — with any extension you like:**

`assets/logo.png` · `logo.svg` · `logo.webp` · `logo.jpg` · `logo.jpeg` · `logo.gif` · `logo.avif` · `logo.ico`

`script.js` looks for them in that order and uses the first one it finds, everywhere at once. To change the logo later: upload the new file (e.g. `logo.svg`) **and delete the old one** (otherwise an earlier extension in the list wins).

Good to know:
- A square (1:1) image with a **transparent background** works best. The gold logo on a transparent PNG is what ships by default.
- In the light theme the navbar/footer logo is darkened automatically so it stays visible on the light background.
- If there's no `logo.*` file at all, those four spots simply stay hidden (no broken-image icon).
- Browsers cache the tab icon aggressively — after changing the logo do a hard refresh, and it may take a while to update in other tabs.

---

## 7) The Intro Loader

The full-screen intro (gold lines converging → logo is drawn in → your name) plays like this:

| Visit | What happens |
|---|---|
| **First visit** in this browser session | The full animation, about **7 seconds** |
| **Refresh / coming back** in the same session | Logo + name appear **instantly** (no animation) and the loader leaves after **2 seconds** |

"Session" means the same browser tab/window until it's closed — a brand-new visit later sees the full intro again.

**Where to change the timing:**
- **How long the loader stays** → `script.js`, search for `// ── LOADER ──`:
  `7000` = first visit (milliseconds), `2000` = returning visit.
- **When each part appears (seconds)** → `style.css`, search for `.loader-badge {` and the lines below it:
  - the logo: `badgeReveal 1.9s ... 0.9s` → lasts 1.9s, starts at 0.9s
  - your name (`.loader-name`): `loaderReveal 0.9s ease 2.2s` → the **last number is when it appears**
  - the line under it (`.loader-sub`): `... 2.7s`
  - the loading bar (`.loader-bar-fill`): `loaderBar 3.6s ease 3s` → takes 3.6s, starts at 3s
- If you make the animation longer, raise the `7000` in `script.js` too, so the loader doesn't close before the animation finishes.
- **Returning-visit look** → `style.css`, search for `intro-seen`. It currently shows the logo and the name only; delete `.intro-seen #loader .loader-sub,` from that rule if you also want the "Electrical & Electronics Engineer" line.

---

## 8) Optimizing Images for Speed

Big images are the #1 thing that can slow the site down (especially on phones). Before uploading photos, certificates and logos, shrink them:

| Image | Displayed at about | Recommended max size |
|---|---|---|
| Your portrait (`seif-photo.png`) | 380×480 | ~1000 px on the longest side |
| Certificate images | ~350 px wide | ~1400 px on the longest side |
| Tool logos / service images | ~112 px | ~400 px |
| Logo | up to ~200 px | ~800 px |

Aim for **under ~300 KB** per image, and **under ~1–2 MB** per PDF.

### The easy way: the included script
`optimize_images.py` shrinks everything for you **without renaming files or changing extensions**:
1. Install Python 3 and run once: `pip install pillow`
2. Put `optimize_images.py` next to your `assets` folder.
3. Run: `python optimize_images.py`
4. It writes optimized copies into `assets_optimized/` (same names, same sub-folders) and prints the size saved for every file. Your originals are not touched.
5. Check a few, then upload the contents of `assets_optimized/` to GitHub over the originals.

It does **not** shrink PDFs — compress big PDFs with a free tool (e.g. iLovePDF "Compress PDF") and keep the same file name.

### Without Python:
Use [squoosh.app](https://squoosh.app) or [tinypng.com](https://tinypng.com): resize, compress, **download in the same format** (PNG stays PNG, JPG stays JPG) and keep the exact filename.

---

## 9) Updating Your CV

1. Name your PDF exactly: `Seif_Eldaby_CV.pdf`
2. Upload it to the `assets/` folder on GitHub (it will ask "replace this file?" if an older version exists — click Yes)
3. No other changes needed — the About page link always points to this exact filename.

---

## 10) Changing the Live Domain & Share Image

### The domain
Once you have the final URL of the site (GitHub Pages URL or a custom domain), **search `index.html` for `seifeldaby.github.io`** — it appears in **7 places** that all need to match your real link:

| Location | Why it matters |
|---|---|
| `og:url` | The preview link when someone shares your site |
| `og:image` | Social-media preview image |
| `twitter:image` | Same, for Twitter/X |
| `"url"` inside JSON-LD | Structured data for Google |
| `"image"` inside JSON-LD | Same |
| `rel="canonical"` | Tells Google which link is the "official" one |

Easiest: use "Find & Replace All" to replace `seifeldaby.github.io` with your real domain everywhere at once.

> ⚠️ If your site lives in a **sub-folder** (for example `seifeldaby.github.io/portfolio/`), include the folder in the replacement (`seifeldaby.github.io/portfolio`), otherwise the share links will point to the wrong page.

### The share image (optional)
When someone shares your link on WhatsApp / LinkedIn / Twitter, the preview card shows the `og:image`. Right now that's your portrait. A landscape **1200×630** image with your logo and name looks better:
1. Upload it as `assets/og-image.png`.
2. In `index.html`, change `assets/seif-photo.png` to `assets/og-image.png` in the three share-image spots: the `og:image` line, the `twitter:image` line, and `"image":` inside the JSON-LD block.
3. Share platforms cache previews — to refresh one, use [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) or Facebook's Sharing Debugger.

---

## 11) The Contact Form (Formspree)

The form is already connected to: `https://formspree.io/f/mbgllepa`

**To see messages that came in:**
1. Go to [formspree.io](https://formspree.io) and log in
2. Open your form (Portfolio)
3. **Submissions** tab — shows every message sent from the site, even if the email itself was delayed or didn't arrive

**To switch to a different form/account:**
In `script.js`, search for `FORMSPREE_ID` and change the value:
```js
const FORMSPREE_ID = 'mbgllepa'; // replace with the new ID
```

---

## 12) Adding a New Subsection

(like "PCB & Hardware Design" on the Portfolio page, or the four sections on the Achievements page)

Ready template:
```html
<div class="subsection reveal">
  <div class="subsection-header">
    <span class="subsection-num">04</span>
    <span class="subsection-title">New Section Name</span>
  </div>
  <div class="projects-grid">
    <!-- project cards go here -->
  </div>
</div>
```
(replace `projects-grid` with `certs-grid` if this subsection is for certifications)

---

## 13) Removing/Disabling a Project or Certification

**Easiest option without permanently deleting:** wrap the card in `<!--` and `-->` to hide it without removing the code:
```html
<!--
<div class="project-card ...">...</div>
-->
```
To delete it permanently, remove the whole card from its opening `<div class="project-card` (or `cert-card`) to its closing `</div>`. A certificate card contains inner `<div>`s, so make sure you delete up to the `</div>` that closes the card itself.

---

## 14) How the Theme Works (Dark/Light)

- On first visit, the theme is set **automatically** based on the visitor's device settings (Dark or Light).
- If a visitor manually toggles the theme, their choice is saved (in their own browser only) and persists on future visits.
- To change the colors themselves, open `style.css` and search for `--gold:` and `--dark:` at the very top (inside `:root` for dark and `body.light` for light).

---

## 15) How Deep Linking Works

Every page has a direct link:
```
yoursite.com/#home
yoursite.com/#about
yoursite.com/#services
yoursite.com/#achievements
yoursite.com/#portfolio
yoursite.com/#contact
```
You can send any of these links to someone and it will open that exact page directly. Refreshing the page also keeps the visitor on the same page they were on.

---

## 16) Publishing Changes to GitHub

1. Edit the file(s) on your computer, or directly on github.com (open the file → ✏️ Edit → change → **Commit changes**).
2. Upload **every file you changed** (`index.html`, `style.css`, `script.js`, and any new images in `assets/`).
3. **If you changed `style.css` or `script.js`, bump the version number** so visitors' browsers don't keep showing the old copy. In `index.html` search for `?v=` — there are two places:
   ```html
   <link rel="stylesheet" href="style.css?v=20261031">
   <script src="script.js?v=20261031"></script>
   ```
   Change the number in both (any new number works — using today's date, e.g. `20261120`, is a good habit). Changing only `index.html` doesn't need this.
4. GitHub Pages usually updates the live site within a minute or two.

---

## 17) Common Issues & Fixes

| Issue | Fix |
|---|---|
| Edited the file but the change isn't showing live | Wait a couple of minutes, then hard refresh (Ctrl+Shift+R / Cmd+Shift+R). If you edited `style.css` or `script.js`, make sure you bumped the `?v=` number (section 16). |
| The site shows no design at all | `style.css` wasn't uploaded, or isn't in the same folder as `index.html`. |
| Logo doesn't show anywhere | There's no file called `logo` in `assets/` (png / svg / webp / jpg / jpeg / gif / avif / ico), or the name has different capitals (`Logo.png` ≠ `logo.png`). |
| Tab icon (favicon) didn't change | Browsers cache it hard — hard refresh, or close and reopen the tab. |
| A certificate preview isn't showing | The filename must match the one in the card's `src`/`href` exactly, including extension and capitals (see section 2). Without the file, the card correctly falls back to text only. |
| A PDF certificate shows "PDF Certificate" instead of the real page | The PDF isn't uploaded / wrong name, or you're opening `index.html` straight from your computer — PDF previews only work on the live site (or a local server), not from a `file://` path. |
| A tool/service image isn't showing | Make sure the filename matches **exactly** (case-sensitive) and is in the right folder |
| The loader plays the full animation every time | It only plays in full on the first visit per browser session. If you test in a new private window it will be "first visit" each time. |
| Something looks off on a phone only | Phone-specific rules are at the **end of `style.css`** (search `PHONE FIXES`). |
| The form isn't sending | Check Formspree Dashboard → Submissions — if the message is there, the form works and it's just an email delivery delay (check Spam) |
| A link opens a blank page | If it's a Google Drive link, make sure sharing is set to "Anyone with the link can view" |
| A "Coming Soon" button doesn't do anything when clicked | Expected until you add a real link — search for the project name and update its `href` |

---

## 18) Pre-Publish Checklist

- [ ] Every `<div>` has a matching closing `</div>` (VS Code will highlight mismatches if unsure)
- [ ] Image filenames match exactly what was uploaded (including extension and capitals)
- [ ] Big images were shrunk first (section 8)
- [ ] All new links were tested and open correctly
- [ ] If you changed `style.css` / `script.js`: bumped `?v=` in `index.html`, and uploaded all changed files together
- [ ] If the domain changed, it was updated in all 7 places
- [ ] Did a hard refresh and checked the result — on desktop **and** on a phone — before sharing the site

---
---

<a name="عربي"></a>
# 🇪🇬 العربية

دليل كامل ليك، بيشرح إزاي تعدّل/تضيف أي حاجة في موقعك من غير ما تحتاج تفهم كل الكود من الأول. كل قسم فيه: **إيه المكان**، **الكود الجاهز**، و**مثال كامل تقدر تنسخه**.

> 💡 نصيحة عامة: قبل أي تعديل، افتح الملفات في أي محرر نصوص (VS Code أحسن حاجة، مجاني)، ودوس Ctrl+F (أو Cmd+F) ودور بالكلمة المفتاحية المذكورة تحت كل قسم.

## 📁 الفهرس

1. [هيكل المشروع](#هيكل-المشروع)
2. [إزاي تضيف مشروع جديد](#1-إزاي-تضيف-مشروع-جديد)
3. [إزاي تضيف شهادة جديدة](#2-إزاي-تضيف-شهادة-جديدة)
4. [إزاي تضيف خبرة عمل جديدة](#3-إزاي-تضيف-خبرة-عمل-جديدة)
5. [إزاي تضيف مهارة (Skill)](#4-إزاي-تضيف-مهارة-skill)
6. [إزاي تضيف صورة لأداة أو خدمة](#5-إزاي-تضيف-صورة-لأداة-أو-خدمة)
7. [اللوجو الخاص بيك](#6-اللوجو-الخاص-بيك)
8. [شاشة التحميل (اللودر)](#7-شاشة-التحميل-اللودر)
9. [تصغير الصور لسرعة الموقع](#8-تصغير-الصور-لسرعة-الموقع)
10. [إزاي تحدّث الـ CV](#9-إزاي-تحدّث-الـ-cv)
11. [إزاي تغيّر الدومين وصورة المشاركة](#10-إزاي-تغيّر-الدومين-وصورة-المشاركة)
12. [الفورم (Formspree)](#11-الفورم-formspree)
13. [إزاي تضيف سكشن فرعي جديد](#12-إزاي-تضيف-سكشن-فرعي-جديد)
14. [إزاي تشيل/تعطّل مشروع أو شهادة](#13-إزاي-تشيلتعطّل-مشروع-أو-شهادة)
15. [فهم الثيم (Dark/Light)](#14-فهم-الثيم-darklight)
16. [فهم الـ Deep Linking](#15-فهم-الـ-deep-linking)
17. [إزاي ترفع أي تعديل على GitHub](#16-إزاي-ترفع-أي-تعديل-على-github)
18. [مشاكل شائعة وحلولها](#17-مشاكل-شائعة-وحلولها)
19. [Checklist قبل ما تنشر تعديل](#18-checklist-قبل-ما-تنشر-تعديل)

---

## هيكل المشروع

الموقع مكوّن من **تلات ملفات** + فولدر `assets`:

| الملف | فيه إيه | بتعدّل فيه لما تحب… |
|---|---|---|
| `index.html` | كل **المحتوى**: النصوص، المشاريع، الشهادات، اللينكات، تاجات الـ SEO | تضيف/تشيل مشروع أو شهادة أو مهارة أو خبرة، أو تغيّر كلام أو لينك |
| `style.css` | كل **التصميم**: الألوان، الخطوط، الترتيب، الأنيميشن، توقيت اللودر، تظبيطات الموبايل | تغيّر ألوان أو أحجام أو مسافات أو سرعة أنيميشن |
| `script.js` | كل **السلوك**: تبديل الصفحات، اللودر، الثيم، فورم التواصل، البحث عن اللوجو، معاينة الشهادات PDF | تغيّر Formspree ID أو مدة اللودر أو طريقة شغل حاجة |

> ⚠️ التلات ملفات شغالين مع بعض: `index.html` بيحمّل `style.css` و`script.js`. لازم يكونوا **في نفس الفولدر**، ولما ترفع على GitHub ارفع أي ملف غيّرته (شوف [إزاي ترفع التعديلات](#16-إزاي-ترفع-أي-تعديل-على-github)).

الموقع شغال كـ **Single Page Application (SPA)** — يعني كل الصفحات (Home, About, Services, Achievements, Portfolio, Contact) جوه `index.html`، وجافاسكريبت هو اللي بيظهر ويخفي الصفحة المطلوبة.

كل صفحة مكتوبة كده:
```html
<div class="page" id="page-about">
  ...المحتوى...
</div>
```
لو عايز تلاقي صفحة معينة، دور بـ Ctrl+F على `id="page-` + اسم الصفحة (مثلاً `id="page-portfolio"`).

الفولدرات المطلوبة:
```
/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── logo.png                 ← أي امتداد شغال، شوف "اللوجو الخاص بيك"
    ├── seif-photo.png
    ├── seif-photo-light.png     ← صورتك في الثيم الفاتح
    ├── Seif_Eldaby_CV.pdf
    ├── tools/
    │   ├── altium.png  kicad.png  easyeda.png
    │   └── proteus.png  ltspice.png  multisim.png
    ├── services/
    │   ├── pcb-design.png  prototyping.png  assembly.png
    └── certificates/
        └── (صور/PDF الشهادات — الأسامي بالظبط في قسم 2)
```

---

## 1) إزاي تضيف مشروع جديد

**دور بـ Ctrl+F على:** `class="subsection-title">PCB & Hardware Design` (أو `Autonomous Systems & Robotics` أو `AI & Software` حسب السكشن اللي عايز تضيف فيه).

كل مشروع عبارة عن سطر واحد بالشكل ده. انسخه، الصقه قبل `</div>` بتاعة الـ `projects-grid`، وغيّر القيم:

```html
<div class="project-card reveal reveal-delay-1" data-num="XX"><div class="project-icon">⚡</div><div class="project-name">اسم المشروع هنا</div><div class="project-desc">وصف قصير للمشروع هنا (سطرين تقريبًا).</div><a href="https://github.com/seifeldaby/repo-name" target="_blank" rel="noopener noreferrer" class="project-link">View on GitHub ↗</a></div>
```

**إيه اللي تغيّره:**
| الجزء | إيه هو |
|---|---|
| `data-num="XX"` | رقم تسلسلي (استمر من آخر رقم موجود في نفس السكشن) |
| `reveal-delay-1` | رقم من 1 لـ 4 (بيتحكم في توقيت ظهور الأنيميشن، مجرد تنويع) |
| `⚡` | إيموجي بيعبّر عن المشروع |
| اسم المشروع والوصف | نص عادي |
| `href="..."` | لينك GitHub أو Google Drive |
| نص الزرار | استخدم `View on GitHub ↗` لـ GitHub، أو `View Project Files ↗` لـ Google Drive |

**لو المشروع لسه معندوش لينك:**
```html
<a href="#" class="project-link">GitHub — Coming Soon</a>
```
(شيل `target="_blank" rel="noopener noreferrer"` في الحالة دي لأنه مش هيفتح حاجة أصلًا)

---

## 2) إزاي تضيف شهادة جديدة

**دور على:** اسم أقرب سكشن (`PCB & Hardware` أو `Robotics & Autonomous Systems` أو `AI & Data Science` أو `Professional Development & Competitions`).

كل كارت شهادة فيه جزئين: **معاينة** فوق (الشهادة نفسها بتظهر على الموقع) و**بلوك النص** تحتها (`cert-body`).

### شهادة عبارة عن صورة (png / jpg):
```html
<div class="cert-card reveal reveal-delay-1">
  <a href="assets/certificates/My_Certificate.png" target="_blank" rel="noopener noreferrer" class="cert-thumb"><img src="assets/certificates/My_Certificate.png" alt="اسم الشهادة" loading="lazy" onerror="this.closest('.cert-thumb').style.display='none'"></a>
  <div class="cert-body">
    <div class="cert-icon">🏅</div>
    <div class="cert-name">اسم الشهادة</div>
    <div class="cert-issuer">الجهة المانحة</div>
    <div class="cert-date">التاريخ (اختياري)</div>
    <a href="https://drive.google.com/..." target="_blank" rel="noopener noreferrer" class="cert-link">View Certificate ↗</a>
  </div>
</div>
```

### شهادة عبارة عن PDF:
بدّل أول سطر (لينك الـ `cert-thumb`) بالسطر ده:
```html
<a href="assets/certificates/My_Certificate.pdf" target="_blank" rel="noopener noreferrer" class="cert-thumb cert-thumb-pdf" data-pdf-src="assets/certificates/My_Certificate.pdf"><div class="cert-pdf-preview"><span class="cert-pdf-icon">📄</span><span class="cert-pdf-label">PDF Certificate</span></div><canvas class="cert-pdf-canvas" aria-hidden="true"></canvas></a>
```
`script.js` بيرسم **أول صفحة** من الـ PDF على الكارت لوحده — وبس لما الكارت يقرب من الشاشة، عشان الموقع يفضل سريع.

### شهادة لسه معندهاش ملف:
سيب سطر المعاينة بره — الكارت هيفضل شكله حلو (نص بس ومتوسّط). ضيفه بعدين لما يبقى معاك الملف.

**قواعد مهمة:**
- اسم الملف في `href`/`src` لازم يطابق الملف المرفوع **بالظبط، بالامتداد** وبحروف كابيتال/سمول زي ما هي. المسافات تتكتب `%20` (مثلاً `My%20File.pdf`).
- لو الصورة مش مرفوعة (أو الاسم غلط)، المعاينة بتختفي لوحدها والكارت بيرجع نص عادي — مفيش حاجة بتبوظ.
- مفيش تاريخ؟ امسح سطر `cert-date`. مفيش لينك؟ امسح سطر `<a ... class="cert-link">`.
- الملفات المطلوبة حاليًا في `assets/certificates/` (ارفعها بنفس الأسامي دي بالظبط):
  `CSWA_SolidWorks_CAD_Design_Associate.pdf` · `Professional_PCB_Design_Altium_Udemy.pdf` · `Arduino_Workshop_Completion_Amper.png` · `Electronics_Workshop_Completion_Amper.png` · `ESP32_Custom_PCB_Design_Workshop_IEEE.jpg` · `ICRA_2026_RoboRacer_League_Participation.pdf` · `Assiut_Motorsport_Kickdown_2025_Participation.pdf` · `Certificate of Qualification - 5th International RoboRacer Sim Racing.pdf` · `Robotics_32Hrs_Appreciation_EME_ITIDA.png` · `AI_for_Beginners_Almentor.jpg` · `Basics_of_AI_and_ChatGPT_Almentor.jpg` · `Machine_Learning_40Hrs_EME_ITIDA.jpg` · `AWS_Educate_Program_Completion.pdf` · `1st_Place_Better_Teacher_Competition.png` · `DECI_Level_Two_Nanodegree_Udacity_Oct_2023.jpg` · `DECI_Geeks_L2_Midyear_Competition_Microsoft_Feb_2023.pdf` · `AAKRUTI_2025_Innovation_Competition.pdf`
- خمس كروت "اختيارية": بتدور على `PCB_Design_Level_1_KiCAD_INNOVA` و`Technical_Training_Certificate` و`AI_Data_Scientist_Track_DEPI` و`ITIDA_Assiut_Summer_Training` و`Digital_Badge_McKinsey` — بامتداد **.png الأول وبعدين .jpg**. ارفع واحد منهم (png أو jpg) وهيظهر لوحده؛ ولو مرفعتش الكارت يفضل نص عادي.

---

## 3) إزاي تضيف خبرة عمل جديدة

**دور على:** `class="exp-list"` (موجود في صفحة About).

الكود الجاهز — الصقه في المكان المناسب حسب ترتيب التاريخ (الأحدث فوق):

```html
<div class="exp-item reveal">
  <div class="exp-meta"><div class="exp-date">Jan 2027 – Present</div><div class="exp-company">اسم الشركة</div></div>
  <div class="exp-content">
    <div class="exp-role">المسمى الوظيفي</div>
    <div class="exp-desc">وصف مختصر لمسؤولياتك وإنجازاتك في الدور ده.</div>
    <div class="exp-tags"><span class="tag">Skill 1</span><span class="tag">Skill 2</span></div>
  </div>
</div>
```

---

## 4) إزاي تضيف مهارة (Skill)

**دور على:** `skill-cat-title` — هتلاقي 4 تصنيفات (Hardware & PCB, Software & Tools, Technical Domains, Languages).

جوه أي تصنيف، ضيف سطر زي ده جنب الموجودين:
```html
<span class="skill-pill">اسم المهارة</span>
```

---

## 5) إزاي تضيف صورة لأداة أو خدمة

### على GitHub مباشرة (من غير برنامج على جهازك):
1. افتح الريبو بتاعك على github.com
2. ادخل فولدر `assets/tools/` (أو `assets/services/`)
3. دوس **Add file → Upload files**
4. اسحب الصورة، وخلي اسم الملف **مطابق بالظبط** (الحروف الكابيتال والسمول مهمة)

### الأسماء المطلوبة بالظبط:
**جوه `assets/tools/`:** `altium.png` · `kicad.png` · `easyeda.png` · `proteus.png` · `ltspice.png` · `multisim.png`

**جوه `assets/services/`:** `pcb-design.png` · `prototyping.png` · `assembly.png`

> الكود بيدور على الأسامي دي بالظبط، يعني مفيش تعديل مطلوب — الصورة بتظهر لوحدها بمجرد ما ترفعها. لحد وقتها بيظهر أيقونة بديلة صغيرة.

### لو عايز تضيف أداة/سيرفيس جديدة تمامًا (مش موجودة من الأساس):
دور على `class="tools-grid"` وانسخ كود أي `tool-item` موجود، وغيّر اسم الصورة والعنوان.

---

## 6) اللوجو الخاص بيك

اللوجو بيتستخدم في **أربع أماكن**: شاشة التحميل، وأعلى الصفحة جنب اسمك في النافبار، والفوتر، وأيقونة تبويب المتصفح (favicon).

**محتاج ملف واحد بس اسمه `logo` في فولدر `assets` — بأي امتداد تحبه:**

`assets/logo.png` · `logo.svg` · `logo.webp` · `logo.jpg` · `logo.jpeg` · `logo.gif` · `logo.avif` · `logo.ico`

`script.js` بيدور عليهم بالترتيب ده ويستخدم أول واحد يلاقيه، في كل الأماكن مرة واحدة. لو عايز تغيّر اللوجو بعدين: ارفع الملف الجديد (مثلاً `logo.svg`) **وامسح القديم** (وإلا أي امتداد أسبق في القائمة هو اللي هيكسب).

حاجات مفيدة:
- أحسن حاجة صورة مربعة (1:1) بـ **خلفية شفافة**. اللوجو الدهبي PNG الشفاف هو الافتراضي.
- في الثيم الفاتح بيتغمّق لوجو النافبار والفوتر تلقائي عشان يبان على الخلفية الفاتحة.
- لو مفيش أي ملف `logo.*`، الأماكن الأربعة بتفضل مخفية (من غير أيقونة صورة مكسورة).
- المتصفحات بتحفظ أيقونة التبويب بقوة — بعد تغيير اللوجو اعمل hard refresh، وممكن تاخد وقت تتحدث في التبويبات التانية.

---

## 7) شاشة التحميل (اللودر)

الافتتاحية (خطوط دهبية بتتجمع ← اللوجو بيترسم ← اسمك) شغالة كده:

| الزيارة | اللي بيحصل |
|---|---|
| **أول زيارة** في جلسة المتصفح | الأنيميشن كامل، حوالي **7 ثواني** |
| **ريفرش / رجوع** في نفس الجلسة | اللوجو والاسم بيظهروا **فورًا** (من غير أنيميشن) واللودر بيمشي بعد **ثانيتين** |

"الجلسة" يعني نفس التبويب/النافذة لحد ما تتقفل — زيارة جديدة بعد كده بتشوف الافتتاحية كاملة تاني.

**فين تغيّر التوقيت:**
- **اللودر يفضل قد إيه** ← `script.js`، دور على `// ── LOADER ──`:
  `7000` = أول زيارة (بالمللي ثانية)، `2000` = الزيارة المتكررة.
- **كل جزء بيظهر امتى (بالثواني)** ← `style.css`، دور على `.loader-badge {` والسطور اللي تحتها:
  - اللوجو: `badgeReveal 1.9s ... 0.9s` ← بياخد 1.9 ثانية وبيبدأ عند 0.9
  - اسمك (`.loader-name`): `loaderReveal 0.9s ease 2.2s` ← **آخر رقم هو وقت الظهور**
  - السطر اللي تحته (`.loader-sub`): `... 2.7s`
  - شريط التحميل (`.loader-bar-fill`): `loaderBar 3.6s ease 3s` ← بياخد 3.6 ثانية وبيبدأ عند 3
- لو طوّلت الأنيميشن، زوّد الـ `7000` في `script.js` كمان، عشان اللودر مايقفلش قبل ما الأنيميشن يخلص.
- **شكل الزيارة المتكررة** ← `style.css`، دور على `intro-seen`. حاليًا بيظهر اللوجو والاسم بس؛ امسح `.intro-seen #loader .loader-sub,` من القاعدة دي لو عايز سطر "Electrical & Electronics Engineer" يظهر معاهم.

---

## 8) تصغير الصور لسرعة الموقع

الصور الكبيرة هي السبب رقم 1 اللي ممكن يبطّأ الموقع (خصوصًا على الموبايل). قبل ما ترفع الصور والشهادات واللوجو، صغّرها:

| الصورة | بتتعرض بحجم حوالي | أقصى حجم موصى بيه |
|---|---|---|
| صورتك (`seif-photo.png`) | 380×480 | ~1000 بكسل على أطول ضلع |
| صور الشهادات | ~350 بكسل عرض | ~1400 بكسل على أطول ضلع |
| لوجوهات الأدوات / صور الخدمات | ~112 بكسل | ~400 بكسل |
| اللوجو | لحد ~200 بكسل | ~800 بكسل |

استهدف **أقل من ~300 كيلوبايت** للصورة، و**أقل من ~1–2 ميجا** للـ PDF.

### الطريقة السهلة: السكريبت المرفق
`optimize_images.py` بيصغّر كل حاجة **من غير ما يغيّر أسامي الملفات أو الامتدادات**:
1. نزّل Python 3 ونفّذ مرة واحدة: `pip install pillow`
2. حط `optimize_images.py` جنب فولدر `assets`.
3. شغّله: `python optimize_images.py`
4. هيكتب نسخ مصغّرة في فولدر `assets_optimized/` (نفس الأسامي ونفس الفولدرات) ويطبعلك التوفير في كل ملف. الملفات الأصلية مش بتتلمس.
5. راجع كام واحدة، وبعدين ارفع محتويات `assets_optimized/` على GitHub مكان الأصلية.

**مش** بيصغّر الـ PDF — الـ PDF الكبير ضغطه بأداة مجانية (زي iLovePDF "Compress PDF") وسيب نفس اسم الملف.

### من غير Python:
استخدم [squoosh.app](https://squoosh.app) أو [tinypng.com](https://tinypng.com): صغّر الأبعاد واضغط و**نزّل بنفس الصيغة** (PNG يفضل PNG وJPG يفضل JPG) وخلي اسم الملف زي ما هو بالظبط.

---

## 9) إزاي تحدّث الـ CV

1. سمّي ملف الـ PDF بالظبط: `Seif_Eldaby_CV.pdf`
2. ارفعه في فولدر `assets/` على GitHub (هيسألك "replace this file?" لو فيه نسخة أقدم — دوس Yes)
3. مفيش أي تعديل تاني مطلوب — اللينك في صفحة About بيشاور دايمًا على الاسم ده بالظبط.

---

## 10) إزاي تغيّر الدومين وصورة المشاركة

### الدومين
لما يبقى عندك اللينك النهائي للموقع (رابط GitHub Pages أو دومين مخصص)، **دور في `index.html` على `seifeldaby.github.io`** — هتلاقيه في **7 أماكن** كلهم لازم يطابقوا لينكك الحقيقي:

| المكان | ليه مهم |
|---|---|
| `og:url` | لينك المعاينة لما حد يشارك موقعك |
| `og:image` | صورة المعاينة على السوشيال ميديا |
| `twitter:image` | نفس الكلام لتويتر/X |
| `"url"` جوه JSON-LD | بيانات منظمة لجوجل |
| `"image"` جوه JSON-LD | نفس الكلام |
| `rel="canonical"` | بيقول لجوجل إن ده اللينك "الرسمي" |

أسهل طريقة: "Find & Replace All" وبدّل `seifeldaby.github.io` بدومينك الحقيقي في كل الأماكن مرة واحدة.

> ⚠️ لو موقعك على **فولدر فرعي** (مثلاً `seifeldaby.github.io/portfolio/`)، حط الفولدر في الاستبدال (`seifeldaby.github.io/portfolio`)، وإلا لينكات المشاركة هتشاور على صفحة غلط.

### صورة المشاركة (اختياري)
لما حد يشارك لينكك على واتساب / LinkedIn / تويتر، كارت المعاينة بيعرض الـ `og:image`. دلوقتي هي صورتك الشخصية. صورة **1200×630** بالعرض فيها اللوجو واسمك شكلها أحلى:
1. ارفعها باسم `assets/og-image.png`.
2. في `index.html` بدّل `assets/seif-photo.png` بـ `assets/og-image.png` في التلات أماكن: سطر `og:image`، وسطر `twitter:image`، و`"image":` جوه بلوك JSON-LD.
3. المنصات بتحفظ المعاينات — عشان تحدّث واحدة استخدم [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) أو Sharing Debugger بتاع فيسبوك.

---

## 11) الفورم (Formspree)

الفورم متوصّل بالفعل على: `https://formspree.io/f/mbgllepa`

**عشان تشوف الرسائل اللي وصلت:**
1. ادخل [formspree.io](https://formspree.io) وسجّل دخول
2. افتح الفورم (Portfolio)
3. تاب **Submissions** — فيه كل رسالة اتبعتت من الموقع، حتى لو الإيميل نفسه اتأخر أو ماوصلش

**لو عايز تغيّر لفورم/حساب تاني:**
في `script.js` دور على `FORMSPREE_ID` وغيّر القيمة:
```js
const FORMSPREE_ID = 'mbgllepa'; // استبدلها بالـ ID الجديد
```

---

## 12) إزاي تضيف سكشن فرعي جديد

(زي "PCB & Hardware Design" في صفحة Portfolio، أو الأربع سكاشن في صفحة Achievements)

الكود الجاهز:
```html
<div class="subsection reveal">
  <div class="subsection-header">
    <span class="subsection-num">04</span>
    <span class="subsection-title">اسم السكشن الجديد</span>
  </div>
  <div class="projects-grid">
    <!-- كروت المشاريع هنا -->
  </div>
</div>
```
(بدّل `projects-grid` بـ `certs-grid` لو السكشن ده للشهادات)

---

## 13) إزاي تشيل/تعطّل مشروع أو شهادة

**أسهل طريقة من غير مسح نهائي:** لف الكارت بـ `<!--` و `-->` وهيختفي من غير ما تمسح الكود:
```html
<!--
<div class="project-card ...">...</div>
-->
```
لو عايز تمسحه نهائيًا، امسح الكارت كله من أول `<div class="project-card` (أو `cert-card`) لحد `</div>` اللي بتقفله. كارت الشهادة جواه `<div>`ات تانية، فتأكد إنك بتمسح لحد `</div>` اللي بتقفل الكارت نفسه.

---

## 14) فهم الثيم (Dark/Light)

- أول زيارة، الثيم بيتحدد **تلقائيًا** حسب إعدادات جهاز الزائر (Dark أو Light).
- لو الزائر غيّر الثيم بإيده، اختياره بيتحفظ (في متصفحه هو بس) ويفضل في الزيارات الجاية.
- لو عايز تغيّر الألوان نفسها، افتح `style.css` ودور على `--gold:` و`--dark:` في أول الملف (جوه `:root` للداكن و`body.light` للفاتح).

---

## 15) فهم الـ Deep Linking

كل صفحة ليها لينك مباشر:
```
yoursite.com/#home
yoursite.com/#about
yoursite.com/#services
yoursite.com/#achievements
yoursite.com/#portfolio
yoursite.com/#contact
```
تقدر تبعت أي لينك منهم لحد وهيفتحله الصفحة دي مباشرة. وكمان لو عملت ريفرش، الزائر بيفضل في نفس الصفحة اللي كان فيها.

---

## 16) إزاي ترفع أي تعديل على GitHub

1. عدّل الملف/الملفات على جهازك، أو على github.com مباشرة (افتح الملف ← ✏️ Edit ← عدّل ← **Commit changes**).
2. ارفع **كل ملف غيّرته** (`index.html` و`style.css` و`script.js` وأي صور جديدة في `assets/`).
3. **لو غيّرت `style.css` أو `script.js`، زوّد رقم النسخة** عشان متصفحات الزوار ما تفضلش تعرض النسخة القديمة. في `index.html` دور على `?v=` — هتلاقيه في مكانين:
   ```html
   <link rel="stylesheet" href="style.css?v=20261031">
   <script src="script.js?v=20261031"></script>
   ```
   غيّر الرقم في الاتنين (أي رقم جديد شغال — وعادة حلوة تحط تاريخ النهاردة، مثلاً `20261120`). لو غيّرت `index.html` بس مش محتاج ده.
4. GitHub Pages عادةً بيحدّث الموقع خلال دقيقة أو اتنين.

---

## 17) مشاكل شائعة وحلولها

| المشكلة | الحل |
|---|---|
| عدّلت الملف بس التغيير مش ظاهر على الموقع | استنى دقيقتين، وبعدين hard refresh (Ctrl+Shift+R / Cmd+Shift+R). ولو عدّلت `style.css` أو `script.js` اتأكد إنك زوّدت رقم `?v=` (قسم 16). |
| الموقع ظاهر من غير أي تصميم | `style.css` متحمّلش، أو مش في نفس فولدر `index.html`. |
| اللوجو مش ظاهر في أي مكان | مفيش ملف اسمه `logo` في `assets/` (png / svg / webp / jpg / jpeg / gif / avif / ico)، أو الحروف مختلفة (`Logo.png` ≠ `logo.png`). |
| أيقونة التبويب (favicon) ما اتغيرتش | المتصفحات بتحفظها بقوة — اعمل hard refresh أو اقفل التبويب وافتحه تاني. |
| معاينة شهادة مش ظاهرة | اسم الملف لازم يطابق اللي في `src`/`href` بتاع الكارت بالظبط، بالامتداد والحروف (شوف قسم 2). من غير الملف الكارت بيرجع نص بس، وده سلوك صح. |
| شهادة PDF بتظهر "PDF Certificate" بدل الصفحة الحقيقية | الـ PDF مش مرفوع / الاسم غلط، أو إنت فاتح `index.html` من جهازك مباشرة — معاينة الـ PDF بتشتغل على الموقع الحقيقي (أو سيرفر محلي) بس، مش من مسار `file://`. |
| صورة أداة/خدمة مش ظاهرة | اتأكد إن اسم الملف **مطابق بالظبط** (حساس للحروف) وإنه في الفولدر الصح |
| اللودر بيشتغل كامل كل مرة | بيشتغل كامل في أول زيارة في كل جلسة متصفح بس. لو بتجرب في نافذة خاصة جديدة كل مرة، هتبقى "أول زيارة" كل مرة. |
| حاجة شكلها غلط على الموبايل بس | قواعد الموبايل في **آخر `style.css`** (دور على `PHONE FIXES`). |
| الفورم مش بيبعت | شوف Formspree Dashboard ← Submissions — لو الرسالة موجودة هناك، يبقى الفورم شغال وده تأخير في وصول الإيميل بس (شوف Spam) |
| لينك بيفتح صفحة فاضية | لو لينك Google Drive، اتأكد إن المشاركة "Anyone with the link can view" |
| زرار "Coming Soon" مش بيعمل حاجة | ده طبيعي لحد ما تحط لينك حقيقي — دور على اسم المشروع وعدّل الـ `href` |

---

## 18) Checklist قبل ما تنشر تعديل

- [ ] كل `<div>` ليه `</div>` بيقفله (VS Code بيظلّل لو فيه حاجة ناقصة)
- [ ] أسامي الصور مطابقة بالظبط للي اترفع (بالامتداد والحروف)
- [ ] الصور الكبيرة اتصغّرت الأول (قسم 8)
- [ ] كل اللينكات الجديدة اتجربت وبتفتح صح
- [ ] لو غيّرت `style.css` / `script.js`: زوّدت `?v=` في `index.html`، ورفعت كل الملفات المتغيرة مع بعض
- [ ] لو الدومين اتغيّر، اتحدّث في الـ 7 أماكن
- [ ] عملت hard refresh وشفت النتيجة — على الكمبيوتر **وعلى الموبايل** — قبل ما تشارك الموقع مع أي حد
