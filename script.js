// Mobil navigáció (hamburger)
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

// Flip cards on "Érdekességek" page
document.querySelectorAll('.fact-card').forEach(card => {
  // set button-like semantics
  card.setAttribute('role', 'button');
  card.setAttribute('aria-pressed', 'false');

  function flip(force) {
    const willFlip = typeof force === 'boolean' ? force : !card.classList.contains('flipped');
    card.classList.toggle('flipped', willFlip);
    card.setAttribute('aria-pressed', String(willFlip));
  }

  card.addEventListener('click', (e) => {
    e.preventDefault();
    flip();
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flip();
    }
  });
});
}

// Aktív menüpont kijelölése
(function highlightActiveNav(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
})();

// Reveal animáció jelenetfigyelővel
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Collapsible works: click-only toggle
document.querySelectorAll('.work-toggle').forEach(btn => {
  const item = btn.closest('.work-item');
  const controlsId = btn.getAttribute('aria-controls');
  const details = controlsId ? document.getElementById(controlsId) : null;

  function toggle(open) {
    const willOpen = typeof open === 'boolean' ? open : !item.classList.contains('open');
    item.classList.toggle('open', willOpen);
    btn.setAttribute('aria-expanded', String(willOpen));
    if (details) details.hidden = !willOpen;
  }

  // Initialize hidden state for a11y
  if (details && !item.classList.contains('open')) {
    details.hidden = true;
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle();
  });

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
});
