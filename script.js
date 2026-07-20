/* ============================================================
   DUAL BOOT & LINUX — script.js
   ============================================================ */

// ── Dark mode ──────────────────────────────────────────────────
const THEME_KEY = 'dbl-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const toggleBtn = document.getElementById('darkToggle');
  const label = document.querySelector('.toggle-dark__label');
  if (label) label.textContent = theme === 'dark' ? '☀' : '🌙';
  if (toggleBtn) {
    const action = theme === 'dark' ? 'light' : 'dark';
    toggleBtn.setAttribute('aria-label', `Switch to ${action} mode`);
    toggleBtn.setAttribute('title', `Switch to ${action} mode`);
  }
}

function withThemeTransition() {
  document.documentElement.classList.add('theme-transition');
  window.setTimeout(() => {
    document.documentElement.classList.remove('theme-transition');
  }, 260);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(saved || preferred);
}

function toggleTheme() {
  withThemeTransition();
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ── Navbar scroll behavior ───────────────────────────────────
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastY = window.scrollY;

  function handleScroll() {
    const currentY = window.scrollY;
    const isMobile = window.innerWidth <= 860;

    navbar.classList.toggle('navbar--scrolled', currentY > 24);

    // Keep navbar visible while at top, on mobile, or while mobile menu is open.
    if (currentY < 12 || isMobile || document.body.classList.contains('nav-open')) {
      navbar.classList.remove('navbar--hidden');
      lastY = currentY;
      return;
    }

    if (currentY > lastY + 3 && currentY > 110) {
      navbar.classList.add('navbar--hidden');
    } else if (currentY < lastY - 3) {
      navbar.classList.remove('navbar--hidden');
    }

    lastY = currentY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll);
  handleScroll();
}

// ── Mobile navigation ────────────────────────────────────────
function initMobileNav() {
  const body = document.body;
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle');
  const nav = document.querySelector('.navbar__nav');
  const overlay = document.querySelector('.navbar__overlay');

  if (!toggle || !nav) return;

  function setOpen(isOpen) {
    body.classList.toggle('nav-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen && navbar) {
      navbar.classList.remove('navbar--hidden');
    }
  }

  toggle.addEventListener('click', () => {
    setOpen(!body.classList.contains('nav-open'));
  });

  if (overlay) {
    overlay.addEventListener('click', () => setOpen(false));
  }

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (event) => {
      const isMobileViewport = window.innerWidth <= 860;

      if (isMobileViewport) {
        event.preventDefault();
        setOpen(false);
        window.open(link.href, '_blank', 'noopener');
        return;
      }

      setOpen(false);
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) {
      setOpen(false);
    }
  });
}

// ── Active nav link ────────────────────────────────────────────
function setActiveLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initLightbox() {
  const triggers = document.querySelectorAll('.lightbox-trigger[data-lightbox-target]');
  if (!triggers.length) return;

  triggers.forEach(trigger => {
    const targetId = trigger.getAttribute('data-lightbox-target');
    const lightbox = document.getElementById(targetId);
    if (!lightbox) return;

    const closeBtn = lightbox.querySelector('.lightbox__close');

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    };

    const openLightbox = () => {
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
    };

    trigger.addEventListener('click', openLightbox);

    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  });
}

// ── Clipboard copy for command chips ─────────────────────────
function initClipboardCopy() {
  const buttons = document.querySelectorAll('[data-copy]');
  if (!buttons.length) return;

  let toast = document.getElementById('copyToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'copyToast';
    toast.className = 'copy-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  let hideTimer;
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => toast.classList.remove('show'), 1600);
  };

  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const text = button.getAttribute('data-copy') || button.textContent.trim();

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const temp = document.createElement('textarea');
          temp.value = text;
          temp.setAttribute('readonly', '');
          temp.style.position = 'fixed';
          temp.style.left = '-9999px';
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
        }

        showToast('Copied to clipboard');
      } catch (error) {
        showToast('Copy failed');
      }
    });
  });
}

// ── Command search ──────────────────────────────────────────
function initCommandSearch() {
  const searchInput = document.getElementById('cmdSearch');
  const cards = document.querySelectorAll('.cmd-card');
  if (!searchInput || !cards.length) return;

  const noResults = document.createElement('p');
  noResults.className = 'cmd-no-results';
  noResults.textContent = 'No matching commands found. Try a broader keyword.';
  noResults.hidden = true;
  searchInput.closest('.cmd-toolbar').insertAdjacentElement('afterend', noResults);

  const applyFilter = () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCards = 0;

    cards.forEach((card) => {
      const chips = card.querySelectorAll('.cmd-chip');
      let visibleChips = 0;

      chips.forEach((chip) => {
        const text = (chip.getAttribute('data-copy') || chip.textContent).toLowerCase();
        const isMatch = !query || text.includes(query);
        chip.classList.toggle('is-hidden', !isMatch);
        if (isMatch) visibleChips += 1;
      });

      const shouldShow = visibleChips > 0;
      card.classList.toggle('is-hidden', !shouldShow);
      if (shouldShow) visibleCards += 1;
    });

    noResults.hidden = visibleCards > 0;
  };

  searchInput.addEventListener('input', applyFilter);
  applyFilter();
}

function initCommandDetails() {
  const detailPanel = document.getElementById('cmdDetailPanel');
  if (!detailPanel) return;

  const categoryLabel = detailPanel.querySelector('.cmd-detail__category');
  const title = detailPanel.querySelector('.cmd-detail__title');
  const desc = detailPanel.querySelector('.cmd-detail__desc');
  const syntax = detailPanel.querySelector('.cmd-detail__syntax');
  const example = detailPanel.querySelector('.cmd-detail__example');
  const output = detailPanel.querySelector('.cmd-detail__output');
  const closeButton = detailPanel.querySelector('.cmd-detail__close');
  const chips = document.querySelectorAll('.cmd-chip');

  const updatePanel = (button) => {
    const command = button.getAttribute('data-copy') || button.textContent.trim();
    const label = button.querySelector('small')?.textContent.trim() || '';
    const card = button.closest('.cmd-card');
    const section = card ? card.querySelector('h2')?.textContent.trim() : 'Command';

    categoryLabel.textContent = section;
    title.textContent = command;
    desc.textContent = label ? `${label.charAt(0).toUpperCase()}${label.slice(1)}.` : `Show details for ${command}.`;
    syntax.textContent = command;
    example.textContent = command;
    output.textContent = label ? `Expected output: ${label.toLowerCase()}.` : 'Output depends on your terminal and system configuration.';
    detailPanel.hidden = false;
    detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  chips.forEach(button => {
    button.addEventListener('click', () => updatePanel(button));
  });

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      detailPanel.hidden = true;
    });
  }
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbarScroll();
  initMobileNav();

  // Dark mode toggle
  const toggleBtn = document.getElementById('darkToggle');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);

  setActiveLink();
  initLightbox();
  initClipboardCopy();
  initCommandSearch();
  initCommandDetails();
});
