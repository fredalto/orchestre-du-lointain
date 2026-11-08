const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');

const menuContent = [...document.querySelectorAll('main, .site-footer')];
function setMenuOpen(open) {
  if (!toggle || !nav) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  nav.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  menuContent.forEach(element => { element.inert = open; });
}
toggle?.addEventListener('click', () => setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true'));
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
matchMedia('(min-width: 981px)').addEventListener('change', event => { if (event.matches) setMenuOpen(false); });

const current = document.body.dataset.page;
const currentLink = document.querySelector(`[data-nav="${current}"]`);
currentLink?.classList.add('active');
currentLink?.setAttribute('aria-current', 'page');

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
// Un lien direct vers une ancienne date ouvre aussi son année d’archives.
function revealHash() {
  let target;
  try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { return; }
  if (!target) return;
  let parent = target.parentElement;
  let opened = false;
  while (parent) {
    if (parent.tagName === 'DETAILS' && !parent.open) { parent.open = true; opened = true; }
    parent = parent.parentElement;
  }
  if (opened) target.scrollIntoView({block:'start', behavior:'instant'});
}
revealHash();
addEventListener('hashchange', revealHash);
addEventListener('pageshow', revealHash);
addEventListener('keydown', event => {
  if (!nav?.classList.contains('open')) return;
  if (event.key === 'Escape') {
    setMenuOpen(false);
    toggle.focus();
  } else if (event.key === 'Tab') {
    const controls = [toggle, ...nav.querySelectorAll('a')];
    const index = controls.indexOf(document.activeElement);
    if (event.shiftKey && index <= 0) {
      event.preventDefault(); controls.at(-1).focus();
    } else if (!event.shiftKey && (index < 0 || index === controls.length - 1)) {
      event.preventDefault(); toggle.focus();
    }
  }
});

document.querySelectorAll('.hero-events').forEach((ticker) => {
  const items = [...ticker.querySelectorAll('[data-hero-event]')];
  let currentEvent = 0;
  let eventRotation;

  const showEvent = (index) => {
    currentEvent = (index + items.length) % items.length;
    items.forEach((item, itemIndex) => {
      const active = itemIndex === currentEvent;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-hidden', String(!active));
      item.tabIndex = active ? 0 : -1;
    });
  };

  const stopEventRotation = () => clearInterval(eventRotation);
  const startEventRotation = () => {
    if (reduceMotion || items.length < 2) return;
    stopEventRotation();
    eventRotation = setInterval(() => showEvent(currentEvent + 1), 4500);
  };

  ticker.addEventListener('mouseenter', stopEventRotation);
  ticker.addEventListener('mouseleave', startEventRotation);
  ticker.addEventListener('focusin', stopEventRotation);
  ticker.addEventListener('focusout', startEventRotation);
  document.addEventListener('visibilitychange', () => document.hidden ? stopEventRotation() : startEventRotation());

  showEvent(0);
  startEventRotation();
});

// Galerie accessible : fermeture avec Échap, navigation avec les flèches.
const photoViewer = document.querySelector('.photo-viewer');
const galleryLinks = [...document.querySelectorAll('[data-gallery-photo]')];
if (photoViewer && typeof photoViewer.showModal === 'function') {
  let photoIndex = 0;
  let photoOpener;
  const image = photoViewer.querySelector('.photo-large');
  const caption = photoViewer.querySelector('.photo-caption');
  const showPhoto = index => {
    photoIndex = (index + galleryLinks.length) % galleryLinks.length;
    const link = galleryLinks[photoIndex];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    caption.textContent = link.dataset.caption || image.alt;
    photoViewer.querySelector('.photo-count').textContent = `${photoIndex + 1} / ${galleryLinks.length}`;
  };
  galleryLinks.forEach((link, index) => link.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    photoOpener = link;
    showPhoto(index);
    photoViewer.showModal();
    document.body.classList.add('photo-open');
  }));
  photoViewer.querySelector('.photo-close').addEventListener('click', () => photoViewer.close());
  photoViewer.querySelector('.photo-prev').addEventListener('click', () => showPhoto(photoIndex - 1));
  photoViewer.querySelector('.photo-next').addEventListener('click', () => showPhoto(photoIndex + 1));
  photoViewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      showPhoto(photoIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  photoViewer.addEventListener('click', event => { if (event.target === photoViewer) photoViewer.close(); });
  photoViewer.addEventListener('close', () => {
    document.body.classList.remove('photo-open');
    photoOpener?.focus();
  });
}
