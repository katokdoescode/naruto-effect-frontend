// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			/** Supabase client of the current request (acts as the signed-in user or anon) */
			supabase: import('@supabase/supabase-js').SupabaseClient;
			isAuthenticated: boolean;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export type {};
