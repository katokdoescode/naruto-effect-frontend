import { describe, expect, test } from 'vitest';
import { validateUserData } from './validate';

const userDataset = [
	{
		name: 'Test',
		password: '123',
		age: 12,
	},
	{
		name: '',
		password: '123',
		age: 12,
	},
	{
		name: null,
		password: undefined,
		age: 12,
	},
	{
		name: 0,
	},
	{
		name: Number.NaN,
	},
];

const userValids = [true, false, false, false, false];

describe('validateUserData function', () => {
	userDataset.forEach((data, index) => {
	test(`data with index: ${index} is ${userValids[index]}`, () => {
		// @ts-ignore
		expect(validateUserData(data)).toBe(userValids[index]);
	 })
	});
});
