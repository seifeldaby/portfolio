# Portfolio Maintenance Guide — Seif Eldaby

*This file is available in two languages: [English](#english) first, then [العربية](#عربي) below.*

---

<a name="english"></a>
# 🇬🇧 English

A complete reference for editing and extending your portfolio site — no need to understand the whole codebase. Every section below has: **where to look**, **the code to use**, and **a ready-to-paste example**.

> 💡 General tip: open `index.html` in any code editor (VS Code is free and great), and use Ctrl+F (or Cmd+F) to search for the keyword mentioned under each section.

## 📁 Table of Contents

1. [Project Structure](#project-structure)
2. [Adding a New Project](#1-adding-a-new-project)
3. [Adding a New Certification](#2-adding-a-new-certification)
4. [Adding a New Work Experience](#3-adding-a-new-work-experience)
5. [Adding a New Skill](#4-adding-a-new-skill)
6. [Adding a Tool/Service Image](#5-adding-a-toolservice-image)
7. [Updating Your CV](#6-updating-your-cv)
8. [Changing the Live Domain](#7-changing-the-live-domain)
9. [The Contact Form (Formspree)](#8-the-contact-form-formspree)
10. [Adding a New Subsection](#9-adding-a-new-subsection)
11. [Removing/Disabling a Project or Certification](#10-removingdisabling-a-project-or-certification)
12. [How the Theme Works (Dark/Light)](#11-how-the-theme-works-darklight)
13. [How Deep Linking Works](#12-how-deep-linking-works)
14. [Publishing Changes to GitHub](#13-publishing-changes-to-github)
15. [Common Issues & Fixes](#14-common-issues--fixes)
16. [Pre-Publish Checklist](#15-pre-publish-checklist)

---

## Project Structure

The entire site is **one file**: `index.html`. It contains the HTML, CSS, and JavaScript together — no separate files except images and your CV. That means every edit happens in one place.

The site runs as a **Single Page Application (SPA)** — every page (Home, About, Services, Achievements, Portfolio, Contact) lives in the same file, and JavaScript shows/hides the right one (there isn't a separate real page per URL).

Each page block looks like this:
```html
<div class="page" id="page-about">
  ...content...
</div>
```
To find a specific page, search (Ctrl+F) for `id="page-` + the page name (e.g. `id="page-portfolio"`).

Required folder structure next to `index.html`:
```
/
├── index.html
└── assets/
    ├── seif-photo.png
    ├── seif-photo-light.png
    ├── Seif_Eldaby_CV.pdf
    ├── tools/
    │   ├── altium.png
    │   ├── kicad.png
    │   ├── easyeda.png
    │   ├── proteus.png
    │   ├── ltspice.png
    │   └── multisim.png
    └── services/
        ├── pcb-design.png
        ├── prototyping.png
        └── assembly.png
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

Ready template:

```html
<div class="cert-card reveal reveal-delay-1">
  <div class="cert-icon">🏅</div>
  <div class="cert-name">Certificate Name</div>
  <div class="cert-issuer">Issuing Organization</div>
  <div class="cert-date">Date (optional)</div>
  <a href="https://drive.google.com/..." target="_blank" rel="noopener noreferrer" class="cert-link">View Certificate ↗</a>
</div>
```

- No date? Just delete the `cert-date` line entirely.
- No link yet? Delete the `<a ...>` line entirely — the card will still look fine without it.

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

> The code already looks for these exact filenames, so no `index.html` edits are needed — the image appears automatically once uploaded.

### Adding a brand-new tool/service (not in the list above):
Search for `class="tools-grid"` and copy the template of any existing `tool-item`, then change the image name and label.

---

## 6) Updating Your CV

1. Name your PDF exactly: `Seif_Eldaby_CV.pdf`
2. Upload it to the `assets/` folder on GitHub (it will ask "replace this file?" if an older version exists — click Yes)
3. No other changes needed — the About page link always points to this exact filename.

---

## 7) Changing the Live Domain

Once you have a final URL for the site (GitHub Pages URL or a custom domain), **search for `seifeldaby.github.io`** — you'll find it in **7 places** that all need to be updated to your new link:

| Location | Why it matters |
|---|---|
| `og:url` | The preview link when someone shares your site |
| `og:image` (×1) | Social-media preview image |
| `twitter:image` | Same, for Twitter/X |
| `"url"` inside JSON-LD | Structured data for Google |
| `"image"` inside JSON-LD | Same |
| `rel="canonical"` | Tells Google which link is the "official" one |

Easiest approach: open the file in any editor that supports "Find & Replace All", search for `seifeldaby.github.io`, and replace it with your real domain everywhere at once.

---

## 8) The Contact Form (Formspree)

The form is already connected to: `https://formspree.io/f/mbgllepa`

**To see messages that came in:**
1. Go to [formspree.io](https://formspree.io) and log in
2. Open your form (Portfolio)
3. **Submissions** tab — shows every message sent from the site, even if the email itself was delayed or didn't arrive

**To switch to a different form/account:**
Search for `FORMSPREE_ID` and change the value:
```js
const FORMSPREE_ID = 'mbgllepa'; // replace with the new ID
```

---

## 9) Adding a New Subsection

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

## 10) Removing/Disabling a Project or Certification

**Easiest option without permanently deleting:** wrap the card in `<!--` and `-->` to hide it without removing the code:
```html
<!--
<div class="project-card ...">...</div>
-->
```
To delete it permanently, remove the whole line from `<div class="project-card` to its closing `</div>`.

---

## 11) How the Theme Works (Dark/Light)

- On first visit, the theme is set **automatically** based on the visitor's device settings (Dark or Light).
- If a visitor manually toggles the theme, their choice is saved (in their own browser only, not on your end) and persists on future visits.
- To change the colors themselves, search for `--gold:` and `--dark:` near the top of the file (inside `:root` and `body.light`).

---

## 12) How Deep Linking Works

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

## 13) Publishing Changes to GitHub

1. Edit `index.html` (or upload a new image) on your computer or directly on GitHub
2. If using github.com:
   - Open the file → click the pencil icon (✏️ Edit) top-right
   - Make your edit
   - Scroll down, write a short commit message (e.g. "Add new PCB project")
   - Click **Commit changes**
3. GitHub Pages usually updates the live site automatically within a minute or two.

---

## 14) Common Issues & Fixes

| Issue | Fix |
|---|---|
| Edited the file but the change isn't showing live | Wait a couple of minutes, then Hard Refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac). The site also auto-refreshes itself if it's been left open and idle for 5+ minutes. |
| A tool/service image isn't showing | Make sure the filename matches **exactly** (case-sensitive) and is in the right folder |
| The form isn't sending | Check Formspree Dashboard → Submissions — if the message is there, the form works and it's just an email delivery delay (check Spam) |
| A link opens a blank page | If it's a Google Drive link, make sure sharing is set to "Anyone with the link can view" |
| A "Coming Soon" button doesn't do anything when clicked | Expected until you add a real link — search for the project name and update its `href` |

---

## 15) Pre-Publish Checklist

- [ ] Every `<div>` has a matching closing `</div>` (VS Code will highlight mismatches if unsure)
- [ ] Image filenames match exactly what was uploaded
- [ ] All new links were tested and open correctly
- [ ] If the domain changed, it was updated in all 7 places
- [ ] Did a Hard Refresh and checked the result before sharing the site with anyone

---
---

<a name="عربي"></a>
# 🇪🇬 العربية

دليل كامل ليك، بيشرح إزاي تعدّل/تضيف أي حاجة في موقعك من غير ما تحتاج تفهم كل الكود من الأول. كل قسم فيه: **إيه المكان**، **الكود الجاهز**، و**مثال كامل تقدر تنسخه**.

> 💡 نصيحة عامة: قبل أي تعديل، افتح `index.html` في أي محرر نصوص (VS Code أحسن حاجة، مجاني)، ودوس Ctrl+F (أو Cmd+F) ودور بالكلمة المفتاحية المذكورة تحت كل قسم.

## 📁 الفهرس

1. [هيكل المشروع](#هيكل-المشروع)
2. [إزاي تضيف مشروع جديد](#1-إزاي-تضيف-مشروع-جديد)
3. [إزاي تضيف شهادة جديدة](#2-إزاي-تضيف-شهادة-جديدة)
4. [إزاي تضيف خبرة عمل جديدة](#3-إزاي-تضيف-خبرة-عمل-جديدة)
5. [إزاي تضيف مهارة (Skill)](#4-إزاي-تضيف-مهارة-skill)
6. [إزاي تضيف صورة لأداة أو خدمة](#5-إزاي-تضيف-صورة-لأداة-أو-خدمة)
7. [إزاي تحدّث الـ CV](#6-إزاي-تحدّث-الـ-cv)
8. [إزاي تغيّر الدومين الحقيقي](#7-إزاي-تغيّر-الدومين-الحقيقي)
9. [الفورم (Formspree) — إزاي تتأكد إنه شغال](#8-الفورم-formspree)
10. [إزاي تضيف سكشن فرعي جديد (زي PCB & Hardware)](#9-إزاي-تضيف-سكشن-فرعي-جديد)
11. [إزاي تشيل/تعطّل مشروع أو شهادة](#10-إزاي-تشيلتعطّل-مشروع-أو-شهادة)
12. [فهم الثيم (Dark/Light)](#11-فهم-الثيم-darklight)
13. [فهم الـ Deep Linking (الروابط المباشرة)](#12-فهم-الـ-deep-linking)
14. [إزاي ترفع أي تعديل على GitHub](#13-إزاي-ترفع-أي-تعديل-على-github)
15. [مشاكل شائعة وحلولها](#14-مشاكل-شائعة-وحلولها)
16. [Checklist قبل ما تنشر تعديل](#15-checklist-قبل-ما-تنشر-تعديل)

---

## هيكل المشروع

الموقع كله **ملف واحد** اسمه `index.html` — فيه الـ HTML والـ CSS والـ JavaScript مع بعض (مفيش ملفات تانية غير الصور والـ CV). ده معناه إن أي تعديل بتعمله في مكان واحد بس.

الموقع شغال كـ **Single Page Application (SPA)** — يعني كل الصفحات (Home, About, Services, Achievements, Portfolio, Contact) موجودة في نفس الملف، وجافاسكريبت هو اللي بيظهر ويخفي الصفحة المطلوبة (مش رابط منفصل فعليًا لكل صفحة).

كل صفحة في الملف مكتوبة كده:
```html
<div class="page" id="page-about">
  ...المحتوى...
</div>
```
يعني لو عايز تلاقي صفحة معينة، دور بـ Ctrl+F على `id="page-` + اسم الصفحة (مثلاً `id="page-portfolio"`).

الفولدرات المطلوبة جنب `index.html`:
```
/
├── index.html
└── assets/
    ├── seif-photo.png
    ├── seif-photo-light.png
    ├── Seif_Eldaby_CV.pdf
    ├── tools/
    │   ├── altium.png
    │   ├── kicad.png
    │   ├── easyeda.png
    │   ├── proteus.png
    │   ├── ltspice.png
    │   └── multisim.png
    └── services/
        ├── pcb-design.png
        ├── prototyping.png
        └── assembly.png
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
| `⚡` | إيموجي يمثل المشروع |
| اسم ووصف المشروع | نص عادي |
| `href="..."` | لينك GitHub أو Google Drive |
| نص الزرار | اكتب `View on GitHub ↗` لو GitHub، أو `View Project Files ↗` لو Google Drive |

**لو المشروع لسه من غير لينك جاهز:**
```html
<a href="#" class="project-link">GitHub — Coming Soon</a>
```
(احذف `target="_blank" rel="noopener noreferrer"` في الحالة دي لأنه مش هيفتح حاجة أصلاً)

---

## 2) إزاي تضيف شهادة جديدة

**دور بـ Ctrl+F على:** اسم أقرب سكشن ليها (`PCB & Hardware`, `Robotics & Autonomous Systems`, `AI & Data Science`, أو `Professional Development & Competitions`).

القالب الجاهز:

```html
<div class="cert-card reveal reveal-delay-1">
  <div class="cert-icon">🏅</div>
  <div class="cert-name">اسم الشهادة هنا</div>
  <div class="cert-issuer">الجهة المانحة</div>
  <div class="cert-date">التاريخ (اختياري)</div>
  <a href="https://drive.google.com/..." target="_blank" rel="noopener noreferrer" class="cert-link">View Certificate ↗</a>
</div>
```

- لو مفيش تاريخ، احذف سطر `cert-date` بالكامل.
- لو مفيش لينك لسه، احذف سطر `<a ...>` بالكامل — الكارت هيبان عادي من غيره.

---

## 3) إزاي تضيف خبرة عمل جديدة

**دور بـ Ctrl+F على:** `class="exp-list"` (موجودة في صفحة About).

القالب الجاهز — الصقه في المكان الصح حسب ترتيب التاريخ (الأحدث فوق):

```html
<div class="exp-item reveal">
  <div class="exp-meta"><div class="exp-date">Jan 2027 – Present</div><div class="exp-company">اسم الشركة</div></div>
  <div class="exp-content">
    <div class="exp-role">المسمى الوظيفي</div>
    <div class="exp-desc">وصف مختصر لمسؤولياتك وإنجازاتك في الدور ده.</div>
    <div class="exp-tags"><span class="tag">مهارة 1</span><span class="tag">مهارة 2</span></div>
  </div>
</div>
```

---

## 4) إزاي تضيف مهارة (Skill)

**دور بـ Ctrl+F على:** `skill-cat-title` — هتلاقي 4 فئات (Hardware & PCB, Software & Tools, Technical Domains, Languages).

جوه أي فئة، ضيف سطر زي ده جنب الموجودين:
```html
<span class="skill-pill">اسم المهارة</span>
```

---

## 5) إزاي تضيف صورة لأداة أو خدمة

### على GitHub مباشرة (من غير برنامج على جهازك):
1. افتح الريبو بتاعك على github.com
2. روح جوه فولدر `assets/tools/` (أو `assets/services/`)
3. دوس **Add file → Upload files**
4. اسحب الصورة وارميها، واتأكد إن اسمها **مطابق تمامًا** للاسم المطلوب (حساس لحالة الأحرف)

### الأسماء المطلوبة بالظبط:
**جوه `assets/tools/`:** `altium.png` · `kicad.png` · `easyeda.png` · `proteus.png` · `ltspice.png` · `multisim.png`

**جوه `assets/services/`:** `pcb-design.png` · `prototyping.png` · `assembly.png`

> الكود أصلاً بيدور على الأسماء دي، فمش محتاج تعدّل في `index.html` خالص — الصورة هتظهر أوتوماتيك بمجرد الرفع.

### لو عايز تضيف أداة/سيرفيس جديدة تمامًا (مش موجودة من الأساس):
دور على `class="tools-grid"` وانسخ نفس القالب بتاع أي `tool-item` موجود، غيّر اسم الصورة والاسم النصي.

---

## 6) إزاي تحدّث الـ CV

1. سمّي ملف الـ PDF بتاعك بالظبط: `Seif_Eldaby_CV.pdf`
2. ارفعه في فولدر `assets/` على GitHub (هيسألك "replace this file?" لو فيه نسخة قديمة — دوس Yes)
3. مفيش أي تعديل تاني مطلوب — اللينك في صفحة About بيشاور على نفس الاسم ده دايمًا.

---

## 7) إزاي تغيّر الدومين الحقيقي

لما يبقى عندك دومين نهائي للموقع (GitHub Pages URL أو دومين مخصص)، **دور بـ Ctrl+F على `seifeldaby.github.io`** — هتلاقيها في **7 أماكن** لازم تتغيّر كلها بنفس اللينك الجديد:

| المكان | ليه مهم |
|---|---|
| `og:url` | لينك المعاينة لما حد يشارك موقعك |
| `og:image` (×1) | صورة المعاينة على السوشيال ميديا |
| `twitter:image` | نفس الحاجة بس لتويتر |
| `"url"` جوه JSON-LD | بيانات جوجل الهيكلية |
| `"image"` جوه JSON-LD | نفس الحاجة |
| `rel="canonical"` | يقول لجوجل إيه هو اللينك "الرسمي" |

أسهل طريقة: افتح الملف في أي محرر بيدعم "Find & Replace All"، ابحث عن `seifeldaby.github.io` واستبدلها بالدومين بتاعك في كل الأماكن مرة واحدة.

---

## 8) الفورم (Formspree)

الفورم شغال أصلاً على: `https://formspree.io/f/mbgllepa`

**عشان تشوف الرسايل اللي وصلتك:**
1. روح [formspree.io](https://formspree.io) وسجّل دخول
2. افتح الفورم بتاعك (Portfolio)
3. تبويب **Submissions** — هتلاقي كل رسالة اتبعتت من الموقع، حتى لو تأخرت أو ماوصلتش بالإيميل

**لو عايز تغيّر الفورم (تعمل فورم جديد أو حساب تاني):**
دور بـ Ctrl+F على `FORMSPREE_ID` وغيّر القيمة:
```js
const FORMSPREE_ID = 'mbgllepa'; // غيّرها بالـ ID الجديد
```

---

## 9) إزاي تضيف سكشن فرعي جديد

(زي "PCB & Hardware Design" في صفحة Portfolio، أو الأقسام الأربعة في صفحة Achievements)

القالب الجاهز:
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
(استبدل `projects-grid` بـ `certs-grid` لو السكشن للشهادات)

---

## 10) إزاي تشيل/تعطّل مشروع أو شهادة

**أسهل حل بدون حذف نهائي:** لف الكارت بـ `<!--` و `-->` عشان يختفي من غير ما تمسح الكود:
```html
<!--
<div class="project-card ...">...</div>
-->
```
لو عايز تشيله نهائي، امسح السطر بالكامل من `<div class="project-card` لحد `</div>` بتاعته.

---

## 11) فهم الثيم (Dark/Light)

- أول ما حد يفتح الموقع، الثيم بيتحدد **أوتوماتيك** حسب إعدادات جهاز الزائر (Dark أو Light).
- لو الزائر دوس بنفسه على زرار الثيم، اختياره بيتحفظ (في متصفحه بس، مش عندك) ويفضل زي ما هو في زياراته الجاية.
- عشان تغيّر الألوان نفسها، دور بـ Ctrl+F على `--gold:` و `--dark:` في أول الملف (جوه `:root` و`body.light`).

---

## 12) فهم الـ Deep Linking

كل صفحة ليها رابط مباشر:
```
yoursite.com/#home
yoursite.com/#about
yoursite.com/#services
yoursite.com/#achievements
yoursite.com/#portfolio
yoursite.com/#contact
```
تقدر تبعت أي لينك من دول لحد، وهيفتحله الصفحة دي على طول. برضو لو الزائر عمل Refresh، هيفضل واقف في نفس الصفحة.

---

## 13) إزاي ترفع أي تعديل على GitHub

1. عدّل `index.html` (أو ارفع صورة جديدة) على جهازك أو مباشرة من GitHub
2. لو بتستخدم الموقع (github.com):
   - افتح الملف → دوس على أيقونة القلم (✏️ Edit) فوق يمين
   - اعمل التعديل
   - انزل تحت، اكتب رسالة قصيرة توصف التعديل (مثلاً "Add new PCB project")
   - دوس **Commit changes**
3. GitHub Pages بيحدّث الموقع تلقائيًا خلال دقيقة لدقيقتين عادةً.

---

## 14) مشاكل شائعة وحلولها

| المشكلة | الحل |
|---|---|
| عدّلت الملف بس التعديل مش ظاهر على الموقع | استنى دقيقتين، وبعدين اعمل Hard Refresh (Ctrl+Shift+R على ويندوز، Cmd+Shift+R على ماك). الموقع أصلاً فيه كود بيعمل Refresh تلقائي لو الصفحة فضلت مفتوحة 5 دقايق من غير استخدام. |
| صورة مش ظاهرة (أداة أو سيرفيس) | تأكد إن اسم الملف مطابق **تمامًا** (حروف كبيرة/صغيرة بتفرق) وإنه في الفولدر الصح |
| الفورم مش بيبعت | افتح Formspree Dashboard → Submissions، لو الرسالة موجودة هناك فالفورم شغال، والمشكلة في وصول الإيميل بس (شيك الـ Spam) |
| لينك بيفتح صفحة فاضية | لو اللينك Google Drive، تأكد إن إعدادات المشاركة "Anyone with the link can view" |
| زرار "Coming Soon" بيتحط عليه بس مفيش حاجة بتحصل | ده طبيعي لحد ما تحط لينك حقيقي — دور بـ Ctrl+F على اسم المشروع وحدّث الـ `href` |

---

## 15) Checklist قبل ما تنشر تعديل

- [ ] اتأكدت إن كل `<div>` مقفول بـ `</div>` (لو مش متأكد، افتح الملف في VS Code هيلوّنلك أي خطأ)
- [ ] اتأكدت إن أسماء الصور مطابقة تمامًا لأسماء الملفات المرفوعة
- [ ] جربت اللينكات الجديدة كلها بنفسك (تأكد إنها بتفتح صح)
- [ ] لو غيّرت الدومين، اتأكدت إنه اتغيّر في الـ 7 أماكن كلهم
- [ ] عملت Hard Refresh وشوفت النتيجة قبل ما تقول لحد يشوف الموقع

---

*Guide last aligned with the code as of the current site version. If something here doesn't match the code anymore, let me know and I'll update it. / آخر تحديث للدليل ده متزامن مع الكود الحالي — لو حسيت إن حاجة هنا بقت مش مطابقة، قولّي وأنا أحدّثه.*
