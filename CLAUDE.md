@AGENTS.md

## Workflow: small vs big changes

**Small change** (text, colour, spacing, adding one small element): edit the
file directly, no plan, no explanation. Do not run Lighthouse, build, tests,
or screenshots, and do not restart the dev server. Commit with a short
message and `git push origin main` right away. Reply in 1 line: what changed.

**Big change** (new section, redesign, significant update): full protocol —
plan, verify (build/typecheck/visual check as relevant), then commit and push.

## Mise à jour du site cPanel

Après toute modification du site destinée à la prévisualisation cPanel :

- (a) `npm run build:cpanel`
- (b) `npm run zip:cpanel`
- (c) vérifie que le zip ne contient aucun antislash, que `_next/static/chunks`
  contient des fichiers et que `.htaccess`, `contact.php`, `index.html`,
  `about/`, `images/`, `videos/` sont présents
- (d) commit et push
- (e) indique le chemin du zip, son poids et le nombre d'entrées en une ligne

Ne jamais utiliser Compress-Archive de PowerShell. Pour les petites
retouches, pas de captures ni de Lighthouse.
