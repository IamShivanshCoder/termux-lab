// ============================================================
// TermuxLab — Search Logic
// ============================================================
// Exports: searchArticles(query, articles)
// Searches across title, subtitle, category, author, and content.
// Returns filtered array sorted by relevance score.
// Case insensitive. Minimum query length: 2 characters.
// ============================================================

function searchArticles(query, articles) {
  if (!query || query.trim().length < 2) return articles.slice();

  var q = query.toLowerCase().trim();
  var scored = [];

  for (var i = 0; i < articles.length; i++) {
    var a = articles[i];
    var score = 0;

    var titleLower = a.title.toLowerCase();
    var subtitleLower = a.subtitle.toLowerCase();
    var categoryLower = a.category.toLowerCase();
    var authorLower = a.author.toLowerCase();
    var contentLower = stripHtml(a.content).toLowerCase();

    if (titleLower.indexOf(q) !== -1) score += 10;
    if (subtitleLower.indexOf(q) !== -1) score += 5;
    if (categoryLower.indexOf(q) !== -1) score += 4;
    if (authorLower.indexOf(q) !== -1) score += 3;
    if (contentLower.indexOf(q) !== -1) score += 1;

    if (score > 0) {
      scored.push({ article: a, score: score });
    }
  }

  scored.sort(function (a, b) { return b.score - a.score; });
  return scored.map(function (s) { return s.article; });
}

function stripHtml(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}
