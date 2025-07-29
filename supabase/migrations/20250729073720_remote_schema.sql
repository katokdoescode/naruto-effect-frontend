drop policy "Only admin can select" on "public"."analytics";

create policy "Only admin can select"
on "public"."analytics"
as permissive
for select
to supabase_admin, supabase_auth_admin, postgres, authenticated
using (true);



