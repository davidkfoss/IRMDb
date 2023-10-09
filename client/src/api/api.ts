import { Movie } from '../models/movie';

export interface API {
  getMovie: (id: string) => Promise<Movie>;
}
