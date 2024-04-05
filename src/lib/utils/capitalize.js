/**
 * Works same as CSS capitalize
 * @param {string} sentence
 * @returns {string}
 */
export default function (sentence) {
	if (!sentence) return '';
	return sentence
		.split(' ')
		.map((word) => {
			const [firstLetter, ...restOfWord] = word;
			if (!firstLetter) return '';
			return `${firstLetter.toUpperCase()}${restOfWord.join('')}`;
		})
		.join(' ');
}
