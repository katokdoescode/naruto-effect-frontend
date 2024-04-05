import { CarSlugger } from '@katokdoescode/car-slugger';
import capitalize from './capitalize';

const slugger = new CarSlugger();

/**
 * Automatically translate sting to another language
 * and capitalize words
 * @param {string} targetLang
 * @param {string} text
 * @returns {string}
 */
export default function (targetLang, text) {
	let newString = '';

	if (targetLang.includes('-')) {
		targetLang = targetLang.split('-')[0];
	}

	switch (targetLang) {
		case 'ru':
			newString = slugger.translateLatin(text);
			break;
		case 'en':
			newString = slugger.translateCyrillic(text);
			break;
	}

	return capitalize(newString);
}
