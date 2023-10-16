import { request } from './request';

export function auth(userData = Object.create(null), fetch) {
	return request('auth/login', 'POST', userData, 'json', undefined, fetch);
}
