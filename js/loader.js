// ============================================================
// TermuxLab — Dynamic Article Loader
// ============================================================

function _tlb_loadScript(src) {
  return new Promise(function (resolve, reject) {
    var s = document.createElement('script');
    s.src = src + '?v=' + Math.floor(Date.now() / 600000);
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function _tlb_loadAllArticles() {
  await _tlb_loadScript('articles/index.js');

  var registry = ARTICLE_REGISTRY;

  await Promise.all(
    registry.map(function (slug) {
      return _tlb_loadScript('articles/' + slug + '.js');
    })
  );

  window.ARTICLES = registry
    .map(function (slug) {
      var name = 'ARTICLE_' + slug.replace(/-/g, '_');
      return eval(name);
    })
    .sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

  if (typeof window.onArticlesReady === 'function') {
    window.onArticlesReady();
  }
}

_tlb_loadAllArticles().catch(function (err) {
  console.error('TermuxLab: failed to load articles', err);
});
