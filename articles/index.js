// ============================================================
// TermuxLab — Article Registry
// ============================================================
//
// HOW TO ADD A NEW ARTICLE:
// 1. Create a new file: articles/your-slug.js
//    It should contain one const declaration:
//
//    const ARTICLE_your_slug = {
//      id: "your-slug",
//      title: "...",
//      subtitle: "...",
//      category: "...",
//      author: "Shivansh Bansal",
//      date: "May 2025",
//      readTime: "5 min read",
//      featured: false,
//      cover: "https://images.unsplash.com/...",
//      content: `...full HTML content...`
//    };
//
// 2. Add the slug to the ARTICLE_REGISTRY array below.
// 3. Push to GitHub. That's it. Nothing else to change.
//
// HOW TO CHANGE THE FEATURED ARTICLE:
// - Set featured: true in the article file you want to feature.
// - Set featured: false in the current featured article.
// - Update FEATURED_SLUG below to match the new featured slug.
//
// ============================================================

// FEATURED ARTICLE: change the slug below to feature a different article
// Only one article should have featured: true in its file at a time
const FEATURED_SLUG = 'file-sharing-internet';

const ARTICLE_REGISTRY = [
  'proot-arch',
  'neovim-ide',
  'c-programming',
  'networking',
  'file-sharing-python',
  'file-sharing-internet',
  'complete-api-guide',
  'what-is-termux',
  'ani-cli-anime',
  'language-interop',
];
