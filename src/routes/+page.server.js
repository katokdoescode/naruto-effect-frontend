import { supabase } from '$lib/supabaseClient';
/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
	const parentData = await parent();
	/** @type{MainPageData} */
	const pageData = parentData.pageData;

	supabase.auth.onAuthStateChange((event, session) => {
		console.log(event, session);

		if (event === 'INITIAL_SESSION') {
			// handle initial session
			console.log('INITIAL_SESSION');
		} else if (event === 'SIGNED_IN') {
			// handle sign in event
			console.log('SIGNED_IN');
		} else if (event === 'SIGNED_OUT') {
			// handle sign out event
			console.log('SIGNED_OUT');
		} else if (event === 'PASSWORD_RECOVERY') {
			// handle password recovery event
			console.log('PASSWORD_RECOVERY');
		} else if (event === 'TOKEN_REFRESHED') {
			// handle token refreshed event
			console.log('TOKEN_REFRESHED');
		} else if (event === 'USER_UPDATED') {
			// handle user updated event
			console.log('USER_UPDATED');
		}
	});
	return { pageData };
}
