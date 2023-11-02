import moment from 'moment';

export const getYear = (date: string) => date.split('-')[0];

export const parseDate = (date: string) => new Date(date);

export const parseMillisecondsString = (milliseconds: string) => moment(parseInt(milliseconds, 10)).fromNow();
