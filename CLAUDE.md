# D'Moksha Meetings Calendar — read first

Before any work in this repo, read `README.md` (what each file does, who uses what) and `db/TABLES.md` (data).

Non-negotiable with Ajay (the owner):
- When he says "show me the plan first" — plan only, no edits, no data-changing SQL, until he says go.
- Never handle passwords or keys in files; logins are created in Supabase Auth, passwords are shared privately.
- Edit files directly in this folder; end every change with exact `git add <files>` + commit + push commands (the sandbox cannot push).
- Never edit `index.html` / `staff.html` with a blind text editor that can truncate — patch with exact find/replace,
  then validate: file ends with `</html>`, the babel script compiles (preset `env,react-classic`), no `import` in output.
- Keep `<script type="text/babel" data-presets="env,react-classic">` + the `Babel.registerPreset("react-classic", …)` line —
  removing it blanks the site (unpinned Babel CDN switched to the automatic JSX runtime).
- Don't delete repo files (server.js, package.json, render.yaml) — Render is a Node Web Service, not a static site.
- Supabase project `pncdmkqhfclymmyldmas` (dmoksh-master-db, shared with the ERP). Ask before changing real data.
  Record every schema change in `db/MIGRATIONS.md`.
- `backups/` holds customer data — it is git-ignored; never commit it.
