/**
 * @exports LocaleObject
 * @typedef {object} LocaleObject
 * @property {string} ru
 * @property {string} en
 */

/**
 * @exports  Practice
 * @typedef Practice
 * @type {object}
 * @property {number} id
 * @property {LocaleObject} slug
 * @property {LocaleObject} name
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
 * @property {string} slug
 * @property {LocaleObject} name
 * @property {SocialLink[]} socialLinks
 * @property {LocaleObject} description
 * @property {LocaleObject} title
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
 */

/**
 * @exports SocialLinkLocale
 * @typedef SocialLinkLocale
 * @type {object}
 * @property {LocaleObject} name
 * @property {string} link
 */

/**
 * @exports SocialLink
 * @typedef SocialLink
 * @type {object}
 * @property {string} name
 * @property {string} link
 */

/**
 * @exports MainPageData
 * @typedef MainPageData
 * @type {object}
 * @property {string} title
 * @property {string} videoLink
 * @property {string} text
 * @property {SeoData} seo
 * @property {SocialLinkLocale[]} socialLinks
 * @property {string} participateLink
 */

/**
 * @exports AppErrorType
 * @typedef AppErrorType
 * @type {object}
 * @property {boolean} success
 * @property {string} errorMessage
 * @property {undefined} data
 */
