// Fallback for old browsers
if (matchMedia('(prefers-color-scheme: dark)').media === 'not all') {
	document.documentElement.style.display = 'none';
	document.head.insertAdjacentHTML(
		'beforeend',
		"<link rel='stylesheet' href='styles / themes / light.css' onload='document.documentElement.style.display ='''' > "
	);
}
