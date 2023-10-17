import { request } from './request';

export function auth(userData = Object.create(null), fetch, baseURL = '/') {
	return request(
		baseURL + 'auth/login',
		'POST',
		userData,
		'json',
		undefined,
		fetch
	);
}
