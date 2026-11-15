# Prompt for the Curtain ERP — "Alterations" section for factory / production

Paste this to whoever (or whatever) builds the ERP:

---

Add a new section **Alterations** in the ERP for the factory / production team. Source of data is the existing
Supabase project `dmoksh-master-db` (`https://pncdmkqhfclymmyldmas.supabase.co`), same database the ERP already uses.

Read from the view **`public.v_alteration_cases_erp`** (one row per alteration case). Columns:

| column | meaning |
|---|---|
| `id` (uuid) | case id |
| `case_no` (int) | human case number, show as "Case #12" |
| `status` | `open` · `in_progress` · `resolved` · `cancelled` |
| `order_id`, `client_id`, `customer_name`, `customer_mobile`, `address`, `city` | client / order info |
| `designer_name`, `windows_count` | from the order |
| `raised_by`, `raised_at`, `resolved_at`, `note` | who raised it (operations) and when |
| `issues` (jsonb array) | each: `{ id, item, layer, issue_type, description, photos[], status }` — e.g. item "Living room window 1", layer "Main", issue_type "Size – short" |
| `cost_total` (numeric) | sum of alteration costs recorded by operations |

Photos are paths in the public storage bucket `invoices`:
`https://pncdmkqhfclymmyldmas.supabase.co/storage/v1/object/public/invoices/<path>`.

Screen: list of cases, default filter `status in (open, in_progress)`, newest first, with badges per status; click → case detail
showing client info, the order link (order_id), and each issue with its photos. The factory team may update
`public.alteration_cases.status` (`in_progress` when they start, `resolved` when the corrected curtain is sent back) and
`public.alteration_issues.status` per issue (`open` / `resolved`). Nothing else needs writing from the ERP side.

Row-level security: any active user in `public.users` (the ERP's own user table) can read and update these tables when signed in
with Supabase auth — no new policies required.
