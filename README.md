# Orchestre du Lointain

Site officiel de l'Orchestre du Lointain.

Le site public est constitué de fichiers HTML, CSS, JavaScript et d'images standards conservés dans le dossier `dist`. Chaque modification envoyée sur la branche `main` est automatiquement publiée par GitHub Pages.

Nom de domaine : [orchestredulointain.com](https://orchestredulointain.com/)


## Gestion des concerts (mise à jour du 8 novembre 2026)

Les dates sont maintenant saisies une seule fois dans `dist/concerts.js`, dans la liste `concerts`. L’accueil et le calendrier utilisent cette même source.

- Pour ajouter une représentation, renseigner un identifiant unique, la date `AAAA-MM-JJ`, l’horaire, le titre, le lieu, la ville et, si disponible, le lien direct de réservation.
- `end` indique la fin réelle avec son fuseau (exemple : `2026-12-05T20:00:00+01:00`). Après cette heure, le concert passe automatiquement dans les archives. Sans `end`, il est archivé le lendemain, à minuit, heure de Paris. `finished: true` permet d’archiver immédiatement une représentation terminée.
- Le navigateur actualise les listes à l’ouverture et toutes les minutes. Si aucune date n’est prévue, un message remplace les annonces et les réservations disparaissent.
- Après une modification, lancer `node tools/sync-concerts.cjs` pour actualiser aussi le contenu HTML de secours, puis `node tools/check-site.cjs` pour vérifier les dates et les liens. Publier ensuite les fichiers modifiés selon la procédure habituelle.
- La galerie de la page Média permet d’agrandir les photos, de passer à la suivante/précédente avec les boutons ou les flèches du clavier, et de fermer avec Échap. Renseigner les légendes et les crédits connus dans les attributs `data-caption` des liens.

Fiche officielle utilisée pour le lien du 5 décembre : https://mediatheques.grandcalais.fr/Default/doc/CALENDAR/812/carnet-de-bal .
