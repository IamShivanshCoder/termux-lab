# TermuxLab — Pre-Production Checklist

Run through this entire list before every `git push` to GitHub Pages.
Check each item manually. Do not skip sections even for small updates.

---

## FUNCTIONALITY

### Navigation
- [ ] Logo click → index.html on every page
- [ ] Home → index.html
- [ ] Guides → guides.html
- [ ] Tools → tools.html
- [ ] About → about.html
- [ ] Subscribe button → https://github.com/IamShivanshCoder (new tab)
- [ ] Mobile hamburger opens and closes on all pages
- [ ] All mobile nav links work after hamburger opens

### Homepage
- [ ] Hero article loads (featured: true article shows)
- [ ] Article grid shows all non-featured articles
- [ ] Clicking hero → correct article page
- [ ] Clicking any card → correct article page

### Guides Page
- [ ] All articles appear on load
- [ ] Category filter pills render dynamically
- [ ] Clicking a pill filters correctly
- [ ] "All" pill restores full list
- [ ] Search bar filters in real time
- [ ] Search + category filter work simultaneously
- [ ] "No guides found" message shows on zero results
- [ ] ?category= URL param auto-activates correct filter

### Article Page
- [ ] Title, subtitle, cover, author, date all render
- [ ] Reading progress bar moves on scroll
- [ ] Code blocks scroll horizontally, do not overflow
- [ ] Blockquotes render with green left border
- [ ] "Back to all guides" → guides.html
- [ ] "More guides" section shows 2 cards
- [ ] article.html?id=fake → 404 message with back link, no JS error

### Tools Page
- [ ] All tool cards render
- [ ] Copy button copies install command to clipboard
- [ ] "Copied!" confirmation appears and disappears after 1.5s
- [ ] Category badges display correctly

---

## NEW ARTICLES (run only when articles were added or changed)

- [ ] New article file exists in articles/ folder
- [ ] Slug added to ARTICLE_REGISTRY in articles/index.js
- [ ] ARTICLE_ variable name uses underscores matching the slug
- [ ] Article appears on homepage grid
- [ ] Article appears on guides page
- [ ] Article page opens correctly via its slug
- [ ] Cover image loads (open the URL directly to verify)
- [ ] If featured: true set — hero on homepage shows new article
- [ ] Old featured article has featured: false
- [ ] FEATURED_SLUG in articles/index.js updated to match

---

## GITHUB PAGES COMPATIBILITY

- [ ] Zero hardcoded localhost or 127.0.0.1 references anywhere
- [ ] Zero absolute paths starting with / in any href or src
- [ ] All internal links are relative: guides.html not /guides.html
- [ ] All cover images use full https:// Unsplash URLs
- [ ] No fetch() calls pointing to local files
- [ ] articles/index.js loads before js/loader.js in all HTML files
- [ ] window.onArticlesReady defined before loader scripts in all HTML files

---

## MOBILE CHECK

Open the live or local site on your Redmi Pad 2 and check:

- [ ] Homepage hero readable and tappable
- [ ] Article grid single column on phone width
- [ ] Hamburger menu visible and functional
- [ ] Article body text comfortable to read
- [ ] Code blocks scrollable horizontally without breaking layout
- [ ] No text overflowing outside its container
- [ ] Footer links tappable without zooming

---

## CONTACT & LINKS

- [ ] No placeholder hrefs remaining anywhere (#, example.com, lorem ipsum)
- [ ] All mailto: links use shivanshbansal0308@gmail.com
- [ ] All GitHub links point to https://github.com/IamShivanshCoder
- [ ] All Codeberg links point to https://codeberg.org/ShivanshBansal
- [ ] All external links open in new tab with rel="noopener"

---

## BEFORE GIT PUSH

- [ ] Tested locally by opening index.html in browser (file:// protocol)
- [ ] Tested locally via python -m http.server 8080 (catches path issues)
- [ ] No console errors in browser DevTools on any page
- [ ] No broken image icons visible anywhere
- [ ] README.md is up to date if new features were added

---

## AFTER GIT PUSH

- [ ] Wait 2 minutes for GitHub Pages to rebuild
- [ ] Open https://iamshivanshcoder.github.io/termuxlab/ in incognito tab
- [ ] Verify new article appears (may take up to 10 minutes due to cache)
- [ ] Check one article page opens correctly on live URL
- [ ] Check site on mobile browser after deploy

---

## GIT COMMANDS

```bash
cd ~/termuxlab
git add .
git status          # review what changed before committing
git commit -m "describe what you added or fixed"
git push origin main
