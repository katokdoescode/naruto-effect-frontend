/**
 * Validate participant
 *
 * @param {Participant} participant
 * @param {string} locale
 * @returns {boolean}
 */
export function validateParticipant(participant, locale) {
	if (!participant.name[locale] || !participant.description[locale])
		return false;

	return true;
}
