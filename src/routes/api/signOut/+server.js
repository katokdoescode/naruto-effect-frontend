import { json } from '@sveltejs/kit';
export function POST({ cookies }) {
	cookies.delete('authToken', { path: '/' });
	return json({
		success: true
	});
}
