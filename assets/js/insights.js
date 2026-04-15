// Insights — render + filter
(function () {
  var data = window.INSIGHTS_DATA;
  if (!data) return;

  var state = { filter: 'all', query: '' };

  var els = {
    search: document.getElementById('insightSearch'),
    chips: Array.prototype.slice.call(document.querySelectorAll('#filterChips .chip')),
    featuredStory: document.getElementById('featuredStory'),
    featuredRail: document.getElementById('featuredRail'),
    originalGrid: document.getElementById('originalGrid'),
    curatedGrid: document.getElementById('curatedGrid'),
    originalCount: document.getElementById('originalCount'),
    curatedCount: document.getElementById('curatedCount'),
    topTopic: document.getElementById('topTopic')
  };

  function hrefOf(item) {
    return item.type === 'original'
      ? 'article.html?id=' + encodeURIComponent(item.id)
      : item.url;
  }
  function extAttrs(item) {
    return item.type === 'curated' ? ' target="_blank" rel="noopener"' : '';
  }
  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function matchesFilter(item) {
    return state.filter === 'all' || item.pillar === state.filter;
  }
  function matchesQuery(item) {
    if (!state.query) return true;
    var hay = [item.title, item.summary, item.pillarLabel, item.source]
      .filter(Boolean).join(' ').toLowerCase();
    return hay.indexOf(state.query) !== -1;
  }

  function renderFeatured(item) {
    if (!item) { els.featuredStory.innerHTML = ''; return; }
    var meta = item.type === 'original'
      ? (item.date || '') + (item.readTime ? ' · ' + item.readTime : '')
      : (item.source || '') + ' · External read';
    els.featuredStory.innerHTML = [
      '<p class="card-kicker">' + escapeHtml(item.pillarLabel) + '</p>',
      '<h3>' + escapeHtml(item.title) + '</h3>',
      '<p>' + escapeHtml(item.summary) + '</p>',
      '<div class="featured-meta"><span>' + escapeHtml(meta) + '</span></div>',
      '<div class="featured-actions">',
        '<a class="btn-purple" href="' + escapeHtml(hrefOf(item)) + '"' + extAttrs(item) + '>Read now</a>',
        '<a class="btn-ghost" href="https://fhc.oneyco.com.au">Run Free Check</a>',
      '</div>'
    ].join('');
  }

  function renderRail(items) {
    els.featuredRail.innerHTML = items.slice(0, 2).map(function (item) {
      var meta = item.type === 'original'
        ? (item.date || '') + (item.readTime ? ' · ' + item.readTime : '')
        : (item.source || '');
      return [
        '<a class="featured-mini" href="' + escapeHtml(hrefOf(item)) + '"' + extAttrs(item) + '>',
          '<p class="card-kicker">' + escapeHtml(item.pillarLabel) + '</p>',
          '<h3>' + escapeHtml(item.title) + '</h3>',
          '<div class="card-meta"><span>' + escapeHtml(meta) + '</span></div>',
        '</a>'
      ].join('');
    }).join('');
  }

  function renderCard(item) {
    var meta = item.type === 'original'
      ? (item.date || '') + (item.readTime ? ' · ' + item.readTime : '')
      : (item.source || '');
    return [
      '<a class="insight-card fade-up" href="' + escapeHtml(hrefOf(item)) + '"' + extAttrs(item) + '>',
        '<span class="tag">' + escapeHtml(item.pillarLabel) + '</span>',
        '<h3>' + escapeHtml(item.title) + '</h3>',
        '<p>' + escapeHtml(item.summary) + '</p>',
        '<div class="card-meta"><span>' + escapeHtml(meta) + '</span></div>',
        '<span class="arrow">' + (item.type === 'original' ? 'Read →' : 'Read externally →') + '</span>',
      '</a>'
    ].join('');
  }

  function renderGrid(el, items, emptyMsg) {
    if (!items.length) {
      el.innerHTML = '<div class="insights-empty">' + escapeHtml(emptyMsg) + '</div>';
      return;
    }
    el.innerHTML = items.map(renderCard).join('');
  }

  function render() {
    var originals = data.originals.filter(matchesFilter).filter(matchesQuery);
    var curated = data.curated.filter(matchesFilter).filter(matchesQuery);

    renderFeatured(data.featured);

    var railPool = originals
      .filter(function (a) { return !data.featured || a.id !== data.featured.id; })
      .slice(0, 2);
    if (railPool.length < 2) {
      railPool = railPool.concat(curated.slice(0, 2 - railPool.length));
    }
    if (railPool.length < 2) {
      railPool = data.originals
        .filter(function (a) { return !data.featured || a.id !== data.featured.id; })
        .slice(0, 2);
    }
    renderRail(railPool);

    renderGrid(els.originalGrid, originals, 'No original insights match this filter yet.');
    renderGrid(els.curatedGrid, curated, 'No curated reads match this filter yet.');

    if (els.originalCount) els.originalCount.textContent = String(data.originals.length);
    if (els.curatedCount) els.curatedCount.textContent = String(data.curated.length);
    if (els.topTopic) {
      if (state.filter === 'all') {
        els.topTopic.textContent = 'Rate Watch';
      } else {
        var activeChip = els.chips.find(function (c) { return c.dataset.filter === state.filter; });
        els.topTopic.textContent = activeChip ? activeChip.textContent : 'Rate Watch';
      }
    }

    if (typeof window.oneyRevealFadeUps === 'function') {
      window.oneyRevealFadeUps();
    } else {
      document.querySelectorAll('.fade-up').forEach(function (el) { el.classList.add('visible'); });
    }
  }

  els.chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      state.filter = chip.dataset.filter;
      els.chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      render();
    });
  });

  if (els.search) {
    els.search.addEventListener('input', function (e) {
      state.query = String(e.target.value || '').trim().toLowerCase();
      render();
    });
  }

  render();
})();
