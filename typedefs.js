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
 * @property {SocialLink[]} socialLinks
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
 * @property {LocaleObject} title
 * @property {string} videoLink
 * @property {LocaleObject} text
 * @property {SeoData} seo
 * @property {SocialLinkLocale[]} socialLinks
 * @property {string} participateLink
 */

/**
 * @exports CvData
 * @typedef CvData
 * @type {object}
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
 * @exports XanoError
 * @typedef XanoError
 * @type {object}
 * @property {'error'} status
 * @property {string} message
 */

/**
 * @exports PracticeRecord
 * @typedef PracticeRecord
 * @type {object}
 * @property {LocaleObject} name
 * @property {string} link
 */

/**
 * @exports Practice
 * @typedef Practice
 * @type {object}
 * @property {number} id
 * @property {LocaleObject} name
 * @property {LocaleObject} slug
 * @property {LocaleObject} title
 * @property {LocaleObject} subtitle
 * @property {string} videoLink
 * @property {LocaleObject} description
 * @property {PracticeRecord[]} records
 * @property {Participants} participants
 */
