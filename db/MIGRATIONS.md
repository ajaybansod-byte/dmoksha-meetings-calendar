# Schema changes for the Meetings Calendar

All were applied directly in Supabase (`pncdmkqhfclymmyldmas`). The exact SQL of each is stored in Supabase under
Database → Migrations (table `supabase_migrations.schema_migrations`), searchable by the name below.

| Date | Migration | What it did |
|---|---|---|
| 2026-05-28 | `create_designer_meetings_table` | Meetings table, indexes, `set_updated_at` trigger |
| 2026-06-09 | `add_timing_range_columns` | `timing_from`, `timing_to` |
| 2026-06-16 | `add_address_column` | `address` |
| 2026-06-29 | `add_home_budget_curtains` | home ownership, budget per curtain, curtains required |
| 2026-07-06 | `add_soft_delete` | `deleted_at` (Trash) |
| 2026-07-14 | `add_location_column` | City (`location`), existing rows set to Mumbai |
| 2026-09-21 | `add_visit_type_and_field_visits` | `visit_type` on meetings; new `field_visits` table |
| 2026-09-22 | `staff_portal_schema` | `staff`, `travel_expenses`, `petty_cash_advances`, `invoices` bucket, RLS |
| 2026-09-24 | `travel_expenses_multi_invoices` | Several screenshots per leg |
| 2026-10-01 | `client_id_schema`, `client_id_norm_mobile_fix`, `client_id_backfill_apply`, `client_id_triggers`, `client_id_four_digits` | Client ID system (DC-DI-A0001), backfill of 526 customers |
| 2026-10-08 | `field_work_schema`, `job_completions_unique_job`, `field_visits_install_items` | Visit ↔ order link, job sheets, curtains per visit |
| 2026-10-10 | `staff_mobile_optional` | Staff with email login (no mobile) |
| 2026-10-23 | `office_admin_access_field_team`, `travel_expenses_payment_tracking` | Office access, bill review, accounts payment (UTR) |
| 2026-10-26 | `schedule_visit_status` | Done / Cancel / Rescheduled |
| 2026-10-31 | `installations_alterations` | Outcomes, alteration cases/issues/costs, ERP view |
| 2026-11-02 | `factory_dispatch`, `staff_role_factory` | Factory per-item dispatch approval, returns, factory role |
| 2026-11-12 | `ops_admin_portal` | `ops` role, `submitted_by` on bills, Amit's ops profile |
| 2026-11-15 | `116_alteration_designer_approval` | Alteration issues: guided answers (`problem`), `fix`, designer decision (`designer_status`, note, by, at); cases: `designer_name`, `cost_bearer`, `needs_approval`; designer read policies; `designer_decide_alteration()` RPC; ERP view gets fix / approval columns. Also ERP `db/migrations/116_*.sql`. |
| 2026-11-17 | `119_measure_request_assign_on_calendar` | Partner measurement requests arrive unassigned; when the office sets `field_visits.support_name`, trigger `trg_sync_measure_request_staff` copies the support person onto `hl_measure_requests` (staff_id / staff_name now nullable). Also ERP `db/migrations/119_*.sql`. |
| 2026-11-17 | `120_measure_request_visit_removable` | Removing a measurement visit on the calendar now works: a waiting partner request is cancelled (`trg_cancel_measure_request_on_visit_delete`) and the link is set null (FK `on delete set null`). Also ERP `db/migrations/120_*.sql`. |

Not stored as migrations (data only): staff logins created for designers, support, factory and ops; Ajay's ops profile (2026-11-14). Regan moved from `support` to `ops` (2026-11-17).
