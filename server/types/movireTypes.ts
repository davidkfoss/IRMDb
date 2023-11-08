export interface QueryMoviesData {
  title?: object;
  genre?: object;
  rating?: object;
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
