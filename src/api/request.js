const config = {
	baseURL: '/api',
	headers: {
		json: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		formData: {}
	}
};

/**
 *
 * @param {string} path - endpoint path
 * @param {'get' | 'POST' | 'delete' | 'put' | 'patch' | 'options' | 'head'} method='get'
 * @param {object} data - data to send
 * @param {'json'|'formData'} dataType - data type
 * @returns {Promise<any>}
 */
// Add fetch as an argument to your request function
export async function request(
	path = '',
	method = 'get',
	data = undefined,
	dataType = 'json',
	token,
	fetch = global.fetch
) {
	if (token) {
		config.headers[dataType]['Authorization'] = token;
	}
	const conf = {
		headers: config.headers[dataType],
		method,
		...(data
			? {
					body: dataType === 'json' ? JSON.stringify(data) : data
			  }
			: Object.create(null))
	};

	const url = `${config.baseURL}/${path}`;

	// Use the provided fetch function here
	return await fetch(url, conf).then((res) => res.json());
}
