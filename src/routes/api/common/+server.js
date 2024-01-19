// import { VITE_BFF_BASE_URL } from '$env/static/private';
// import { Routes } from '$lib/constants/index.js';
// import { createError } from '$lib/utils/errors.js';
import { json } from '@sveltejs/kit';
export async function POST() {
	// const data = await request.formData();

	// const authToken = cookies.get('authToken');
	// const url = VITE_BFF_BASE_URL + Routes.MAIN_PAGE;

	// const requestOptions = {
	// 	method: 'PATCH',
	// 	headers: {
	// 		Authorization: authToken,
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify(data)
	// };

	function asyncTimer(duration) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ success: true });
			}, duration);
		});
	}

	const response = await asyncTimer(2000);
	return json(response);

	/** @type {MainPageData&XanoError} */
	// const pageData = await fetch(url, requestOptions).then((res) => res.json());

	// if (pageData.message) {
	// 	return json(createError(false, pageData.message));
	// }

	// if (pageData) {
	// 	return json({ success: true, data: pageData });
	// } else {
	// 	return json(createError(false, 'Something went wrong. Try again later.'));
	// }
}
