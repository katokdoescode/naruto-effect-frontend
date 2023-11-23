import { VITE_BFF_BASE_URL } from '$env/static/private';
import { Routes } from '$lib/constants';
import { createError } from '$lib/utils/errors';
import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
	const isAuthenticated = !!cookies.get('authToken');

	const url = VITE_BFF_BASE_URL + Routes.PARTICIPANTS;

	/** @type {Participants&XanoError} */
	const participants = await fetch(url).then((res) => res.json());
	if (participants.message)
		return json(createError(false, 'Something went wrong. Try again later.'));

	if (participants) {
		return json({
			success: true,
			data: participants.filter(({ isVisible }) => isAuthenticated || isVisible)
		});
	} else {
		return json(createError(false, 'Something went wrong. Try again later.'));
	}
}

export async function POST({ request, cookies }) {
	/** @type {Participant} */
	const data = await request.json();
	const authToken = cookies.get('authToken');
	const url = VITE_BFF_BASE_URL + Routes.PARTICIPANTS;

	const requestOptions = {
		method: 'POST',
		headers: {
			Authorization: authToken,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};

	/** @type {Participant&XanoError} */
	const participant = await fetch(url, requestOptions).then((res) =>
		res.json()
	);

	if (participant.message) {
		return json(createError(false, participant.message));
	}

	if (participant) {
		return json({ success: true, data: participant });
	} else {
		return json(createError(false, 'Something went wrong. Try again later.'));
	}
}
export async function PATCH({ request, cookies }) {
	/** @type {Participant} */
	const data = await request.json();
	const authToken = cookies.get('authToken');
	const url = VITE_BFF_BASE_URL + Routes.PARTICIPANTS + `/${data.id}`;

	const requestOptions = {
		method: 'PATCH',
		headers: {
			Authorization: authToken,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};

	/** @type {Participant&XanoError} */
	const participant = await fetch(url, requestOptions).then((res) =>
		res.json()
	);

	if (participant.message) {
		return json(createError(false, participant.message));
	}

	if (participant) {
		return json({ success: true, data: participant });
	} else {
		return json(createError(false, 'Something went wrong. Try again later.'));
	}
}
