// Skia Shading Solutions: small, dependency-free scripts.

// ---------- Mobile menu ----------
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
};

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('is-open', !isOpen);
});

// Close the menu after tapping a link, or pressing Escape
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

// Tapping anywhere outside the header also closes the menu
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) closeMenu();
});

// ---------- Highlight the nav link for the section you're reading ----------
const navLinks = [...nav.querySelectorAll('ul a')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

// A section counts as "current" while it crosses a line ~35% down the screen
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const here = link.getAttribute('href') === `#${entry.target.id}`;
        if (here) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  },
  { rootMargin: '-35% 0px -60% 0px' }
);
sections.forEach((section) => spy.observe(section));

// ---------- Header border once you scroll ----------
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- "Where do you need shade?" tabs ----------
const tabs = [...document.querySelectorAll('[role="tab"]')];

const selectTab = (tab) => {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute('aria-selected', String(selected));
    t.tabIndex = selected ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
  });
};

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => {
    selectTab(tab);
    // On phones the panel sits below the tabs: bring it into view if it's off screen
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    if (panel.getBoundingClientRect().top > window.innerHeight * 0.7) {
      const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      panel.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
    }
  });

  // Arrow keys move between tabs (standard tab pattern)
  tab.addEventListener('keydown', (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = tabs[(i + keys[e.key] + tabs.length) % tabs.length];
    selectTab(next);
    next.focus();
  });
});

// ---------- "Ask about this" buttons pre-fill the form ----------
const productSelect = document.querySelector('#f-product');
document.querySelectorAll('[data-product]').forEach((btn) => {
  btn.addEventListener('click', () => {
    productSelect.value = btn.dataset.product;
  });
});

// ---------- Quote form → WhatsApp ----------
// No server needed: we build the message and open WhatsApp with it.
const form = document.querySelector('#quote-form');
const nameInput = document.querySelector('#f-name');
const nameError = document.querySelector('#f-name-error');

const showNameError = (show) => {
  nameError.hidden = !show;
  if (show) {
    nameInput.setAttribute('aria-invalid', 'true');
    nameInput.setAttribute('aria-describedby', 'f-name-error');
  } else {
    nameInput.removeAttribute('aria-invalid');
    nameInput.removeAttribute('aria-describedby');
  }
};

nameInput.addEventListener('input', () => {
  if (nameInput.value.trim()) showNameError(false);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name').trim();

  if (!name) {
    showNameError(true);
    nameInput.focus();
    return;
  }

  // t() gives the Greek wording when the visitor has switched the page to Greek
  const { t } = window.skiaI18n;
  const lines = [
    t(`Hi Skia, I'd like a quote.`),
    `${t('Name:')} ${name}`,
    data.get('area').trim() && `${t('Area:')} ${data.get('area').trim()}`,
    `${t('Interested in:')} ${t(data.get('product'))}`,
    data.get('message').trim() && `${t('About the space:')} ${data.get('message').trim()}`,
  ].filter(Boolean);

  const url = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener');
});

// ---------- Footer year ----------
document.querySelector('#year').textContent = new Date().getFullYear();
