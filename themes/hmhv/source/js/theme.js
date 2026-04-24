(function () {
  var STORE_KEY = 'hmhv-theme';

  function currentMode() {
    var stored = null;
    try { stored = localStorage.getItem(STORE_KEY); } catch (e) {}
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(mode, persist) {
    var root = document.documentElement;
    if (mode === 'dark') {
      root.setAttribute('data-theme', 'dark');
      document.body.classList.add('is-dark');
    } else {
      root.setAttribute('data-theme', 'light');
      document.body.classList.remove('is-dark');
    }
    if (persist) {
      try { localStorage.setItem(STORE_KEY, mode); } catch (e) {}
    }
  }

  function initThemeToggle() {
    applyTheme(currentMode(), false);
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = currentMode() === 'dark' ? 'light' : 'dark';
      applyTheme(next, true);
    });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      var stored = null;
      try { stored = localStorage.getItem(STORE_KEY); } catch (err) {}
      if (stored) return;
      applyTheme(e.matches ? 'dark' : 'light', false);
    });
  }

  function addCopyButtons() {
    document.querySelectorAll('figure.highlight').forEach(function (fig) {
      if (fig.querySelector('.copy-btn')) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.setAttribute('aria-label', 'Copy code');
      btn.textContent = 'copy';
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var codeCell = fig.querySelector('td.code');
        var text = codeCell ? codeCell.innerText : fig.innerText;
        navigator.clipboard.writeText(text.replace(/\n$/, '')).then(function () {
          btn.textContent = 'copied';
          btn.classList.add('copied');
          setTimeout(function () {
            btn.textContent = 'copy';
            btn.classList.remove('copied');
          }, 1400);
        }).catch(function () {
          btn.textContent = 'failed';
          setTimeout(function () { btn.textContent = 'copy'; }, 1400);
        });
      });
      fig.appendChild(btn);
    });
  }

  function initLightbox() {
    if (document.body.dataset.layout !== 'post') return;

    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = '<img alt=""><button type="button" class="lightbox-close" aria-label="Close">&times;</button>';
    document.body.appendChild(overlay);
    var img = overlay.querySelector('img');

    function open(src, alt) {
      img.src = src;
      img.alt = alt || '';
      overlay.classList.add('on');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay.classList.remove('on');
      document.body.style.overflow = '';
      setTimeout(function () { img.src = ''; }, 200);
    }

    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('on')) close();
    });

    document.querySelectorAll('.prose img').forEach(function (el) {
      var wrapper = el.closest('a');
      var target = wrapper || el;
      target.style.cursor = 'zoom-in';
      target.addEventListener('click', function (e) {
        e.preventDefault();
        open(el.currentSrc || el.src, el.alt);
      });
    });
  }

  function init() {
    initThemeToggle();
    addCopyButtons();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
