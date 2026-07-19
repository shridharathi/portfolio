(function () {
  const IMG_BASE = 'public/images/';
  const ART_BASE = 'public/art/';

  /* ---------- Dark mode ---------- */
  const toggle = document.getElementById('darkToggle');
  const icon = document.getElementById('darkIcon');

  function applyTheme(dark) {
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
    icon.className = dark ? 'fa-solid fa-sun fa-lg' : 'fa-solid fa-moon fa-lg';
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  let darkMode = false;
  try { darkMode = localStorage.getItem('darkMode') === 'true'; } catch (e) {}
  applyTheme(darkMode);

  toggle.addEventListener('click', function () {
    darkMode = !darkMode;
    try { localStorage.setItem('darkMode', String(darkMode)); } catch (e) {}
    applyTheme(darkMode);
  });

  /* ---------- Experience sidebar ---------- */
  const expList = document.getElementById('experienceList');
  expList.innerHTML = EXPERIENCE.map(function (exp) {
    return (
      '<div class="sidebar-item"><div class="experience-container">' +
        '<div class="experience-header">' +
          '<a href="' + exp.link + '" target="_blank" rel="noreferrer">' + exp.name + '</a>' +
        '</div>' +
        '<p class="experience-position">' + exp.position + '</p>' +
        '<p class="experience-description">' + exp.description.replace(/\n/g, '<br>') + '</p>' +
      '</div></div>'
    );
  }).join('');

  /* ---------- Projects ---------- */
  const idSafe = function (name) { return name.replace(' ', '_'); };

  function projectImages(w) {
    const width = 100 / w.images.length;
    return w.images.map(function (img, i) {
      return '<img src="' + IMG_BASE + img + '" alt="' + w.name + ' number ' + i + '" style="max-width:' + width + '%" />';
    }).join('');
  }

  let selected = WORK[0];

  const links = document.getElementById('projectLinks');
  const container = document.getElementById('projectsContainer');

  function renderLinks() {
    links.innerHTML = WORK.map(function (w) {
      return '<p data-name="' + w.name + '" class="' + (w.name === selected.name ? 'selected-project' : '') + '">' + w.name + '</p>';
    }).join('');
    Array.prototype.forEach.call(links.querySelectorAll('p'), function (p) {
      p.addEventListener('click', function () {
        selected = WORK.find(function (w) { return w.name === p.dataset.name; });
        renderLinks();
        renderProject();
      });
    });
  }

  function renderProject() {
    const w = selected;
    container.innerHTML =
      '<a href="' + w.link + '" target="_blank" rel="noreferrer" class="project-images">' + projectImages(w) + '</a>' +
      '<div class="project-info">' +
        '<p class="heading project-heading" id="' + idSafe(w.name) + '">' + w.name + '</p>' +
        '<p class="stack">' + w.stack + '</p>' +
      '</div><br /><br />' +
      '<div class="project-desc">' + w.description + '</div><br />';
  }

  renderLinks();
  renderProject();

  /* Mobile stacked view */
  document.getElementById('mobileProjectInfo').innerHTML = WORK.map(function (w) {
    return (
      '<div>' +
        '<a href="' + w.link + '" target="_blank" rel="noreferrer" class="project-images">' + projectImages(w) + '</a>' +
        '<p class="heading project-heading" id="' + idSafe(w.name) + '">' + w.name + '</p><br />' +
        '<div>' + w.description + '</div><br /><br />' +
      '</div>'
    );
  }).join('');

  /* ---------- Art grid ---------- */
  document.getElementById('artView').innerHTML = ART.map(function (item) {
    return '<div class="art-item"><img src="' + ART_BASE + item.img + '" alt="' + item.title + '" loading="lazy" /></div>';
  }).join('');

  /* ---------- Tabs ---------- */
  const tabs = document.querySelectorAll('.tab');
  const projectsView = document.getElementById('projectsView');
  const artView = document.getElementById('artView');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active-tab'); });
      tab.classList.add('active-tab');
      const view = tab.dataset.view;
      projectsView.style.display = view === 'projects' ? '' : 'none';
      artView.style.display = view === 'art' ? 'block' : 'none';
    });
  });
})();
