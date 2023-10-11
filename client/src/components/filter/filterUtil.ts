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
  direction: directions[0],
  search: '',
};
