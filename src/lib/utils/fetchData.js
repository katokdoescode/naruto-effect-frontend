export class FetchData {
	/**
	 * Constructor
	 * @param {{
	 *  data?: object | unknown | undefined | any,
	 *  token?: string | undefined,
	 *  initMethod?: "GET" | "PUT" | "POST" | "PATCH" | "DELETE" | undefined
	 * }?} params
	 */
	constructor({ data, token, initMethod }) {
		this.data = data || Object.create(null);
		this.token = token || null;
		this.initMethod = initMethod || 'GET';

		if (this.token) {
			this.headers['Authorization'] = this.token;
		}

		if (this.data && this.method === 'GET') this.initMethod = 'POST';
	}
	get headers() {
		return {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		};
	}

	get method() {
		return this.initMethod;
	}

	get body() {
		return JSON.stringify(this.data);
	}
}
