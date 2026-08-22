// ==========================================================================
// Discover, Create, Enjoy — Application Logic
// ==========================================================================

// Global State
let activeCard = 'sage'; // 'sage' | 'lavender' | 'pink'
let comments = [
  { id: 1, author: 'Alissa', text: 'This yellow vibe is so cozy! Loving the stacked cards!', time: '2m ago' },
  { id: 2, author: 'Brent', text: 'Check out the Replicate agents project, it is mindblowing! 🤯', time: '15m ago' },
  { id: 3, author: 'Emille', text: 'Can we schedule the art gallery meetup for next Friday?', time: '1h ago' }
];

let savedItems = new Set(['replicate', 'index-viz']);

let notifications = [
  { id: 1, title: 'New comment from Alissa', time: '2 minutes ago' },
  { id: 2, title: 'Replicate agent model updated to v2.4', time: '1 hour ago' },
  { id: 3, title: 'Upcoming Event: Stanford Creative Tech Showcase', time: 'Yesterday' }
];

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initCardStack();
  renderMiniGallery();
  renderComments();
  renderNotifications();
  setupEventListeners();
});

// ---------- Stacked Cards Handler ----------
function initCardStack() {
  const container = document.getElementById('stackedContainer');
  if (container) {
    container.setAttribute('data-active', activeCard);
  }
}

function switchCard(cardName) {
  activeCard = cardName;
  const container = document.getElementById('stackedContainer');
  if (container) {
    container.setAttribute('data-active', cardName);
  }
}

// ---------- Mini Art Gallery Renderer ----------
function renderMiniGallery() {
  const container = document.getElementById('miniGallery');
  if (!container || typeof ART === 'undefined') return;

  container.innerHTML = '';
  // Pick first 6 art pieces
  ART.slice(0, 8).forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.onclick = () => openArtModal(item);

    const img = document.createElement('img');
    img.src = `public/art/${item.img}`;
    img.alt = item.title || 'Art piece';
    img.onerror = () => {
      img.src = 'public/images/art.webp'; // Fallback
    };

    const title = document.createElement('div');
    title.className = 'gallery-card-title';
    title.innerText = item.title !== 'P' ? item.title : `Artwork #${idx + 1}`;

    card.appendChild(img);
    card.appendChild(title);
    container.appendChild(card);
  });
}

// ---------- Comments Renderer & Posting ----------
function renderComments() {
  const list = document.getElementById('commentsList');
  const badge = document.getElementById('commentBadge');
  if (!list) return;

  list.innerHTML = '';
  comments.forEach(c => {
    const card = document.createElement('div');
    card.className = 'comment-card';

    const avatar = document.createElement('div');
    avatar.className = 'avatar-circle';
    avatar.innerText = c.author.charAt(0).toUpperCase();

    const info = document.createElement('div');
    info.className = 'comment-info';

    const author = document.createElement('div');
    author.className = 'comment-author';
    author.innerText = c.author;

    const text = document.createElement('div');
    text.className = 'comment-text';
    text.innerText = c.text;

    const time = document.createElement('div');
    time.className = 'comment-time';
    time.innerText = c.time;

    info.appendChild(author);
    info.appendChild(text);
    info.appendChild(time);

    card.appendChild(avatar);
    card.appendChild(info);
    list.appendChild(card);
  });

  if (badge) badge.innerText = comments.length;
}

function handleCommentSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('commentInput');
  if (!input || !input.value.trim()) return;

  const newComment = {
    id: Date.now(),
    author: 'You',
    text: input.value.trim(),
    time: 'Just now'
  };

  comments.unshift(newComment);
  input.value = '';
  renderComments();

  // Scroll comments to top
  const list = document.getElementById('commentsList');
  if (list) list.scrollTop = 0;
}

// ---------- Detail Modals for Items ----------
function openDetailModal(itemKey) {
  const drawer = document.getElementById('detailDrawer');
  const titleEl = document.getElementById('detailModalTitle');
  const bodyEl = document.getElementById('detailModalBody');
  if (!drawer || !titleEl || !bodyEl) return;

  let itemData = null;

  if (itemKey === 'replicate') {
    itemData = {
      title: 'Replicate Agent',
      tag: 'Models & Conversational AI',
      img: 'public/images/replicate-agent.webp',
      desc: 'A conversational AI agent that generates images, videos, music, and more by chatting with Replicate\'s model library. Powered by Cloudflare Workers and the Agents SDK.',
      link: 'https://agent.replicate.workers.dev/'
    };
  } else if (itemKey === 'flora') {
    itemData = {
      title: 'FLORA AI Canvas',
      tag: 'Infinite Canvas & Realtime Diffusion',
      img: 'public/images/landing.webp',
      desc: 'FLORA is an infinite AI canvas where users can do style transfers using Flux LoRAs and realtime face transformations via Stream Diffusion.',
      link: 'https://florafauna.ai'
    };
  } else if (itemKey === 'dojo') {
    itemData = {
      title: 'Dojo Notes',
      tag: 'AI Knowledge Workspace',
      img: 'public/images/dojonotes.webp',
      desc: 'Dojo is a visual AI workspace where you can drop in PDFs, websites, videos, and images. Highlight context and ask questions in an infinite interactive board.',
      link: 'https://www.dojonotes.com/'
    };
  } else if (itemKey === 'index-viz') {
    itemData = {
      title: 'index Data Viz',
      tag: 'D3.js & Cloudflare Agents',
      img: 'public/images/iindex.webp',
      desc: 'A platform to generate clean, beautiful data visualizations. Users can share them to a social feed, making data an engaging storytelling format.',
      link: 'https://iindex.co/'
    };
  } else if (itemKey === 'cad') {
    itemData = {
      title: 'CAD Autolabeling',
      tag: 'Autodesk Research • PyTorch BLIP-2',
      img: 'public/images/captionable-canny.webp',
      desc: 'Autolabeling technology for CAD files uploaded to Autodesk Viewer using finetuned vision-language BLIP-2 & CLIP models.',
      link: 'https://medium.com/@shridharathi/employing-pretrained-vision-and-language-models-to-auto-label-cad-files-d872cad2299a'
    };
  } else if (itemKey === 'nvidia') {
    itemData = {
      title: 'NVIDIA RAPIDS & AWS S3',
      tag: 'GPU Data Acceleration',
      img: 'public/images/pune.webp',
      desc: 'Accelerated read_csv calls on AWS S3 files by 3.5x using Apache Arrow and GPU RAPIDS pandas pipeline.',
      link: 'https://medium.com/@shridharathi/speed-up-s3-csv-file-reading-with-apache-arrow-5c0e181e6c58'
    };
  } else {
    // Search WORK array
    const found = WORK.find(w => w.name.toLowerCase().includes(itemKey.toLowerCase()));
    if (found) {
      itemData = {
        title: found.name,
        tag: found.stack || 'Project',
        img: `public/images/${found.images[0]}`,
        desc: found.summary || found.description,
        link: found.link
      };
    }
  }

  if (itemData) {
    titleEl.innerText = itemData.title;
    bodyEl.innerHTML = `
      <div class="detail-tag">${itemData.tag}</div>
      ${itemData.img ? `<div class="detail-img-box"><img src="${itemData.img}" alt="${itemData.title}" onerror="this.style.display='none'"></div>` : ''}
      <div class="detail-description">${itemData.desc}</div>
      ${itemData.link ? `<a href="${itemData.link}" target="_blank" class="external-link-btn">Explore Live <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
    `;
    openDrawer('detailDrawer');
  }
}

function openArtModal(artItem) {
  const drawer = document.getElementById('detailDrawer');
  const titleEl = document.getElementById('detailModalTitle');
  const bodyEl = document.getElementById('detailModalBody');
  if (!drawer || !titleEl || !bodyEl) return;

  const title = artItem.title !== 'P' ? artItem.title : 'Studio Painting';
  titleEl.innerText = title;
  bodyEl.innerHTML = `
    <div class="detail-tag">Original Artwork • Fine Art</div>
    <div class="detail-img-box" style="max-height:360px;">
      <img src="public/art/${artItem.img}" alt="${title}">
    </div>
    <div class="detail-description">Original visual piece created with traditional/digital media as part of Shridhar's creative practice.</div>
  `;
  openDrawer('detailDrawer');
}

function openEventsList(type) {
  const drawer = document.getElementById('detailDrawer');
  const titleEl = document.getElementById('detailModalTitle');
  const bodyEl = document.getElementById('detailModalBody');
  if (!drawer || !titleEl || !bodyEl) return;

  if (type === 'dates') {
    titleEl.innerText = '📅 Upcoming Dates & Meetups';
    bodyEl.innerHTML = `
      <div class="card-pills-list">
        <div class="pill-item white-highlight-pill" style="height:auto; padding:12px 16px;">
          <div>
            <strong style="font-size:0.95rem;">Stanford AI Creative Lab Sync</strong>
            <p style="font-size:0.8rem; color:#64748b; margin-top:2px;">This Friday, 4:00 PM PST • Durand Hall</p>
          </div>
        </div>
        <div class="pill-item white-highlight-pill" style="height:auto; padding:12px 16px;">
          <div>
            <strong style="font-size:0.95rem;">Generative Art Hackathon</strong>
            <p style="font-size:0.8rem; color:#64748b; margin-top:2px;">Next Saturday, 10:00 AM PST • SF Studio</p>
          </div>
        </div>
      </div>
    `;
  } else if (type === 'upcoming') {
    titleEl.innerText = '🕒 Coming Soon';
    bodyEl.innerHTML = `
      <div class="detail-description">
        <p><strong>• Replicate Agent v3:</strong> Realtime multi-modal streaming pipelines.</p>
        <p style="margin-top:8px;"><strong>• Studio Exhibition:</strong> Oil painting series on memory & algorithm.</p>
      </div>
    `;
  } else {
    titleEl.innerText = '✈️ Most Shared Links';
    bodyEl.innerHTML = `
      <div class="card-pills-list">
        <a href="https://iindex.co/" target="_blank" class="pill-item white-highlight-pill" style="text-decoration:none;">
          <span style="font-weight:700;">index Viz Platform</span>
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        <a href="https://agent.replicate.workers.dev/" target="_blank" class="pill-item white-highlight-pill" style="text-decoration:none;">
          <span style="font-weight:700;">Replicate Agent AI</span>
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    `;
  }
  openDrawer('detailDrawer');
}

// ---------- Create New Item Submission ----------
function handleCreateSubmit(e) {
  e.preventDefault();
  const cat = document.getElementById('createCategory').value;
  const title = document.getElementById('createTitle').value.trim();
  const desc = document.getElementById('createDesc').value.trim();

  if (!title) return;

  // Determine container card
  let cardId = 'cardSage';
  if (cat === 'lavender') cardId = 'cardLavender';
  if (cat === 'pink') cardId = 'cardPink';

  const cardObj = document.getElementById(cardId);
  if (cardObj) {
    const list = cardObj.querySelector('.card-pills-list');
    if (list) {
      const newItem = document.createElement('div');
      newItem.className = 'pill-item tint-pill';
      newItem.onclick = () => {
        const titleEl = document.getElementById('detailModalTitle');
        const bodyEl = document.getElementById('detailModalBody');
        titleEl.innerText = title;
        bodyEl.innerHTML = `<div class="detail-description">${desc}</div>`;
        openDrawer('detailDrawer');
      };

      newItem.innerHTML = `
        <div class="pill-item-left">
          <div class="pill-icon-circle"><i class="fa-solid fa-sparkles"></i></div>
          <span class="pill-item-text">${title}</span>
        </div>
        <i class="fa-solid fa-chevron-right pill-arrow"></i>
      `;

      list.insertBefore(newItem, list.firstChild);
    }
  }

  // Switch to the updated card
  switchCard(cat);

  // Clear & Close drawer
  document.getElementById('createTitle').value = '';
  document.getElementById('createDesc').value = '';
  closeDrawer('createDrawer');
}

// ---------- Search Filter ----------
function handleSearchInput(e) {
  const query = e.target.value.toLowerCase().trim();
  const resultsContainer = document.getElementById('searchResults');
  if (!resultsContainer) return;

  if (!query) {
    resultsContainer.innerHTML = '<p style="color:#94a3b8; font-size:0.85rem; text-align:center; padding:12px;">Type to search projects, experience, or artwork...</p>';
    return;
  }

  let matches = [];

  // Search WORK
  WORK.forEach(w => {
    if (w.name.toLowerCase().includes(query) || (w.stack && w.stack.toLowerCase().includes(query))) {
      matches.push({ title: w.name, sub: w.stack || 'Project', key: w.name });
    }
  });

  // Search EXPERIENCE
  EXPERIENCE.forEach(exp => {
    if (exp.name.toLowerCase().includes(query) || exp.position.toLowerCase().includes(query)) {
      matches.push({ title: exp.name, sub: exp.position, key: exp.name });
    }
  });

  // Search ART
  ART.forEach(art => {
    if (art.title.toLowerCase().includes(query)) {
      matches.push({ title: art.title === 'P' ? 'Studio Painting' : art.title, sub: 'Art Piece', isArt: true, item: art });
    }
  });

  if (matches.length === 0) {
    resultsContainer.innerHTML = '<p style="color:#94a3b8; font-size:0.85rem; text-align:center; padding:12px;">No matching items found</p>';
    return;
  }

  resultsContainer.innerHTML = '';
  matches.forEach(m => {
    const row = document.createElement('div');
    row.className = 'search-item';
    row.onclick = () => {
      closeDrawer('searchDrawer');
      if (m.isArt) {
        openArtModal(m.item);
      } else {
        openDetailModal(m.key);
      }
    };

    row.innerHTML = `
      <div>
        <div class="search-item-title">${m.title}</div>
        <div class="search-item-sub">${m.sub}</div>
      </div>
      <i class="fa-solid fa-chevron-right" style="font-size:0.8rem; opacity:0.5;"></i>
    `;
    resultsContainer.appendChild(row);
  });
}

// ---------- Notifications Popover Handler ----------
function renderNotifications() {
  const container = document.getElementById('notifList');
  if (!container) return;

  if (notifications.length === 0) {
    container.innerHTML = '<p style="font-size:0.8rem; color:#94a3b8; text-align:center;">All caught up!</p>';
    return;
  }

  container.innerHTML = '';
  notifications.forEach(n => {
    const item = document.createElement('div');
    item.className = 'notif-item';
    item.innerHTML = `
      <div class="notif-title">${n.title}</div>
      <div class="notif-time">${n.time}</div>
    `;
    container.appendChild(item);
  });
}

function clearNotifications() {
  notifications = [];
  renderNotifications();
  const badge = document.querySelector('.badge-dot');
  if (badge) badge.style.display = 'none';
}

// ---------- Settings & Palette Customizer ----------
function setAppTheme(colorHex, name) {
  document.documentElement.style.setProperty('--bg-current', colorHex);

  document.querySelectorAll('.palette-swatch').forEach(s => {
    s.classList.toggle('active', s.getAttribute('data-color') === colorHex);
  });
}

// ---------- Drawer Helpers ----------
function openDrawer(id) {
  const drawer = document.getElementById(id);
  if (drawer) drawer.classList.add('active');
}

function closeDrawer(id) {
  const drawer = document.getElementById(id);
  if (drawer) drawer.classList.remove('active');
}

// ---------- Navigation Handler ----------
function navigateTo(view) {
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

  if (view === 'home') {
    document.getElementById('navHome').classList.add('active');
    document.getElementById('headerTitle').innerText = 'Home';
    switchCard('sage');
  } else if (view === 'feed') {
    document.getElementById('navFeed').classList.add('active');
    document.getElementById('headerTitle').innerText = 'Activity Feed';
    switchCard('pink');
  } else if (view === 'saved') {
    document.getElementById('navSaved').classList.add('active');
    document.getElementById('headerTitle').innerText = 'Bookmarks';
    switchCard('lavender');
  } else if (view === 'profile') {
    document.getElementById('navProfile').classList.add('active');
    document.getElementById('headerTitle').innerText = 'Profile & Bio';
    openDetailModal('dojo');
  }
}

// ---------- Event Listeners Setup ----------
function setupEventListeners() {
  // Comments Toggle
  document.getElementById('commentsOpenBtn').addEventListener('click', () => openDrawer('commentsDrawer'));
  document.getElementById('closeCommentsBtn').addEventListener('click', () => closeDrawer('commentsDrawer'));
  document.getElementById('commentForm').addEventListener('submit', handleCommentSubmit);

  // Create Toggle
  document.getElementById('createBtn').addEventListener('click', () => openDrawer('createDrawer'));
  document.getElementById('centerActionBtn').addEventListener('click', () => openDrawer('createDrawer'));
  document.getElementById('closeCreateBtn').addEventListener('click', () => closeDrawer('createDrawer'));
  document.getElementById('createForm').addEventListener('submit', handleCreateSubmit);

  // Search Toggle
  document.getElementById('searchBtn').addEventListener('click', () => {
    openDrawer('searchDrawer');
    document.getElementById('searchInput').focus();
  });
  document.getElementById('closeSearchBtn').addEventListener('click', () => closeDrawer('searchDrawer'));
  document.getElementById('searchInput').addEventListener('input', handleSearchInput);

  // Notifications Toggle
  document.getElementById('notifBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    const panel = document.getElementById('notifPanel');
    panel.classList.toggle('active');
  });

  document.getElementById('clearNotifBtn').addEventListener('click', clearNotifications);

  document.addEventListener('click', (e) => {
    const panel = document.getElementById('notifPanel');
    const notifBtn = document.getElementById('notifBtn');
    if (panel && !panel.contains(e.target) && !notifBtn.contains(e.target)) {
      panel.classList.remove('active');
    }
  });

  // Settings & Theme
  document.getElementById('settingsToggleBtn').addEventListener('click', () => openDrawer('settingsDrawer'));
  document.getElementById('closeSettingsBtn').addEventListener('click', () => closeDrawer('settingsDrawer'));

  const taglineInput = document.getElementById('taglineInput');
  if (taglineInput) {
    taglineInput.addEventListener('input', (e) => {
      document.getElementById('heroSubtext').innerText = e.target.value || 'Work hard, play hard';
    });
  }

  // Back Button reset
  document.getElementById('backBtn').addEventListener('click', () => {
    navigateTo('home');
    document.querySelectorAll('.drawer-overlay').forEach(d => d.classList.remove('active'));
  });

  // Art Gallery button
  document.getElementById('artGalleryBtn').addEventListener('click', () => {
    switchCard('sage');
  });

  // Detail Modal Close
  document.getElementById('closeDetailBtn').addEventListener('click', () => closeDrawer('detailDrawer'));

  // Close drawers when clicking background overlay
  document.querySelectorAll('.drawer-overlay').forEach(drawer => {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        drawer.classList.remove('active');
      }
    });
  });
}
