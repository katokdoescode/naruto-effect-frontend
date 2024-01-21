/**
 * @exports LocaleObject
 * @typedef {object} LocaleObject
 * @property {string} ru
 * @property {string} en
 */

/**
 * @exports Practices
 * @typedef Practices
 * @type {Array<Practice>}
 */

/**
 * @exports Participant
 * @typedef Participant
 * @type {object}
 * @property {number} id
 * @property {LocaleObject} name
 * @property {string} slug
 * @property {LocaleObject} title
 * @property {LocaleObject} description
 * @property {boolean} isVisible
 */

/**
 * @exports Participants
 * @typedef Participants
 * @type {Array<Participant>}
 */

/**
 * @exports SeoData
 * @typedef SeoData
 * @type {object}
 * @property {string} title
 * @property {string} description
 * @property {string} keywords
 */

/**
 * @exports PageLinkLocale
 * @typedef PageLinkLocale
 * @type {object}
 * @property {LocaleObject} name
 * @property {string} link
 */

/**
 * @exports MainPageData
 * @typedef MainPageData
 * @type {object}
 * @property {number} id
 * @property {LocaleObject} title
 * @property {string} videoLink
 * @property {LocaleObject} text
 * @property {SeoData} seo
 * @property {PageLinkLocale[]} pageLinks
 * @property {LocaleObject} copyright
 * @property {string|number} year
 */

/**
 * @exports CvData
 * @typedef CvData
 * @type {object}
 * @property {number} id
 * @property {LocaleObject} title
 * @property {LocaleObject} text
 */

/**
 * @exports AppErrorType
 * @typedef AppErrorType
 * @type {object}
 * @property {boolean} success
 * @property {string} errorMessage
 * @property {undefined} data
 */

/**
 * @exports Practice
 * @typedef Practice
 * @type {object}
 * @property {number} id
 * @property {LocaleObject} slug
 * @property {LocaleObject} title
 * @property {LocaleObject} subtitle
 * @property {string} videoLink
 * @property {LocaleObject} description
 * @property {boolean} isVisible
 */

/**
 * @exports MainLayoutData
 * @typedef MainLayoutData
 * @type {{ authorized: boolean, practices: Array<object>, participants: Array<object>, pageData: MainPageData, loginPhrase: string }}
 */
