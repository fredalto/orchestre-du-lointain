/* Source unique des concerts. Ajouter les nouvelles dates à cette liste.
Sans heure de fin, archivage le lendemain à l’heure de Paris. finished: true permet un archivage manuel. */
(function (root) {
'use strict';
const concerts = [
  {
    "id": "carnet-de-bal-bonningues",
    "date": "2026-12-05",
    "time": "18h30",
    "end": "2026-12-05T20:00:00+01:00",
    "title": "Carnet de bal",
    "venue": "Médiathèque La Rose des Vents",
    "city": "Bonningues-lès-Calais",
    "address": "3 allée de l’espace Futurum",
    "url": "https://mediatheques.grandcalais.fr/Default/doc/CALENDAR/812/carnet-de-bal",
    "action": "Réserver",
    "note": "Tout public · Inscriptions sur le site des médiathèques."
  },
  {
    "id": "harmonies-du-monde",
    "date": "2026-11-08",
    "time": "15h",
    "title": "Les Harmonies du monde",
    "venue": "Église Notre-Dame, Calais",
    "city": "",
    "finished": true
  },
  {
    "id": "carnet-de-bal-les-attaques",
    "date": "2026-10-16",
    "time": "20h",
    "title": "CARNET DE BAL",
    "venue": "Salle de sport des Attaques",
    "city": "",
    "photos": "media.html#les-attaques-2026"
  },
  {
    "id": "concert-2026-03-17-2",
    "date": "2026-03-17",
    "time": "20h00",
    "title": "PETRA WOLK DANS LE LOINTAIN",
    "venue": "Grand Théâtre de Calais",
    "city": ""
  },
  {
    "id": "concert-2025-11-21-3",
    "date": "2025-11-21",
    "time": "19h30",
    "title": "CARNET DE BAL",
    "venue": "Salle Crinon Oye-Plage",
    "city": ""
  },
  {
    "id": "concert-2025-05-18-4",
    "date": "2025-05-18",
    "time": "14h00",
    "title": "CARNET DE BAL",
    "venue": "Le Channel, scène nationale de Calais",
    "city": ""
  },
  {
    "id": "concert-2025-05-17-5",
    "date": "2025-05-17",
    "time": "14h00",
    "title": "CARNET DE BAL",
    "venue": "Le Channel, scène nationale de Calais",
    "city": ""
  },
  {
    "id": "concert-2025-03-28-6",
    "date": "2025-03-28",
    "time": "20h00",
    "title": "CARNET DE BAL",
    "venue": "Salle des fêtes - Hardinghen",
    "city": ""
  },
  {
    "id": "concert-2025-01-12-7",
    "date": "2025-01-12",
    "time": "17h00",
    "title": "CARNET DE BAL",
    "venue": "La confiserie - WIMILLE",
    "city": ""
  },
  {
    "id": "concert-2024-10-20-8",
    "date": "2024-10-20",
    "time": "16h00",
    "title": "PETRA WOLK DANS LE LOINTAIN",
    "venue": "Château d'Hardelot - CONDETTE",
    "city": ""
  },
  {
    "id": "concert-2024-05-26-9",
    "date": "2024-05-26",
    "time": "16h00",
    "title": "REQUIEM, Gabriel FAURE par La Chorale Saint-Joseph et l'Orchestre Du Lointain",
    "venue": "Église Saint-Joseph - CALAIS",
    "city": ""
  },
  {
    "id": "concert-2024-02-25-10",
    "date": "2024-02-25",
    "time": "17h30",
    "title": "PETRA WOLK DANS LE LOINTAIN",
    "venue": "Le Channel, scène nationale de Calais",
    "city": ""
  },
  {
    "id": "concert-2024-01-12-11",
    "date": "2024-01-12",
    "time": "20h30",
    "title": "PETRA WOLK DANS LE LOINTAIN",
    "venue": "Salle culturelle et sportive CALPOOLCO - Marquise",
    "city": ""
  },
  {
    "id": "concert-2023-12-15-12",
    "date": "2023-12-15",
    "time": "20h00",
    "title": "MOZART/BEETHOVEN Soliste : Pierre-Yves HODIQUE-Piano",
    "venue": "Grand théâtre - CALAIS",
    "city": ""
  },
  {
    "id": "concert-2023-11-14-13",
    "date": "2023-11-14",
    "time": "20h",
    "title": "BEETHOVEN/PÄRT Soliste : Amaryllis BILLET-Violon",
    "venue": "SAINT-FOLQUIN Salle des fêtes",
    "city": ""
  },
  {
    "id": "concert-2023-03-07-14",
    "date": "2023-03-07",
    "time": "20h30",
    "title": "PETRA WOLK DANS LE LOINTAIN",
    "venue": "LUMBRES Salle Léo Lagrange",
    "city": ""
  },
  {
    "id": "concert-2022-12-15-15",
    "date": "2022-12-15",
    "time": "",
    "title": "PETRA WOLK DANS LE LOINTAIN (Scolaires)",
    "venue": "AREA Aire sur la Lys",
    "city": ""
  },
  {
    "id": "concert-2022-12-14-16",
    "date": "2022-12-14",
    "time": "15h30",
    "title": "PETRA WOLK DANS LE LOINTAIN",
    "venue": "AREA Aire sur la Lys",
    "city": ""
  },
  {
    "id": "concert-2022-11-13-17",
    "date": "2022-11-13",
    "time": "15h00",
    "title": "Les rêves de Notre Dame",
    "venue": "Église Notre Dame de Calais",
    "city": ""
  },
  {
    "id": "concert-2022-10-21-18",
    "date": "2022-10-21",
    "time": "20h00",
    "title": "PETRA WOLK DANS LE LOINTAIN",
    "venue": "Salle des fêtes de Guînes",
    "city": ""
  },
  {
    "id": "concert-2022-05-05-19",
    "date": "2022-05-05",
    "time": "20h00",
    "title": "PETRA WOLK DANS LE LOINTAIN",
    "venue": "Salle des fêtes de Zutkerque",
    "city": ""
  },
  {
    "id": "concert-2021-06-12-20",
    "date": "2021-06-12",
    "time": "19h00",
    "title": "« Acoustiques, nombreux et tellement heureux ! »",
    "venue": "Le Channel, scène nationale de Calais",
    "city": ""
  }
];
const escape = value => String(value || '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function parisDay(now) {
  const parts = new Intl.DateTimeFormat('fr-FR', {timeZone:'Europe/Paris', year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const get = type => parts.find(part => part.type === type).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}
function splitConcerts(now = new Date()) {
  const isPast = e => e.finished || (e.end ? new Date(e.end).getTime() <= now.getTime() : e.date < parisDay(now));
  return {
    upcoming: concerts.filter(e => !isPast(e)).sort((a,b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)),
    past: concerts.filter(isPast).sort((a,b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time))
  };
}
function dateLabel(e) {
  return new Intl.DateTimeFormat('fr-FR', {day:'numeric',month:'long',timeZone:'Europe/Paris'}).format(new Date(e.date+'T12:00:00Z'));
}
const year = e => e.date.slice(0,4);
function hero(e) {
  if (!e) return '<p class="hero-no-event">Les prochaines dates seront annoncées ici.</p>';
  return `<a class="hero-event is-active" data-hero-event href="calendrier.html#${escape(e.id)}"><time datetime="${e.date}"><span>${dateLabel(e)} ${year(e)}</span><strong>${escape(e.time)}</strong></time><span class="hero-event-title">${escape(e.title)}</span><span class="hero-event-city">${escape(e.city || e.venue)}</span><span class="hero-event-cta">Infos et réservation →</span></a>`;
}
function home(e) {
  return `<a class="home-event" href="${escape(e.url || 'calendrier.html#'+e.id)}"${e.url?' target="_blank" rel="noopener"':''}><time datetime="${e.date}"><strong>${e.date.slice(8)}</strong><span>${dateLabel(e).split(' ').slice(1).join(' ')}<br>${year(e)} · ${escape(e.time)}</span></time><h2>${escape(e.title)}</h2><p>${escape(e.venue)}</p><p>${escape(e.city)}</p>${e.address?`<p>${escape(e.address)}</p>`:''}${e.note?`<small>${escape(e.note)}</small>`:''}<span class="home-event-link">${e.url?'Infos et réservation':'Voir les détails'}</span></a>`;
}
function upcoming(e) {
  return `<a class="upcoming-event" id="${escape(e.id)}" href="${escape(e.url || 'mailto:contact@orchestredulointain.com')}"${e.url?' target="_blank" rel="noopener"':''}><time datetime="${e.date}"><b>${dateLabel(e)}</b><span>${year(e)}${e.time?' · '+escape(e.time):''}</span></time><div><h3>${escape(e.title)}</h3><p>${escape([e.venue,e.city].filter(Boolean).join(' · '))}</p>${e.address?`<p>${escape(e.address)}</p>`:''}${e.note?`<p class="event-note">${escape(e.note)}</p>`:''}</div><span class="event-action">${escape(e.action || 'Nous contacter')}</span></a>`;
}
function past(e) {
  return `<article id="${escape(e.id)}"><time datetime="${e.date}"><b>${dateLabel(e)}</b><span>${year(e)}${e.time?' · '+escape(e.time):''}</span></time><div><h2>${escape(e.title)}</h2><p>${escape([e.venue,e.city].filter(Boolean).join(' · '))}</p>${e.photos?`<a class="home-event-link" href="${escape(e.photos)}">Retour en images</a>`:''}</div><span class="tag">${year(e)}</span></article>`;
}
function sections(now) {
  const lists = splitConcerts(now);
  return {
    hero: hero(lists.upcoming[0]),
    home: lists.upcoming.slice(0,3).map(home).join('\n') || '<p class="empty-concerts">De nouvelles dates seront annoncées prochainement. Retrouvez nos précédents concerts dans les archives.</p>',
    upcoming: lists.upcoming.map(upcoming).join('\n') || '<p class="empty-concerts">De nouvelles dates seront annoncées prochainement.</p>',
    archives: lists.past.map(past).join('\n'),
    heading: lists.upcoming.length === 1 ? 'Prochain concert' : 'Prochains concerts'
  };
}
const api = {concerts, splitConcerts, sections, parisDay};
if (typeof module !== 'undefined' && module.exports) module.exports = api;
if (typeof document !== 'undefined') {
  const rendered = {};
  function refresh() {
    const content = sections(new Date());
    for (const key of ['hero','home','upcoming','archives']) {
      const container = document.querySelector(`[data-concerts="${key}"]`);
      if (container && rendered[key] !== content[key]) {
        container.innerHTML = content[key];
        rendered[key] = content[key];
      }
    }
    document.querySelectorAll('[data-concerts-heading]').forEach(el => { el.textContent = content.heading; });
  }
  refresh();
  setInterval(refresh, 60000);
  addEventListener('pageshow', refresh);
}
})(typeof globalThis !== 'undefined' ? globalThis : this);
