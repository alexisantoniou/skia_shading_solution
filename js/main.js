// Skia Shading Solutions: small, dependency-free scripts.

// ---------- Mobile menu ----------
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");

const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
};

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("is-open", !isOpen);
});

// Close the menu after tapping a link, or pressing Escape
nav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// Tapping anywhere outside the header also closes the menu
document.addEventListener("click", (e) => {
  if (!header.contains(e.target)) closeMenu();
});

// ---------- Highlight the nav link for the section you're reading ----------
const navLinks = [...nav.querySelectorAll("ul a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

// A section counts as "current" while it crosses a line ~35% down the screen
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const here = link.getAttribute("href") === `#${entry.target.id}`;
        if (here) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  },
  { rootMargin: "-35% 0px -60% 0px" },
);
sections.forEach((section) => spy.observe(section));

// ---------- Header border once you scroll ----------
const header = document.querySelector(".site-header");
const onScroll = () =>
  header.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- "Where do you need shade?" tabs ----------
const tabs = [...document.querySelectorAll('[role="tab"]')];

const selectTab = (tab) => {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute("aria-selected", String(selected));
    t.tabIndex = selected ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
  });
};

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    selectTab(tab);
    // On phones the panel sits below the tabs: bring it into view if it's off screen
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    if (panel.getBoundingClientRect().top > window.innerHeight * 0.7) {
      const calm = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      panel.scrollIntoView({
        behavior: calm ? "auto" : "smooth",
        block: "start",
      });
    }
  });

  // Arrow keys move between tabs (standard tab pattern)
  tab.addEventListener("keydown", (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = tabs[(i + keys[e.key] + tabs.length) % tabs.length];
    selectTab(next);
    next.focus();
  });
});

// ---------- "Ask about this" buttons pre-fill the form ----------
const productSelect = document.querySelector("#f-product");
document.querySelectorAll("[data-product]").forEach((btn) => {
  btn.addEventListener("click", () => {
    productSelect.value = btn.dataset.product;
  });
});

// ---------- Quote form → WhatsApp ----------
// No server needed: we build the message and open WhatsApp with it.
const form = document.querySelector("#quote-form");
const nameInput = document.querySelector("#f-name");
const nameError = document.querySelector("#f-name-error");

const showNameError = (show) => {
  nameError.hidden = !show;
  if (show) {
    nameInput.setAttribute("aria-invalid", "true");
    nameInput.setAttribute("aria-describedby", "f-name-error");
  } else {
    nameInput.removeAttribute("aria-invalid");
    nameInput.removeAttribute("aria-describedby");
  }
};

nameInput.addEventListener("input", () => {
  if (nameInput.value.trim()) showNameError(false);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get("name").trim();

  if (!name) {
    showNameError(true);
    nameInput.focus();
    return;
  }

  // t() gives the Greek wording when the visitor has switched the page to Greek
  const { t } = window.skiaI18n;
  const lines = [
    t(`Hi Skia, I'd like a quote.`),
    `${t("Name:")} ${name}`,
    data.get("area").trim() && `${t("Area:")} ${data.get("area").trim()}`,
    `${t("Interested in:")} ${t(data.get("product"))}`,
    data.get("message").trim() &&
      `${t("About the space:")} ${data.get("message").trim()}`,
  ].filter(Boolean);

  const url = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener");
});

// ---------- Scroll reveal ----------
// Things below the fold start slightly low and transparent, then ease into
// place when they scroll into view. Each one is revealed only once.
// Skipped completely when the visitor prefers reduced motion.
const calmMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!calmMotion && "IntersectionObserver" in window) {
  const revealTargets = [
    ".section-head",
    ".chooser",
    ".glow-text",
    ".steps li", // the four steps appear one after another
    ".area-media",
    ".area-text",
    ".quote-intro",
    ".quote-form",
  ];

  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        reveal.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  document.querySelectorAll(revealTargets.join(",")).forEach((el) => {
    // Already on screen when the page loads (e.g. a reload halfway down)? Leave it alone.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    // Stagger the steps: 0s, 0.12s, 0.24s, 0.36s
    if (el.matches(".steps li")) {
      const index = [...el.parentElement.children].indexOf(el);
      el.style.setProperty("--delay", `${index * 0.12}s`);
    }
    el.classList.add("reveal");
    reveal.observe(el);
  });
}

// ---------- Day to night scene ----------
// One number, `night` (0 = afternoon, 1 = evening), is written to the CSS
// variable --night. The CSS decides what each part of the scene does with it.
const glow = document.querySelector('#glow');
if (glow) {
  const scene = glow.querySelector('.dn-scene');
  const range = glow.querySelector('#dn-range');
  const toggle = glow.querySelector('.dn-toggle');
  const controls = glow.querySelector('.dn-controls');
  const { t } = window.skiaI18n;
  let night = 0;
  let frame = null;      // the running animation, if any
  let touched = false;   // true once the visitor uses the controls themselves

  const setNight = (value) => {
    night = Math.min(1, Math.max(0, value));
    scene.style.setProperty('--night', night.toFixed(3));
    range.value = Math.round(night * 100);
    glow.dataset.state = night >= 0.5 ? 'night' : 'day';
    // Screen readers announce this instead of a bare number like "37"
    range.setAttribute(
      'aria-valuetext',
      t(night < 0.35 ? 'Daylight' : night < 0.6 ? 'Sunset' : 'Evening, lights on')
    );
  };

  const stop = () => { if (frame) cancelAnimationFrame(frame); frame = null; };

  // Glide from the current time of day to `target` (ease in and out)
  const animateTo = (target, ms) => {
    stop();
    if (calmMotion) { setNight(target); return; }   // reduced motion: jump, no glide
    const from = night;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / ms);
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setNight(from + (target - from) * eased);
      frame = p < 1 ? requestAnimationFrame(tick) : null;
    };
    frame = requestAnimationFrame(tick);
  };

  controls.hidden = false;   // the controls only make sense with JavaScript
  setNight(0);

  range.addEventListener('input', () => { touched = true; stop(); setNight(range.value / 100); });
  toggle.addEventListener('click', () => { touched = true; animateTo(night < 0.5 ? 1 : 0, 2200); });

  // First time the scene is mostly on screen: play the evening once, as a demo
  if (!calmMotion && 'IntersectionObserver' in window) {
    const watcher = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      watcher.disconnect();
      setTimeout(() => { if (!touched) animateTo(1, 4200); }, 700);
    }, { threshold: 0.6 });
    watcher.observe(scene);
  }
}

// ---------- Footer year ----------
document.querySelector("#year").textContent = new Date().getFullYear();
