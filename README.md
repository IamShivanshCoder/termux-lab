# TermuxLab

> Root your knowledge. No sudo required.

A fast, minimal, open-source blog dedicated to Termux guides — from basic setup to advanced development environments. Inspired by the editorial design of Medium and Android Authority.

**Live site → [iamshivanshcoder.github.io/termux-lab](https://iamshivanshcoder.github.io/termux-lab)**

---

## What's inside

- Proot-distro & Arch Linux setup guides
- Neovim as a full IDE in Termux
- C development with clang and Makefile
- Networking toolkit: nmap, curl, wget and beyond

---

## Tech stack

- Pure HTML, CSS, JavaScript — zero dependencies
- No framework, no build step, no CMS
- Hosted on GitHub Pages for free

---

## Adding a new article

Open `articles.js` and add a new object at the top of the `ARTICLES` array:

```js
{
  id:       "your-slug",          // becomes article.html?id=your-slug
  title:    "Article Title",
  subtitle: "One-line description",
  category: "Setup",              // Setup · Dev · Networking · Tools
  author:   "Shivansh Bansal",
  date:     "May 2025",
  readTime: "6 min read",
  featured: false,                // set true to make it the homepage hero
  cover:    "https://...",        // any image URL
  content:  `<p>Your HTML here</p>`
}
```

That's it. No other file needs to change.
## Project structure
termuxlab/
├── index.html      ← Homepage
├── article.html    ← Single article (reads ?id= from URL)
├── guides.html     ← All articles with category filter
├── tools.html      ← Curated Termux package directory
├── about.html      ← About + contribute
├── 404.html        ← Error page
├── articles.js     ← All article data (your only editing target)
└── style.css       ← Shared stylesheet
## Contributing
Have a Termux guide to share? Contributions are welcome.
Codeberg: codeberg.org/ShivanshBansal
GitHub: github.com/IamShivanshCoder
Email: shivanshbansal0308@gmail.com
## License
MIT — use it, fork it, rice it.
