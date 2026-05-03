## PROJECT CONTEXT — TermuxLab

A static blogging site for Termux guides. No frameworks, no build tools,
no backend. Hosted on GitHub Pages.

Live URL: https://iamshivanshcoder.github.io/termuxlab
Repo: https://github.com/IamShivanshCoder/termuxlab

Owner: Shivansh Bansal
Email: shivanshbansal0308@gmail.com
GitHub: https://github.com/IamShivanshCoder
Codeberg: https://codeberg.org/ShivanshBansal

---

## FILE STRUCTURE

termuxlab/
├── index.html          ← Homepage (hero + article grid)
├── guides.html         ← All articles + category filter + search bar
├── article.html        ← Single article template (reads ?id= from URL)
├── tools.html          ← Curated Termux package directory
├── about.html          ← About page + contribute section
├── 404.html            ← Error page
├── style.css           ← Shared stylesheet (never break this)
├── js/
│   ├── loader.js       ← Loads all article scripts + assembles ARTICLES array
│   └── search.js       ← Search logic used by guides.html
└── articles/
    ├── index.js        ← ONLY file edited to register new articles
    ├── proot-arch.js
    ├── neovim-ide.js
    ├── c-programming.js
    ├── networking.js
    ├── file-sharing-python.js
    ├── file-sharing-internet.js
    └── complete-api-guide.js

---

## DESIGN SYSTEM

Dark editorial theme. Terminal meets magazine.

CSS Variables:
  --bg:       #0d0f0e
  --surface:  #131614
  --surface2: #1a1d1b
  --border:   #222622
  --accent:   #00e07a   (terminal green)
  --accent2:  #00b85c
  --text:     #e8ece9
  --muted:    #7a8a7d
  --tag-bg:   #0d2318
  --tag-text: #00e07a

Fonts:
  DM Serif Display → headings
  DM Sans          → body
  JetBrains Mono   → code, logo, tags

---

## HOW ARTICLES WORK

### File organization

Each article lives in its own file under articles/.
articles/index.js holds ARTICLE_REGISTRY (slug array) and FEATURED_SLUG.
js/loader.js loads the registry, then each article file, then assembles ARTICLES.

### The loading sequence (critical — do not break)

HTML script order MUST be exactly this before </body>:

<script>
  window.onArticlesReady = function() {
    // all render code here — runs AFTER articles are loaded
  };
</script>
<script src="articles/index.js"></script>
<script src="js/loader.js"></script>

The onArticlesReady callback MUST be defined BEFORE the loader scripts.
The loader fires onArticlesReady() only after ALL article scripts have loaded.
Never put render code outside onArticlesReady — it will run before data is ready.

### Article file format

articles/your-slug.js defines ONE global const:

const ARTICLE_your_slug = {
  id: "your-slug",
  title: "",
  subtitle: "",
  category: "",   // Setup · Dev · Networking · Tools · Security
  author: "Shivansh Bansal",
  date: "",
  readTime: "",
  featured: false,
  cover: "https://images.unsplash.com/...",
  content: `HTML string`
};

Use underscores in variable name for hyphenated slugs (e.g. file_sharing_python).
MUST use const (not var or let) — loader resolves the global binding by name.

### Adding a new article

1. Create articles/your-slug.js with the ARTICLE_your_slug const above
2. Add 'your-slug' to ARTICLE_REGISTRY in articles/index.js
3. Push to GitHub. Done. Nothing else changes.

### Changing the featured article

1. Set featured: true in the article file
2. Set featured: false in the old featured article
3. Update FEATURED_SLUG in articles/index.js to match

### js/search.js

Provides searchArticles(query, articles) — searches title, subtitle,
category, author, content. Returns scored/sorted results.
Min query length: 2 characters. Used by guides.html search bar.

---

## CONSTRAINTS (never violate these)

- Zero dependencies — no npm, no React, no jQuery, no bundler
- All paths relative — no absolute paths, works on file:// and GitHub Pages
- Never hardcode article data in HTML files
- Never touch style.css unless explicitly asked to
- Output only files that actually changed — never reprint unchanged files
- Mobile responsive — hamburger nav below 768px
- Article files must use const declarations (not var/let) for loader to find them
- onArticlesReady must always be defined before loader scripts in HTML

