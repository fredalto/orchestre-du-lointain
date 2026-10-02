const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');

addEventListener('scroll', () => header?.classList.toggle('scrolled', scrollY > 24), { passive: true });

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open');
  document.body.classList.toggle('menu-open');
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const current = document.body.dataset.page;
document.querySelector(`[data-nav="${current}"]`)?.classList.add('active');

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: .08 });

document.querySelectorAll('main .container > section, .program, .press-item, .support-panel').forEach((element) => {
  element.classList.add('reveal');
});
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('a[href]').forEach((link) => link.addEventListener('click', (event) => {
  if (reduceMotion || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank' || link.hasAttribute('download')) return;
  const destination = new URL(link.href, location.href);
  if (destination.origin !== location.origin || !destination.pathname.endsWith('.html') || destination.href === location.href) return;
  event.preventDefault();
  document.body.classList.add('page-leaving');
  setTimeout(() => { location.href = destination.href; }, 180);
}));

addEventListener('pageshow', () => document.body.classList.remove('page-leaving'));

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

document.querySelectorAll('.year-filter button').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.year-filter button').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.events article').forEach((event) => {
    event.classList.toggle('hidden', filter !== 'all' && event.dataset.year !== filter);
  });
}));
