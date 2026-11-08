const assert=require('node:assert/strict');
const fs=require('fs');
const api=require('../dist/concerts.js');
const next='carnet-de-bal-bonningues';
let state=api.splitConcerts(new Date('2026-11-08T18:00:00+01:00'));
assert.equal(state.upcoming.length,1);
assert.equal(state.upcoming[0].id,next);
assert.equal(state.past.length,21);
assert.ok(state.past.some(e=>e.id==='harmonies-du-monde'));
state=api.splitConcerts(new Date('2026-12-05T19:59:59+01:00'));
assert.equal(state.upcoming[0].id,next);
state=api.splitConcerts(new Date('2026-12-05T20:00:00+01:00'));
assert.equal(state.upcoming.length,0);
assert.equal(state.past[0].id,next);
assert.match(api.sections(new Date('2026-12-06T12:00:00Z')).home,/De nouvelles dates/);
assert.doesNotMatch(api.sections(new Date('2026-12-06T12:00:00Z')).hero,/Réserver/);
assert.equal(api.parisDay(new Date('2026-12-05T23:30:00Z')),'2026-12-06');
// Les archives regroupées restent exhaustives et seule l’année récente est ouverte.
const archiveHTML=api.sections(new Date('2026-11-08T18:00:00+01:00')).archives;
assert.deepEqual([...archiveHTML.matchAll(/data-year="(\d{4})"/g)].map(m=>m[1]),['2026','2025','2024','2023','2022','2021']);
assert.equal((archiveHTML.match(/<article id=/g)||[]).length,21);
assert.equal((archiveHTML.match(/<details[^>]+ open>/g)||[]).length,1);
assert.match(archiveHTML, /data-year="2026" open/);
assert.match(api.sections(new Date('2026-12-06T12:00:00Z')).archives, /id="carnet-de-bal-bonningues"/);
// Sans fin précise : une date future reste visible le jour du concert, puis est archivée à minuit à Paris.
api.concerts.push({id:'test',date:'2027-06-01',time:'20h',title:'Test',venue:'Test',city:''});
assert.ok(api.splitConcerts(new Date('2027-06-01T21:59:59Z')).upcoming.some(e=>e.id==='test'));
assert.ok(api.splitConcerts(new Date('2027-06-01T22:00:00Z')).past.some(e=>e.id==='test'));
api.concerts.pop();
for(const file of fs.readdirSync('dist').filter(f=>f.endsWith('.html'))){
 const html=fs.readFileSync('dist/'+file,'utf8');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,file+': identifiants dupliqués');
 for(const m of html.matchAll(/(?:href|src)="([^"?]+)(?:\?[^"#]*)?"/g)){
  const url=m[1];if(/^(https?:|mailto:|data:|#)/.test(url))continue;
  const [target,hash]=url.split('#');assert.ok(fs.existsSync('dist/'+target),file+': '+target);
  if(hash)assert.ok(fs.readFileSync('dist/'+target,'utf8').includes('id="'+hash+'"'),file+': '+url);
 }
}
assert.equal((fs.readFileSync('dist/media.html','utf8').match(/data-gallery-photo/g)||[]).length,7);
console.log('Tests réussis : 22 concerts conservés, archivage à la bonne heure, regroupement par année, heure de Paris, état sans concert, liens et galerie.');
