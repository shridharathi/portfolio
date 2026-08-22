(function () {
  const IMG_BASE = 'public/images/';
  const ART_BASE = 'public/art/';

  // Set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Dark Mode Toggle ---------- */
  const toggleBtn = document.getElementById('darkToggle');
  const iconEl = document.getElementById('darkIcon');

  function applyTheme(dark) {
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (iconEl) {
      iconEl.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  let isDarkMode = false;
  try {
    isDarkMode = localStorage.getItem('darkMode') === 'true' || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && localStorage.getItem('darkMode') === null);
  } catch (e) {}

  applyTheme(isDarkMode);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      isDarkMode = !isDarkMode;
      try {
        localStorage.setItem('darkMode', String(isDarkMode));
      } catch (e) {}
      applyTheme(isDarkMode);
    });
  }

  /* ---------- Projects Logic ---------- */
  const projectLinksContainer = document.getElementById('projectLinks');
  const projectDetailContainer = document.getElementById('projectsContainer');
  const projectCountEl = document.getElementById('projectCount');

  if (projectCountEl) {
    projectCountEl.textContent = String(WORK.length).padStart(2, '0');
  }

  let selectedProject = WORK[0];

  function renderProjectPills() {
    if (!projectLinksContainer) return;
    projectLinksContainer.innerHTML = WORK.map(function (w) {
      const isActive = w.name === selectedProject.name;
      return (
        '<button class="project-pill ' + (isActive ? 'active' : '') + '" data-name="' + escapeHtml(w.name) + '">' +
          '<span>' + escapeHtml(w.name) + '</span>' +
          '<span class="project-pill-date">' + escapeHtml(w.date) + '</span>' +
        '</button>'
      );
    }).join('');

    const pills = projectLinksContainer.querySelectorAll('.project-pill');
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        const name = pill.getAttribute('data-name');
        const found = WORK.find(function (item) { return item.name === name; });
        if (found) {
          selectedProject = found;
          renderProjectPills();
          renderProjectDetail();
        }
      });
    });
  }

  function renderProjectDetail() {
    if (!projectDetailContainer) return;
    const w = selectedProject;
    
    // Parse stack tags
    const stackTags = w.stack ? w.stack.split('•').map(function (s) {
      return '<span class="stack-tag">' + escapeHtml(s.trim()) + '</span>';
    }).join('') : '';

    // Primary image
    const mainImg = w.images && w.images.length > 0 ? w.images[0] : '';
    
    projectDetailContainer.innerHTML =
      '<div class="project-media-wrapper">' +
        '<a href="' + escapeHtml(w.link) + '" target="_blank" rel="noreferrer" title="Open ' + escapeHtml(w.name) + '">' +
          '<img src="' + IMG_BASE + escapeHtml(mainImg) + '" alt="' + escapeHtml(w.name) + ' preview" />' +
        '</a>' +
      '</div>' +
      '<div class="project-info-header">' +
        '<div class="project-title-area">' +
          '<h2 class="project-title">' + escapeHtml(w.name) + '</h2>' +
          '<div class="project-stack-tags">' + stackTags + '</div>' +
        '</div>' +
        '<a href="' + escapeHtml(w.link) + '" target="_blank" rel="noreferrer" class="project-external-link">' +
          '<span>Visit Project</span>' +
          '<i class="fa-solid fa-arrow-up-right-from-square"></i>' +
        '</a>' +
      '</div>' +
      '<div class="project-description-text">' +
        w.description +
      '</div>';
  }

  renderProjectPills();
  renderProjectDetail();

  /* ---------- Experience Logic ---------- */
  const experienceContainer = document.getElementById('experienceList');
  if (experienceContainer) {
    experienceContainer.innerHTML = EXPERIENCE.map(function (exp) {
      return (
        '<article class="exp-card">' +
          '<div class="exp-header-row">' +
            '<a href="' + escapeHtml(exp.link) + '" target="_blank" rel="noreferrer" class="exp-company">' +
              '<span>' + escapeHtml(exp.name) + '</span>' +
              '<i class="fa-solid fa-arrow-up-right-from-square"></i>' +
            '</a>' +
            '<span class="exp-year">' + escapeHtml(exp.year) + '</span>' +
          '</div>' +
          '<p class="exp-role">' + escapeHtml(exp.position) + '</p>' +
          '<p class="exp-desc">' + escapeHtml(exp.description).replace(/\n/g, '<br>') + '</p>' +
        '</article>'
      );
    }).join('');
  }

  /* ---------- Art Gallery Logic ---------- */
  const artContainer = document.getElementById('artGrid');
  if (artContainer) {
    artContainer.innerHTML = ART.map(function (art, idx) {
      return (
        '<div class="art-card" data-idx="' + idx + '">' +
          '<img src="' + ART_BASE + escapeHtml(art.img) + '" alt="' + escapeHtml(art.title) + '" loading="lazy" />' +
          '<div class="art-overlay">' +
            '<span class="art-title">' + escapeHtml(art.title) + '</span>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    // Lightbox triggers
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.querySelector('.lightbox-close');
    const backdrop = document.querySelector('.lightbox-backdrop');

    function openLightbox(art) {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = ART_BASE + art.img;
      lightboxImg.alt = art.title;
      if (lightboxCaption) lightboxCaption.textContent = art.title;
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
    }

    const artCards = artContainer.querySelectorAll('.art-card');
    artCards.forEach(function (card) {
      card.addEventListener('click', function () {
        const idx = parseInt(card.getAttribute('data-idx'), 10);
        if (ART[idx]) openLightbox(ART[idx]);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  /* ---------- Tab Navigation Switching ---------- */
  const tabs = document.querySelectorAll('.pill-tab');
  const views = {
    projects: document.getElementById('projectsView'),
    experience: document.getElementById('experienceView'),
    art: document.getElementById('artView')
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const targetView = tab.getAttribute('data-view');
      Object.keys(views).forEach(function (viewKey) {
        if (views[viewKey]) {
          if (viewKey === targetView) {
            views[viewKey].style.display = 'block';
            views[viewKey].classList.add('active-view');
          } else {
            views[viewKey].style.display = 'none';
            views[viewKey].classList.remove('active-view');
          }
        }
      });
    });
  });

  /* ---------- Helper Utilities ---------- */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();
