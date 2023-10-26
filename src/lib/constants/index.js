export const ColorSchemes = {
	LIGHT: 'light',
	DARK: 'dark',
	AUTO: 'auto'
};

export const Routes = {
	LOGIN: 'auth/login',
	USER: 'auth/me',
	PRACTICES: 'practice',
	PARTICIPANTS: 'participant',
	DOCUMENTS: 'document',
	MAIN_PAGE: 'mainpage'
};

export class AppError {
	constructor(success, errorMessage) {
		this.createError(success, errorMessage);
	}

	/**
	 *
	 * @param {boolean} success
	 * @param {string} errorMessage
	 * @returns {AppErrorType}
	 */
	createError(success, errorMessage) {
		return {
			success,
			errorMessage,
			data: undefined
		};
	}
}
