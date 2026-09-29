@AGENTS.md

## Workflow: small vs big changes

**Small change** (text, colour, spacing, adding one small element): edit the
file directly, no plan, no explanation. Do not run Lighthouse, build, tests,
or screenshots, and do not restart the dev server. Commit with a short
message and `git push origin main` right away. Reply in 1 line: what changed.

**Big change** (new section, redesign, significant update): full protocol —
plan, verify (build/typecheck/visual check as relevant), then commit and push.
