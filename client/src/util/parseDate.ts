import moment from 'moment';

/**
 * Returns the year of a given date string.
 * @param date - The date string in the format of 'YYYY-MM-DD'.
 * @returns The year of the given date string.
 */
export const getYear = (date: string) => date.split('-')[0];

/**
 * Parses a unix timestamp string into a human-readable format of time elapsed since time provided.
 * The resulting format is 'X days ago', 'X hours ago', 'X minutes ago', or 'X seconds ago' and so on.
 * @param milliseconds - The string of milliseconds to be parsed.
 * @returns A human-readable string representing the time elapsed since the given milliseconds.
 */
export const parseMillisecondsString = (milliseconds: string) => moment(parseInt(milliseconds, 10)).fromNow();
