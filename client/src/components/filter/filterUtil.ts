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

export const hasFiltersChanged = (filters: Filters, prevFilters: Filters) => {
  return (
    !_.isEqual(filters.genres, prevFilters.genres) ||
    filters.sortBy !== prevFilters.sortBy ||
    filters.direction !== prevFilters.direction ||
    filters.search !== prevFilters.search
  );
};

export const setFiltersInSessionStorage = (filters: Filters) => {
  sessionStorage.setItem('filters', JSON.stringify(filters));
};

export const getFiltersFromSessionStorage = (): Filters => {
  const filters = sessionStorage.getItem('filters');
  return filters ? JSON.parse(filters) : initialFilters;
};
