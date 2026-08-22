(function () {
  const IMG_BASE = 'public/images/';
  const ART_BASE = 'public/art/';

  /* ---------- Dark mode ---------- */
  const toggle = document.getElementById('darkToggle');
  const icon = document.getElementById('darkIcon');
  const themeLabel = document.getElementById('themeLabel');

  function applyTheme(dark) {
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (icon) {
      icon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
    if (themeLabel) {
      themeLabel.textContent = dark ? 'Night' : 'Terracotta';
    }
    toggle.setAttribute('aria-label', dark ? 'Switch to Terracotta mode' : 'Switch to Night mode');
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
  if (expList && typeof EXPERIENCE !== 'undefined') {
    expList.innerHTML = EXPERIENCE.map(function (exp) {
      return (
        '<div class="sidebar-item"><div class="experience-container">' +
          '<div class="experience-header">' +
            '<a href="' + exp.link + '" target="_blank" rel="noreferrer">' + exp.name + '</a>' +
            '<span class="exp-year">' + exp.year + '</span>' +
          '</div>' +
          '<div class="exp-badge">' + exp.position + '</div>' +
          '<p class="experience-description">' + exp.description.replace(/\n/g, '<br>') + '</p>' +
        '</div></div>'
      );
    }).join('');
  }

  /* ---------- Projects ---------- */
  const idSafe = function (name) { return name.replace(/\s+/g, '_'); };

  function projectImages(w) {
    const width = 100 / w.images.length;
    return w.images.map(function (img, i) {
      return '<img src="' + IMG_BASE + img + '" alt="' + w.name + ' screenshot ' + (i + 1) + '" style="max-width:' + width + '%" />';
    }).join('');
  }

  function stackTags(stackStr) {
    if (!stackStr) return '';
    const tags = stackStr.split('•').map(s => s.trim());
    return tags.map(tag => '<span class="stack-tag">' + tag + '</span>').join('');
  }

  let selected = WORK[0];

  const links = document.getElementById('projectLinks');
  const container = document.getElementById('projectsContainer');

  function renderLinks() {
    if (!links) return;
    links.innerHTML = WORK.map(function (w) {
      const activeClass = (w.name === selected.name ? 'selected-project' : '');
      return '<span data-name="' + w.name + '" class="project-chip ' + activeClass + '">' + w.name + '</span>';
    }).join('');

    Array.prototype.forEach.call(links.querySelectorAll('.project-chip'), function (p) {
      p.addEventListener('click', function () {
        selected = WORK.find(function (w) { return w.name === p.dataset.name; });
        renderLinks();
        renderProject();
      });
    });
  }

  function renderProject() {
    if (!container) return;
    const w = selected;
    container.innerHTML =
      '<a href="' + w.link + '" target="_blank" rel="noreferrer" class="project-images">' + projectImages(w) + '</a>' +
      '<div class="project-info">' +
        '<div>' +
          '<h2 class="project-heading" id="' + idSafe(w.name) + '">' + w.name + '</h2>' +
          '<div class="stack-chips">' + stackTags(w.stack) + '</div>' +
        '</div>' +
        '<div class="project-action-bar">' +
          '<a href="' + w.link + '" target="_blank" rel="noreferrer" class="visit-btn">Visit Project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>' +
        '</div>' +
      '</div>' +
      '<div class="project-desc">' + w.description + '</div>';
  }

  renderLinks();
  renderProject();

  /* Mobile stacked view */
  const mobileContainer = document.getElementById('mobileProjectInfo');
  if (mobileContainer) {
    mobileContainer.innerHTML = WORK.map(function (w) {
      return (
        '<div class="projects-container">' +
          '<a href="' + w.link + '" target="_blank" rel="noreferrer" class="project-images">' + projectImages(w) + '</a>' +
          '<h2 class="project-heading" id="' + idSafe(w.name) + '">' + w.name + '</h2>' +
          '<div class="stack-chips" style="margin-bottom:12px">' + stackTags(w.stack) + '</div>' +
          '<div class="project-desc">' + w.description + '</div>' +
          '<div class="project-action-bar" style="margin-top:16px">' +
            '<a href="' + w.link + '" target="_blank" rel="noreferrer" class="visit-btn">Visit <i class="fa-solid fa-arrow-up-right-from-square"></i></a>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  /* ---------- Art grid ---------- */
  const artView = document.getElementById('artView');
  if (artView && typeof ART !== 'undefined') {
    artView.innerHTML = ART.map(function (item) {
      return '<div class="art-item"><img src="' + ART_BASE + item.img + '" alt="' + item.title + '" loading="lazy" /></div>';
    }).join('');
  }

  /* ---------- Analytics View Component ---------- */
  const analyticsData = {
    'This Week': {
      label: 'ANALYTICS',
      stat: '5K+',
      yAxis: ['6K', '5K', '4K', '3K', '2K', '1K', '0'],
      maxVal: 6000,
      bars: [
        { label: 'Sat', val: 1900, text: '1.9K views' },
        { label: 'Sun', val: 1200, text: '1.2K views' },
        { label: 'Mon', val: 3500, text: '3.5K views' },
        { label: 'Tue', val: 2000, text: '2.0K views' },
        { label: 'Wed', val: 5600, text: '5.6K views (Peak)' },
        { label: 'Thu', val: 2700, text: '2.7K views' },
        { label: 'Fri', val: 3900, text: '3.9K views' }
      ]
    },
    'This Month': {
      label: 'MONTHLY METRICS',
      stat: '24K+',
      yAxis: ['30K', '25K', '20K', '15K', '10K', '5K', '0'],
      maxVal: 30000,
      bars: [
        { label: 'Week 1', val: 18500, text: '18.5K views' },
        { label: 'Week 2', val: 22100, text: '22.1K views' },
        { label: 'Week 3', val: 28400, text: '28.4K views (Peak)' },
        { label: 'Week 4', val: 24900, text: '24.9K views' },
        { label: 'Avg/Day', val: 15200, text: '15.2K views' },
        { label: 'Direct', val: 19800, text: '19.8K sessions' },
        { label: 'Referral', val: 14200, text: '14.2K sessions' }
      ]
    },
    'All Time': {
      label: 'ALL TIME VISITS',
      stat: '120K+',
      yAxis: ['150K', '125K', '100K', '75K', '50K', '25K', '0'],
      maxVal: 150000,
      bars: [
        { label: '2020', val: 32000, text: '32K visits' },
        { label: '2021', val: 58000, text: '58K visits' },
        { label: '2022', val: 84000, text: '84K visits' },
        { label: '2023', val: 105000, text: '105K visits' },
        { label: '2024', val: 142000, text: '142K visits (Peak)' },
        { label: '2025', val: 118000, text: '118K visits' },
        { label: 'YTD', val: 120000, text: '120K total' }
      ]
    },
    'Model Usage': {
      label: 'AI INFERENCES',
      stat: '85K+',
      yAxis: ['100K', '80K', '60K', '40K', '20K', '10K', '0'],
      maxVal: 100000,
      bars: [
        { label: 'Flux', val: 86000, text: '86K generations' },
        { label: 'BLIP-2', val: 62000, text: '62K autolabels' },
        { label: 'Modal', val: 92000, text: '92K stream inferences' },
        { label: 'ResNet', val: 45000, text: '45K classifications' },
        { label: 'WNTR', val: 38000, text: '38K hydraulic runs' },
        { label: 'LLM', val: 78000, text: '78K agent steps' },
        { label: 'D3/Vis', val: 51000, text: '51K charts rendered' }
      ]
    }
  };

  let currentKey = 'This Week';

  const analyticsView = document.getElementById('analyticsView');

  function renderAnalytics() {
    if (!analyticsView) return;

    const data = analyticsData[currentKey];

    const yAxisHtml = data.yAxis.map(y => '<span>' + y + '</span>').join('');

    const barsHtml = data.bars.map(b => {
      const pct = Math.round((b.val / data.maxVal) * 100);
      return (
        '<div class="bar-column">' +
          '<div class="chart-tooltip">' + b.text + '</div>' +
          '<div class="capsule-track">' +
            '<div class="capsule-fill" style="height: ' + pct + '%;"></div>' +
          '</div>' +
          '<span class="x-axis-label">' + b.label + '</span>' +
        '</div>'
      );
    }).join('');

    const keys = Object.keys(analyticsData);
    const dropdownItemsHtml = keys.map(k => {
      const activeClass = k === currentKey ? 'active' : '';
      return '<button class="dropdown-item ' + activeClass + '" data-key="' + k + '">' + k + '</button>';
    }).join('');

    analyticsView.innerHTML =
      '<div class="analytics-card">' +
        '<div class="analytics-header-row">' +
          '<div class="analytics-title-group">' +
            '<span class="analytics-label" id="analyticsLabel">' + data.label + '</span>' +
            '<span class="analytics-big-stat" id="analyticsStat">' + data.stat + '</span>' +
          '</div>' +
          '<div class="dropdown-container">' +
            '<button class="pill-dropdown-btn" id="dropdownBtn">' +
              '<span>' + currentKey + '</span>' +
              '<i class="fa-solid fa-chevron-down"></i>' +
            '</button>' +
            '<div class="dropdown-menu" id="dropdownMenu" style="display:none">' +
              dropdownItemsHtml +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="chart-container">' +
          '<div class="y-axis">' + yAxisHtml + '</div>' +
          '<div class="bars-grid">' + barsHtml + '</div>' +
        '</div>' +

        '<div class="metrics-grid">' +
          '<div class="metric-card">' +
            '<span class="metric-value">3.5x</span>' +
            '<span class="metric-title">S3 Read Speedup</span>' +
            '<span class="metric-sub">Apache Arrow + RAPIDS GPU acceleration at NVIDIA</span>' +
          '</div>' +
          '<div class="metric-card">' +
            '<span class="metric-value">74.9%</span>' +
            '<span class="metric-title">Art Medium CNN Accuracy</span>' +
            '<span class="metric-sub">ResNet18 classification on Tate Collection (Stanford CS231n)</span>' +
          '</div>' +
          '<div class="metric-card">' +
            '<span class="metric-value">94%+</span>' +
            '<span class="metric-title">Water Distribution Model</span>' +
            '<span class="metric-sub">EPANet & WNTR simulation for Pune 24x7 water supply</span>' +
          '</div>' +
          '<div class="metric-card">' +
            '<span class="metric-value">Flux & Modal</span>' +
            '<span class="metric-title">Realtime AI Canvas</span>' +
            '<span class="metric-sub">Stream diffusion and LoRA style orchestration at FLORA AI</span>' +
          '</div>' +
        '</div>' +
      '</div>';

    // Dropdown toggle listener
    const dropdownBtn = document.getElementById('dropdownBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (dropdownBtn && dropdownMenu) {
      dropdownBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = dropdownMenu.style.display === 'flex';
        dropdownMenu.style.display = isOpen ? 'none' : 'flex';
        dropdownBtn.classList.toggle('open', !isOpen);
      });

      document.addEventListener('click', function closeMenu() {
        if (dropdownMenu) dropdownMenu.style.display = 'none';
        if (dropdownBtn) dropdownBtn.classList.remove('open');
      });

      const items = dropdownMenu.querySelectorAll('.dropdown-item');
      items.forEach(function (item) {
        item.addEventListener('click', function (e) {
          e.stopPropagation();
          currentKey = item.dataset.key;
          dropdownMenu.style.display = 'none';
          dropdownBtn.classList.remove('open');
          renderAnalytics();
        });
      });
    }
  }

  renderAnalytics();

  /* ---------- Section Tab Navigation ---------- */
  const tabs = document.querySelectorAll('.tab');
  const projectsView = document.getElementById('projectsView');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active-tab'); });
      tab.classList.add('active-tab');
      const view = tab.dataset.view;

      if (projectsView) projectsView.style.display = view === 'projects' ? '' : 'none';
      if (analyticsView) analyticsView.style.display = view === 'analytics' ? 'block' : 'none';
      if (artView) artView.style.display = view === 'art' ? 'block' : 'none';

      if (view === 'analytics') {
        renderAnalytics();
      }
    });
  });
})();
