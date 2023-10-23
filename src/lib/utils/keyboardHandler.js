let activeKeys = new Set();
let gw = null; // Global Window
export let isComboPressed = false;

/**
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
	activeKeys.add(event.code);

	const requiredKeys = ['AltLeft', 'KeyM', 'KeyL'];

	isComboPressed = requiredKeys.every((key) => activeKeys.has(key));
}

/**
 *
 * @param {KeyboardEvent} event
 */
function handleKeyup(event) {
	activeKeys.delete(event.code);
}

export function initHandlers(window) {
	gw = window;
	window.addEventListener('keydown', handleKeydown);
	window.addEventListener('keyup', handleKeyup);
}

export function destroyHandlers(window) {
	if (!gw && window) gw = window;
	gw.removeEventListener('keydown', handleKeydown);
	gw.removeEventListener('keyup', handleKeyup);
}
