# 📖 Seif Eldaby Portfolio — Guide

## 📁 Structure
```
seif-portfolio/
├── index.html          ← الموقع كامل
├── assets/
│   ├── seif-photo.png          ← صورتك (Dark Mode)
│   ├── seif-photo-light.png    ← صورتك (Light Mode)
│   └── Seif_Eldaby_CV.pdf      ← الـ CV
└── GUIDE.md            ← الملف ده
```

---

## 🎨 الألوان

ابحث في الكود عن `:root {` وهتلاقي:

```css
:root {
  --gold: #C9A84C;      ← اللون الذهبي الرئيسي
  --dark: #0D0D0D;      ← الخلفية الداكنة
  --dark2: #141414;     ← خلفية Sections
  --dark3: #1C1C1C;     ← الـ Cards
  --text: #F0EDE6;      ← النص الرئيسي
  --text-muted: #8A8680; ← النص الثانوي
}
```

**Light Mode:**
```css
body.light {
  --gold: #8B6914;      ← ذهبي أغمق للأبيض
  --dark: #F5F2EB;      ← خلفية فاتحة
  --text: #1A1A1A;      ← نص داكن
}
```

**رقم الـ Section (01, 02...):**
ابحث عن: `color: rgba(201,168,76,0.12)`
غير `0.12` لأي رقم من 0 لـ 1 — كلما زاد كلما وضح

---

## 📄 الصفحات

الموقع فيه 5 صفحات — كل صفحة ليها `id` في الكود:

| الصفحة | ابحث عن |
|---|---|
| Home | `id="page-home"` |
| About | `id="page-about"` |
| Achievements | `id="page-achievements"` |
| Portfolio | `id="page-portfolio"` |
| Contact | `id="page-contact"` |

---

## ➕ إزاي تضيف حاجات

### Project جديد
ابحث عن `id="page-portfolio"` ثم `class="projects-grid"`
Copy أي `project-card` وعدّل فيها:

```html
<div class="project-card reveal reveal-delay-1" data-num="07">
  <div class="project-icon">🔧</div>
  <div class="project-name">اسم المشروع</div>
  <div class="project-desc">وصف المشروع هنا.</div>
  <a href="رابط GitHub" target="_blank" class="project-link">GitHub ↗</a>
</div>
```

---

### Experience جديدة
ابحث عن `class="exp-list"`
Copy أي `exp-item` وعدّل فيها:

```html
<div class="exp-item reveal">
  <div class="exp-meta">
    <div class="exp-date">Jan 2026 – Present</div>
    <div class="exp-company">اسم الشركة</div>
  </div>
  <div class="exp-content">
    <div class="exp-role">المسمى الوظيفي</div>
    <div class="exp-desc">وصف العمل هنا.</div>
    <div class="exp-tags">
      <span class="tag">Skill 1</span>
      <span class="tag">Skill 2</span>
    </div>
  </div>
</div>
```

---

### شهادة جديدة
ابحث عن `class="certs-grid"`
Copy أي `cert-card` وعدّل فيها:

```html
<div class="cert-card reveal reveal-delay-1">
  <div class="cert-icon">🏅</div>
  <div class="cert-name">اسم الشهادة</div>
  <div class="cert-issuer">الجهة المانحة</div>
  <div class="cert-date">التاريخ</div>
  <a href="رابط الشهادة" target="_blank" class="cert-link">View Certificate ↗</a>
</div>
```

---

### Award جديد
ابحث عن `class="awards-list"`
Copy أي `award-item` وعدّل فيها:

```html
<div class="award-item reveal">
  <div class="award-icon">🏆</div>
  <div>
    <div class="award-title">اسم الجائزة</div>
    <div class="award-sub">التفاصيل · السنة</div>
  </div>
</div>
```

---

### Blog Post جديد
ابحث عن `class="blog-cards"`
Copy أي `blog-card` وعدّل فيها:

```html
<div class="blog-card reveal reveal-delay-1" onclick="openBlog(3)">
  <div class="blog-date">Jun 2026</div>
  <div class="blog-title">عنوان المقالة</div>
  <div class="blog-excerpt">مقدمة قصيرة 2-3 جمل.</div>
  <div class="blog-read">Read Article →</div>
</div>
```

**مهم:** الرقم في `openBlog(3)` لازم يتطابق مع index في `blogData` في الـ JavaScript.

ابحث عن `const blogData = [` وأضف:
```javascript
{
  date: 'Jun 2026',
  title: 'عنوان المقالة',
  body: '<p>محتوى المقالة هنا.</p><p>فقرة تانية.</p>'
},
```

---

### Skill جديد
ابحث عن الـ category المناسبة زي `Hardware & PCB` وأضف:

```html
<span class="skill-pill">اسم الـ Skill</span>
```

---

## 🖼️ تغيير الصورة

1. سمّي الصورة الجديدة `seif-photo.png`
2. ارفعها على GitHub في فولدر `assets/`
3. هتبدل القديمة تلقائي

---

## 📄 تحديث الـ CV

1. سمّي الـ CV الجديد `Seif_Eldaby_CV.pdf`
2. ارفعه على GitHub في فولدر `assets/`
3. هيتحمل تلقائي

---

## 🔗 تغيير لينكات التواصل

ابحث عن `id="page-contact"` وعدّل:

```html
<a href="mailto:بريدك@gmail.com" ...>
<a href="https://linkedin.com/in/username" ...>
<a href="https://github.com/username" ...>
<a href="tel:+20xxxxxxxxxx" ...>
```

---

## 📊 تغيير الـ Stats

ابحث عن `class="stats"` في الـ Home page:

```html
<div class="stat-num">90+</div>   ← غير الرقم
<div class="stat-label">PCBs Assembled</div>  ← غير النص
```

---

## 🚀 رفع التعديلات على GitHub

1. افتح الـ repo على github.com
2. افتح `index.html`
3. اضغط ✏️ Edit
4. عدّل وعمل **Commit changes**
5. استنى دقيقة والموقع يتحدث

---

## 💡 Tips

- لو عاوز تتأكد من تعديل — افتح الـ `index.html` في المتصفح محلياً أول
- الـ `reveal-delay-1` حتى `reveal-delay-4` بتتحكم في ترتيب ظهور العناصر
- أي حاجة مش عارف تعملها — ابعت للـ Claude وهيساعدك 😄
