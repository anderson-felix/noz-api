import Movie from '@modules/movie/infra/typeorm/entities/Movie';
import { IRating } from '@modules/movie/interfaces/IRating';
import { formatUserEntity, IFormattedUser, makeRatingAverage } from '.';

export interface IFormattedMovie {
  id: string;
  name: string;
  director: string;
  genres: string[];
  actors: string[];
  user_creator: IFormattedUser;
  rating: IRating;
}

type FuncType = (movie: Movie) => IFormattedMovie;

export const formatMovieEntity: FuncType = movie => ({
  id: movie.id,
  name: movie.name,
  director: movie.director,
  genres: movie.genres,
  actors: movie.actors,
  rating: {
    average: makeRatingAverage(movie),
    total_quantity: movie.user_relations.length,
  },
  user_creator: formatUserEntity(movie.user_creator),
});
