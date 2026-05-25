# Seif Eldaby — Portfolio

A personal portfolio website built with HTML, CSS, and vanilla JavaScript.

## 📁 Structure

```
seif-portfolio/
├── index.html          ← Main portfolio page
├── assets/
│   ├── seif-photo.png  ← Your profile photo
│   └── Seif_Eldaby_CV.pdf ← Your CV (downloadable)
└── README.md
```

## 🚀 How to Deploy on GitHub Pages

1. Create a new repository on GitHub (e.g. `seif-eldaby.github.io` or `portfolio`)
2. Upload all files keeping the folder structure
3. Go to **Settings → Pages**
4. Under **Source**, select `main` branch and `/ (root)`
5. Click **Save** — your site will be live at `https://yourusername.github.io/portfolio`

## ✏️ How to Update Content

Everything is in `index.html`. Here's where to find each section:

| Section | Search for |
|---|---|
| Your name / bio | `<!-- HERO -->` |
| Stats (90+, 73, etc.) | `<!-- STATS -->` |
| Education | `<!-- EDUCATION -->` |
| Experience | `<!-- EXPERIENCE -->` |
| Projects | `<!-- PROJECTS -->` |
| Skills | `<!-- SKILLS -->` |
| Awards | `<!-- AWARDS -->` |
| Contact links | `<!-- CONTACT -->` |

### Adding a new project:
Copy this block inside `projects-grid` and edit it:
```html
<div class="project-card" data-num="07">
  <div class="project-icon">🔧</div>
  <div class="project-name">Your Project Name</div>
  <div class="project-desc">Your project description here.</div>
</div>
```

### Adding a new experience:
Copy this block inside `exp-list` and edit it:
```html
<div class="exp-item">
  <div class="exp-meta">
    <div class="exp-date">Jan 2026 – Present</div>
    <div class="exp-company">Company Name</div>
  </div>
  <div class="exp-content">
    <div class="exp-role">Your Role</div>
    <div class="exp-desc">What you did here.</div>
    <div class="exp-tags">
      <span class="tag">Skill 1</span>
      <span class="tag">Skill 2</span>
    </div>
  </div>
</div>
```

### Updating your CV:
Just replace `assets/Seif_Eldaby_CV.pdf` with your new PDF — keep the same filename.

### Updating your photo:
Replace `assets/seif-photo.png` with your new photo — keep the same filename.

## 🎨 Changing Colors

At the top of `index.html`, find `:root` and edit the variables:
```css
:root {
  --gold: #C9A84C;    ← Main accent color
  --dark: #0D0D0D;    ← Background
  --text: #F0EDE6;    ← Main text
}
```
