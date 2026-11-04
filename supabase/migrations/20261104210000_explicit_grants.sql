-- Explicit Data API grants.
--
-- Since 2026-10-30 Supabase no longer grants access to new tables in `public`
-- automatically. Before that every table got ALL privileges for anon and
-- authenticated, and only RLS protected the data. This migration grants each
-- role only what the site needs:
--
--   anon (visitors)            read the site content, play the hat game
--   authenticated (the admin)  edit the site content
--
-- The admin is one shared account: editors sign in with a shared password,
-- so every authenticated user is an editor by design.

-- Stop granting privileges on new tables and sequences automatically
alter default privileges for role postgres in schema public
	revoke all on tables from anon, authenticated;
alter default privileges for role postgres in schema public
	revoke all on sequences from anon, authenticated;

revoke all on table
	public.common,
	public.cv,
	public.practices,
	public.participants,
	public.projects,
	public.hat,
	public.analytics
from anon, authenticated;

revoke all on all sequences in schema public from anon, authenticated;

-- Site content: everyone reads (RLS hides drafts from visitors)
grant select on table
	public.common,
	public.cv,
	public.practices,
	public.participants,
	public.projects
to anon, authenticated;

-- The admin edits the content
grant insert, update, delete on table
	public.practices,
	public.participants,
	public.projects
to authenticated;

grant update on table public.common, public.cv to authenticated;

-- Hat game is open to everyone. The password column is write-only:
-- it can be set, but nobody can read it through the API.
grant select (id, "createdAt", name, "isPutting", words) on table public.hat
to anon, authenticated;
grant insert, update, delete on table public.hat to anon, authenticated;

-- Analytics: visitors write, the admin reads
grant insert on table public.analytics to anon;
grant select on table public.analytics to authenticated;

-- Visitors could read hidden (draft) projects; now they see only visible ones
drop policy if exists "Enable read access for all users" on public.projects;
create policy "Anyone can read visible projects"
on public.projects
as permissive
for select
to public
using ("isVisible" = true);
