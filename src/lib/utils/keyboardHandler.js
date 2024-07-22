let activeKeys = new Set();

/**
 * @param {KeyboardEvent} event
 */
export function handleKeydown(event) {
	activeKeys.add(event.code);

	const requiredKeys = ['AltLeft', 'KeyM', 'KeyL'];

	return requiredKeys.every(
		(key, index) => Array.from(activeKeys)[index] === key,
	);
}

/**
 *
 * @param {KeyboardEvent} event
 */
export function handleKeyup(event) {
	activeKeys.delete(event.code);
}
