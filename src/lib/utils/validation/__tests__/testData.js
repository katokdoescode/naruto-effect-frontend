export const locales = {
	ru: 'ru',
	en: 'en',
};

/**
 * @type {Project}
 */
export const validProject = {
	id: 1,
	slug: 'test-project',
	name: { ru: 'Проект', en: 'Project' },
	title: { ru: 'Заголовок', en: 'Title' },
	description: { ru: 'Описание', en: 'Description' },
	isVisible: true,
};

/**
 * @type {MainPageData}
 */
export const validMainPage = {
	id: 1,
	title: { ru: 'Главная', en: 'Main' },
	text: { ru: 'Текст', en: 'Text' },
	banner: {
		link: 'https://example.com/image.jpg',
		alt: 'Banner',
	},
	videoLink: 'https://example.com/video.mp4',
	seo: {
		title: 'SEO Заголовок',
		description: 'SEO Описание',
		keywords: 'SEO Ключевые слова',
	},
	pageLinks: [],
	copyright: { ru: 'Copyright 2024', en: 'Copyright 2024' },
	description: { ru: 'Описание', en: 'Description' },
	year: 2024,
	bannerMode: 'image',
};

/**
 * @type {Practice}
 */
export const validPractice = {
	id: 1,
	slug: { ru: 'практика', en: 'practice' },
	originalSlug: { ru: 'практика', en: 'practice' },
	title: { ru: 'Практика', en: 'Practice' },
	description: { ru: 'Описание практики', en: 'Practice description' },
	banner: {
		link: 'https://example.com/practice.jpg',
		alt: 'Practice Banner',
	},
	isVisible: true,
	subtitle: { ru: 'Подзаголовок', en: 'Subtitle' },
	iframe: 'https://example.com/iframe.mp4',
	bannerMode: 'image',
};

/**
 * @type {CvData}
 */
export const validCv = {
	id: 1,
	title: { ru: 'Резюме', en: 'CV' },
	text: { ru: 'Текст резюме', en: 'CV text' },
	videoLink: 'https://example.com/cv-video.mp4',
};

/**
 * @type {Participant}
 */
export const validParticipant = {
	id: 1,
	slug: 'test-participant',
	name: { ru: 'Участник', en: 'Participant' },
	title: { ru: 'Заголовок', en: 'Title' },
	description: { ru: 'Описание участника', en: 'Participant description' },
	isVisible: true,
};
