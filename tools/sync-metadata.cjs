// Les titres, descriptions et aperçus de partage sont définis une seule fois.
// Lancer après modification : node tools/sync-metadata.cjs
const fs = require('node:fs');
const root = 'https://orchestredulointain.com/';
const pages = [
  ['index.html', 'Orchestre du Lointain', 'Ensemble orchestral professionnel basé à Calais, dirigé par Sophie Lechelle. Découvrez nos spectacles, les prochaines dates et la vie de l’orchestre.'],
  ['projet.html', 'Le projet · Orchestre du Lointain', 'Un orchestre professionnel ancré à Calais et sur la Côte d’Opale : création, rencontres et partage de la musique avec tous les publics.'],
  ['equipe.html', 'L’équipe · Orchestre du Lointain', 'Découvrez Sophie Lechelle, directrice musicale de l’Orchestre du Lointain, et les musiciens de son conseil artistique.'],
  ['programmes.html', 'Programmes · Orchestre du Lointain', 'Carnet de bal et Petra Wolk dans le Lointain : découvrez les spectacles de l’orchestre et contactez-nous pour les accueillir.'],
  ['calendrier.html', 'Calendrier · Orchestre du Lointain', 'Les prochaines dates de l’Orchestre du Lointain, les lieux et les liens de réservation, ainsi que les archives de nos concerts.'],
  ['media.html', 'Média · Orchestre du Lointain', 'L’Orchestre du Lointain en images : vidéos, photos de concerts, visuels des spectacles et revue de presse avec les liens vers les publications.'],
  ['soutenir.html', 'Nous soutenir · Orchestre du Lointain', 'Accompagnez l’Orchestre du Lointain : faire un don, devenir mécène et découvrir les partenaires qui soutiennent notre projet artistique.'],
  ['mentions-legales.html', 'Mentions légales · Orchestre du Lointain', 'Les mentions légales de l’Orchestre du Lointain : association éditrice, directeur de publication, coordonnées de contact et hébergement du site.']
];
const escape = text => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for (const [file,title,description] of pages) {
  const url = root + (file === 'index.html' ? '' : file);
  const head = `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">
  <link rel="canonical" href="${url}">
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Orchestre du Lointain">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${root}assets/accueil-orchestre.jpg">
  <meta property="og:image:width" content="2048">
  <meta property="og:image:height" content="1292">
  <meta property="og:image:alt" content="Les musiciennes et musiciens de l’Orchestre du Lointain">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escape(title)}">
  <meta name="twitter:description" content="${escape(description)}">
  <meta name="twitter:image" content="${root}assets/accueil-orchestre.jpg">
  <meta name="twitter:image:alt" content="Les musiciennes et musiciens de l’Orchestre du Lointain">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css?v=20261108-1">
  <link rel="stylesheet" href="font.css?v=20261108-8">
  <link rel="stylesheet" href="design.css?v=20261108-4">
</head>`;
  const path = 'dist/' + file;
  const html = fs.readFileSync(path,'utf8').replace(/<head>[\s\S]*?<\/head>/,head);
  fs.writeFileSync(path,html);
}
fs.writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(([file]) => `  <url><loc>${root}${file === 'index.html' ? '' : file}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync('dist/robots.txt',`User-agent: *\nAllow: /\n\nSitemap: ${root}sitemap.xml\n`);
console.log(`Descriptions, aperçus de partage, icône et sitemap synchronisés pour les ${pages.length} pages.`);
