export class FetchData {
	/**
	 * Constructor
	 * @param {{
	 *  data?: object | unknown | undefined | any,
	 *  token?: string | undefined,
	 *  method?: string | undefined
	 * }} params
	 */
	constructor({ data, token, method }) {
		this.data = data || Object.create(null);
		this.token = token || null;
		this.method = method || 'GET';

		this.createData();
	}

	createData() {
		const config = Object.create(null);
		config.headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		};
		if (this.token) {
			config.headers['Authorization'] = this.token;
		}

		if (this.data && this.method === 'GET') this.method = 'POST';

		return {
			headers: config.headers,
			method: this.method,
			body: JSON.stringify(this.data)
		};
	}
}
