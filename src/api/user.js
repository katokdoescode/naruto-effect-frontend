import { request } from "./request";

export function getUser(token, fetch) {
	return request('auth/me', 'get', undefined, 'json', token, fetch);
}
