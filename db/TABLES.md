# Data used by the Meetings Calendar

Supabase project **dmoksh-master-db** (`pncdmkqhfclymmyldmas`). Tables are shared with the curtain ERP — tables marked
*ERP* are owned by the ERP and only read here.

| Table / object | Holds | Written by |
|---|---|---|
| `designer_meetings` | Every designer meeting: date, from/to time, customer, mobile, area, address, designer, support, meeting type (1st/2nd…), status, home rented/owned, budget per curtain, curtains required, recording, remarks, city (`location`), `visit_type`, `visit_status` (Done/Cancel/Rescheduled), `client_id`, soft delete `deleted_at` | Calendar |
| `field_visits` | Installations, track installations, collections for alteration, measurements, cash collection, upholstery, ironing: date, city, customer, address, stylist, support, time, linked `order_id` / `client_id` / `mobile`, `install_items` (curtains planned for the visit), `visit_status`, soft delete | Calendar (Scheduling, Installations) |
| `staff` | Portal people: name, mobile, role (`designer` · `support` · `factory` · `ops`), city, active, link to Supabase Auth user | Ajay (via Claude) |
| `travel_expenses` | Travel bills: staff, date, linked meeting/visit, customer, fare to/back, screenshot paths, Petty cash/UPI, note, review (pending/approved/rejected, by, note), payment (paid_on, UTR, paid_by), `submitted_by` (ops on behalf) | Staff portal, ops, Field team, Accounts |
| `petty_cash_advances` | Cash handed to staff | Field team → Petty cash |
| `job_completions` | Job sheet per visit: checklist ticks, tool photos (`details.tool_photos`), finished-work photos, feedback given, cash collected, pieces, unfinished reason | Staff portal |
| `installation_reviews` | Operations outcome per visit: installed / partial / alteration / cancelled / rescheduled, installed & remaining curtains | Installations tab |
| `alteration_cases` | One case per problem installation (case no, client, status open → in progress → resolved) | Installations tab, factory portal |
| `alteration_issues` | Issues inside a case: room/window/curtain, issue type, description, photos, resolved | Installations tab, factory portal |
| `alteration_costs` | Costs on a case: fabric/lining (metres), hardware, restitching, manpower, blind service, other; paid from; vendor; bill | Installations tab, ops portal |
| `factory_dispatches` | Factory sign-off per visit: dispatch (per-item ready / not ready + reason) or return received | Factory portal |
| `v_alteration_cases_erp` (view) | Alteration cases + issues + cost total, for the ERP factory section | — |
| `customers`, `client_id_counters`, `client_id_blocked_mobiles`, `client_id_backfill` | Client ID system (see docs) | Database triggers |
| `customer_orders` *ERP* | Orders: windows/curtains used for checklists, balance | read only |
| `estimates`, `customer_payments` *ERP* | Accepted estimate total (care-kit rule, order value) and payments (balance due) | read only |
| `users` *ERP* | Office logins and roles (accounts → accounts view; any active user → calendar) | read only |
| Storage bucket `invoices` | All photos: bill screenshots, tool & work photos, alteration photos/bills. Path starts with the uploader's auth id | Staff portal, calendar |

## Security functions

- `is_office_user()` — signed-in email is an active row in `users` → full office access to bills, reviews, alterations.
- `is_factory_staff()` — signed-in user is an active `staff` row with role `factory`.
- Trigger `trg_reset_dispatch` — if the office changes a visit's curtain list after the factory approved it, the approval resets to pending.
