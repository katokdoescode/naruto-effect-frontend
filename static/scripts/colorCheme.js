// TO BE PLACED AFTER CSS LINKS
const savedScheme = localStorage.getItem('colorScheme');
/** @type {HTMLLinkElement} */
const lightStylesheet = document.querySelector(
	'link[href="/styles/themes/light.css"]'
);

/** @type {HTMLLinkElement} */
const darkStylesheet = document.querySelector(
	'link[href="/styles/themes/dark.css"]'
);

if (savedScheme === 'auto') {
	lightStylesheet.media = '(prefers-color-scheme: light)';
	darkStylesheet.media = '(prefers-color-scheme: dark)';
} else if (savedScheme === 'light') {
	lightStylesheet.media = 'all';
	darkStylesheet.media = 'not all';
} else if (savedScheme === 'dark') {
	lightStylesheet.media = 'not all';
	darkStylesheet.media = 'all';
}
