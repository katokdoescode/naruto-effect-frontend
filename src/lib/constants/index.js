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
	DOCUMENTS: 'document'
};

export class AppError {
	constructor(success, errorMessage) {
		this.createError(success, errorMessage);
	}

	createError(success, errorMessage) {
		return {
			success,
			errorMessage
		};
	}
}
