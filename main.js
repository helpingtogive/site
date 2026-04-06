// ─── NAV PATH HELPER ───────────────────────────────────
function getRoot() {
  // detect if we're in a subfolder
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  // on GitHub Pages: /repo/about/ → depth=2, root = ../../
  // But we use relative paths based on location
  return '';
}

// ─── ACTIVE NAV LINK ───────────────────────────────────
function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    // normalize
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '');
    const currentPath = path.replace(/\/$/, '');
    if (linkPath === currentPath || (currentPath === '' && linkPath.endsWith('index'))) {
      link.classList.add('active');
    }
  });
}

// ─── BURGER / DRAWER ───────────────────────────────────
function initNav() {
  const burger = document.getElementById('burger');
  const overlay = document.getElementById('navOverlay');
  const drawer = document.getElementById('navDrawer');
  const closeBtn = document.getElementById('navClose');

  function open() {
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (burger) burger.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (overlay) overlay.addEventListener('click', close);
}

// ─── MODAL ─────────────────────────────────────────────
function initModal() {
  const trigger = document.getElementById('ctaBtn');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const form = document.getElementById('ctaForm');

  function open() {
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (trigger) trigger.addEventListener('click', open);
  if (modalClose) modalClose.addEventListener('click', close);
  if (modalOverlay) modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) close();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.modal-submit');
      btn.textContent = 'Sent ✓';
      btn.style.background = '#16A34A';
      setTimeout(() => { close(); btn.textContent = 'Send'; btn.style.background = ''; }, 2000);
    });
  }
}

// ─── INIT ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initModal();
  setActiveNavLink();
});
