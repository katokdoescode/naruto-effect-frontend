/**
 * @exports LocaleObject
 * @typedef {object} LocaleObject
 * @property {string} ru
 * @property {string} en
 */

/**
 * @exports BannerItem
 * @typedef {object} BannerItem
 * @property {string|null} link
 * @property {string|null} alt
 */

/**
 * @exports BannerModes
 * @typedef {'image'|'video'} BannerModes
 */

/**
 * @exports SupabaseError
 * @typedef {object} SupabaseError
 * @property {string} message
 * @property {string} code
 * @property {string|null} details
 * @property {string|null} hint
 */

/**
 * @exports SupabaseSingleResponse
 * @typedef {Object} SupabaseSingleResponse
 * @property {object} data
 * @property {number} status
 * @property {string} statusText
 * @property {SupabaseError|null} error
 */

/**
 * @exports SupabaseMultiResponse
 * @typedef {Object} SupabaseMultiResponse
 * @property {Array} data
 * @property {number} status
 * @property {string} statusText
 * @property {SupabaseError|null} error
 */

/**
 * @typedef {object} PracticeListItem
 * @property {number} id
 * @property {boolean} isVisible
 * @property {string} slug
 * @property {string} title
 */

/**
 * @typedef {object} SupabasePracticeList
 * @property {PracticeListItem[]} data
 * @property {number} status
 * @property {string} statusText
 * @property {object|null} error
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
 * @exports Project
 * @typedef Project
 * @type {object}
 * @property {number} id
 * @property {LocaleObject} name
 * @property {string} slug
 * @property {LocaleObject} title
 * @property {LocaleObject} description
 * @property {boolean} isVisible
 * @property {string?} [createdAt]
 */

/**
 * @exports Projects
 * @typedef Projects
 * @type {Array<Projects>}
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
 * @property {LocaleObject} description
 * @property {string|number} year
 * @property {string|undefined?} iframe
 * @property {BannerItem} banner
 * @property {BannerModes} bannerMode
 */

/**
 * @exports CvData
 * @typedef CvData
 * @type {object}
 * @property {number} id
 * @property {string|undefined?} videoLink
 * @property {LocaleObject} title
 * @property {LocaleObject} text
 */

/**
 * @exports HatData
 * @typedef HatData
 * @type {object}
 * @property {number?} [id]
 * @property {string} name
 * @property {string?} [createdAt]
 * @property {string?} [password]
 * @property {boolean?} [isPutting]
 * @property {string[]} words
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
 * @typedef {object} Practice
 * @property {number} id
 * @property {LocaleObject} slug
 * @property {LocaleObject} title
 * @property {boolean} isVisible
 * @property {LocaleObject|undefined?} originalSlug
 * @property {LocaleObject|undefined?} subtitle
 * @property {LocaleObject|undefined?} description
 * @property {string|undefined?} iframe
 * @property {BannerItem} banner
 * @property {BannerModes} bannerMode
 */

/**
 * @exports PracticePartial
 * @typedef {object} PracticePartial
 * @property {number} id
 * @property {LocaleObject} slug
 * @property {LocaleObject} title
 * @property {boolean} isVisible
 */

/**
 * @exports ProjectsPartial
 * @typedef {object} ProjectsPartial
 * @property {number} id
 * @property {LocaleObject} slug
 * @property {LocaleObject} title
 * @property {boolean} isVisible
 */

/**
 * @exports SupabasePractice
 * @typedef {object} SupabasePractice
 * @property {Practice} data
 * @property {number} status
 * @property {string} statusText
 * @property {SupabaseError|null} error
 */

/**
 * @exports SupabasePractices
 * @typedef {object} SupabasePractices
 * @property {Practice[]} data
 * @property {number} status
 * @property {string} statusText
 * @property {SupabaseError|null} error
 */

/**
 * @exports SupabaseProjects
 * @typedef {object} SupabaseProjects
 * @property {ProjectsPartial[]} data
 * @property {number} status
 * @property {string} statusText
 * @property {SupabaseError|null} error
 */

/**
 * @exports SupabaseHats
 * @typedef {object} SupabaseHats
 * @property {HatData[]} data
 * @property {number} status
 * @property {string} statusText
 * @property {SupabaseError|null} error
 */

/**
 * @exports SupabaseHatData
 * @typedef {object} SupabaseHatData
 * @property {HatData} data
 * @property {number} status
 * @property {string} statusText
 * @property {SupabaseError|null} error
 */

/**
 * @exports MainLayoutData
 * @typedef MainLayoutData
 * @type {object}
 * @property {boolean} authorized
 * @property {Practice[]} practices
 * @property {Project[]} projects
 * @property {Participant[]} participants
 * @property {MainPageData} pageData,
 * @property {string} loginPhrase
 */
