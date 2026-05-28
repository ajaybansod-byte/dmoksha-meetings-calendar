# D'Moksha Meetings Calendar — Deploy Guide

A Google-Calendar-style view of designer meetings, with a list view, full
add/edit/delete forms, and color-coded chips by meeting type.

- Backend: **Supabase** (project `dmoksh-master-db`, table `public.designer_meetings`)
- Frontend: single-file React app (React 18 + Tailwind via CDN)
- Hosted on: **Render** (free Web Service tier)

---

## 1. Local test (optional)

```bash
cd dmoksha-calendar
npm install
npm start
# open http://localhost:3000
```

You should immediately see 71 meetings for May 2026 (seeded from your Excel).

---

## 2. Push to GitHub

```bash
cd dmoksha-calendar
git init
git add .
git commit -m "Initial commit — D'Moksha meetings calendar"
git branch -M main
git remote add origin git@github.com:<your-account>/dmoksha-meetings-calendar.git
git push -u origin main
```

---

## 3. Deploy on Render

1. Go to https://dashboard.render.com → **New +** → **Web Service**
2. Connect the GitHub repo you just pushed
3. Render will auto-detect `render.yaml` and pre-fill the settings:
   - **Environment**: Node
   - **Build command**: `npm install`
   - **Start command**: `node server.js`
   - **Plan**: Free
4. Click **Create Web Service**
5. Wait ~2 minutes for the first deploy
6. Your calendar will be live at `https://dmoksha-meetings-calendar.onrender.com`
   (or whatever subdomain you choose)

Subsequent pushes to `main` will auto-deploy.

---

## 4. Supabase details

- Project: `dmoksh-master-db` (ID `pncdmkqhfclymmyldmas`, region ap-south-1)
- URL: `https://pncdmkqhfclymmyldmas.supabase.co`
- Table: `public.designer_meetings`
- Anon/publishable key is **already embedded** in `public/index.html`
  (this is the standard pattern for a Supabase frontend — the key is meant to
  be public; row-level security would be the way to lock down writes if needed)

### Table schema

| column            | type        | notes                                       |
| ----------------- | ----------- | ------------------------------------------- |
| id                | uuid PK     | auto-generated                              |
| meeting_date      | date NOT NULL |                                           |
| customer_name     | text        |                                             |
| mobile_number     | text        | text so country codes don't get truncated   |
| area              | text        |                                             |
| windows           | int         | "# Windows" from the sheet                  |
| designer_name     | text        |                                             |
| support_name      | text        |                                             |
| meeting_type      | text        | "1st Meeting", "2nd Meeting", …             |
| timing            | text        | flexible — "11:30 AM", "3.30 pm", etc.      |
| status            | text        | Converted / Dropped / Ongoing / …           |
| scheduled_by      | text        |                                             |
| recording         | text        | "Yes" / "No"                                |
| recording_reason  | text        |                                             |
| remarks           | text        |                                             |
| sj                | text        | "Sales Journal" follow-up notes             |
| created_at        | timestamptz | auto                                        |
| updated_at        | timestamptz | auto-updated by trigger                     |

Indexes on `meeting_date`, `designer_name`, `status`.

---

## 5. Color key

| Meeting Type | Color   |
| ------------ | ------- |
| 1st Meeting  | Yellow  |
| 2nd Meeting  | Orange  |
| 3rd Meeting  | Red     |
| 4th Meeting  | Rose    |
| 5th Meeting  | Purple  |

---

## 6. Security note

Like all your other tables in `dmoksh-master-db`, RLS is **disabled** on
`designer_meetings`. Anyone with the (public) anon key can read or modify the
data. If you'd like to lock writes down to authenticated users only, ask and
we'll add RLS policies.
