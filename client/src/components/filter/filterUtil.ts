import _ from 'lodash';
import { Direction, directions } from './ascDesc/direction';
import { Genre } from './genreSelect/genre';
import { SortOption, sortOptions } from './sortBy/sortOptions';

export interface Filters {
  genres: Genre[];
  sortBy: SortOption;
  direction: Direction;
  search: string;
}

export const initialFilters: Filters = {
  genres: [],
  sortBy: sortOptions[0],
  direction: directions[1],
  search: '',
};

/**
 * Determines if the filters have changed from the previous filters.
 * @param filters - The current filters.
 * @param prevFilters - The previous filters.
 * @returns True if the filters have changed, false otherwise.
 */
export const hasFiltersChanged = (filters: Filters, prevFilters: Filters) => {
  return (
    !_.isEqual(filters.genres, prevFilters.genres) ||
    filters.sortBy !== prevFilters.sortBy ||
    filters.direction !== prevFilters.direction ||
    filters.search !== prevFilters.search
  );
};

/**
 * Sets the given filters object in the session storage as a JSON string.
 * @param filters - The filters object to be stored in session storage.
 */
export const setFiltersInSessionStorage = (filters: Filters) => {
  sessionStorage.setItem('filters', JSON.stringify(filters));
};

/**
 * Retrieves filters from session storage or returns initial filters if none are found.
 * @returns {Filters} The filters object.
 */
export const getFiltersFromSessionStorage = (): Filters => {
  const filters = sessionStorage.getItem('filters');
  return filters ? JSON.parse(filters) : initialFilters;
};
