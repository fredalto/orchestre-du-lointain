// Met à jour les contenus de secours HTML à partir de la source unique.
// Lancer après toute modification de dist/concerts.js : node tools/sync-concerts.cjs
const fs = require('node:fs');
const {sections} = require('../dist/concerts.js');
const content = sections(new Date());
for (const file of ['dist/index.html', 'dist/calendrier.html']) {
  let html = fs.readFileSync(file, 'utf8');
  for (const key of ['hero','home','upcoming','archives']) {
    const pattern = new RegExp(`(<!-- concerts:${key}:start -->)[\\s\\S]*?(<!-- concerts:${key}:end -->)`);
    html = html.replace(pattern, (_, start, end) => start + content[key] + end);
  }
  html = html.replace(/(data-concerts-heading>)[^<]+/, '$1' + content.heading);
  fs.writeFileSync(file, html);
}
console.log('Accueil et calendrier synchronisés.');
