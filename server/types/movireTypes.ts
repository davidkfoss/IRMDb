export interface QueryMoviesData {
  title?: {};
  genre?: {};
  rating?: {};
}

export interface QuerySortMoviesData {
  title?: number;
  rating?: number;
  releaseDate?: number;
  popularity?: number;
}

export interface QueryMoviesByFilterArgs {
  offset: number;
  limit: number;
  search: string;
  genre: string;
  sortBy: string;
  direction: string;
}
