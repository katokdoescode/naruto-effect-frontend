import { FetchData } from './fetchData';
import { describe, expect, it } from 'vitest';

const testData = {
	onlyData: { data: { email: 'a@a.a', password: '123' } },
	onlyToken: { token: '123' },
	onlyMethod: { method: 'PUT' },
	fullPut: {
		data: { email: 'a@a.a', password: '123' },
		token: '123',
		method: 'PUT'
	},
	fullGet: {
		data: { email: 'a@a.a', password: '123' },
		token: '123',
		method: 'PUT'
	},
	dataAndToken: {
		data: { email: 'a@a.a', password: '123' },
		token: '123'
	},
	dataAndPost: {
		data: { email: 'a@a.a', password: '123' },
		method: 'POST'
	},
	dataAndDelete: {
		data: { email: 'a@a.a', password: '123' },
		method: 'DELETE'
	},
	dataAndGet: {
		data: { email: 'a@a.a', password: '123' },
		method: 'GET'
	}
};

describe('Creating FetchData object correctly', () => {
	it('Creates POST with data', () => {
		const { headers, method, body } = new FetchData(testData.onlyData);
		expect(headers).toBeTypeOf('object');
		expect(method).toBe('POST');
		expect(body).toBeTruthy();
		expect(JSON.parse(body)).toHaveProperty('email', 'a@a.a');
		expect(JSON.parse(body)).toHaveProperty('password', '123');
	});
});
