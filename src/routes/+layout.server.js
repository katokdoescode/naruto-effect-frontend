import { VITE_LOGIN_PHRASE } from '$env/static/private';
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
	const authToken = cookies.get('authToken');

	/** @type { {data: Practices} } */
	const { data: practices } = await supabase.from('practices').select();

	/** @type { {data: Participants} } */
	const { data: participants } = await supabase.from('participants').select();

	/** @type{ {data: MainPageData[] } } */
	const common = await supabase.from('common').select();
	const pageData = common.data[0];

	const data = {
		authorized: !!authToken,
		practices,
		participants,
		pageData,
		loginPhrase: VITE_LOGIN_PHRASE
	};

	return data;
}
