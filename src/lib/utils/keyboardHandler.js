let activeKeys = new Set();
export let isComboPressed = false;
/**
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
	activeKeys.add(event.code);

	const requiredKeys = ['KeyA', 'KeyS', 'KeyD'];

	if (requiredKeys.every((key) => activeKeys.has(key))) {
		isComboPressed = true;
	}
}

/**
 *
 * @param {KeyboardEvent} event
 */
function handleKeyup(event) {
	activeKeys.delete(event.code);
}

export function initHandlers(window) {
	window.addEventListener('keydown', handleKeydown);
	window.addEventListener('keyup', handleKeyup);
}

export function destroyHandlers(window) {
	window.removeEventListener('keydown', handleKeydown);
	window.removeEventListener('keyup', handleKeyup);
}
