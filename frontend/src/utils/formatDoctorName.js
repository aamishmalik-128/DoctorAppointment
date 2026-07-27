/**
 * Formats a doctor's name to ensure it starts with 'Dr.' if it doesn't already contain Dr, Dr., dr, or Doctor.
 * @param {string} name 
 * @returns {string}
 */
export const formatDoctorName = (name) => {
    if (!name) return "Dr. Practitioner";
    const trimmed = name.trim();
    if (/^(dr\.?|doctor)\b/i.test(trimmed)) {
        return trimmed;
    }
    return `Dr. ${trimmed}`;
};
