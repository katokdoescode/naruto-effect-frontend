/**
 * Creates a debounced function that delays invoking the provided function until after
 * a specified delay has elapsed since the last time the debounced function was invoked.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {Function} - A new debounced function.
 */
export function debounce(func, delay) {
	let timerId;
	return (...args) => {
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			func(...args);
		}, delay);
	};
}
