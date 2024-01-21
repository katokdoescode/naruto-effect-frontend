import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	import.meta.env.VITE_BFF_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY
);
