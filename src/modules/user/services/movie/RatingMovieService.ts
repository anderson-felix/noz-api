import { injectable, inject } from 'tsyringe';

import { logger } from '@shared/utils';
import { LocaleError } from '@shared/errors/LocaleError';
import IMovieRepository from '@modules/movie/repositories/IMovieRepository';
import User from '@modules/user/infra/typeorm/entities/User';
import Movie from '@modules/movie/infra/typeorm/entities/Movie';
import movieConfig from '@config/movie';
import IUserMovieRelationRepository from '@modules/movie/repositories/IUserMovieRelationRepository';

interface IRequest {
  user: User;
  movie_id: string;
  rating: number;
}

@injectable()
export default class RatingMovieService {
  constructor(
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,

    @inject('UserMovieRelationRepository')
    private userMovieRelationRepository: IUserMovieRelationRepository,
  ) {}

  public async execute({ user, movie_id, rating }: IRequest): Promise<Movie> {
    const movie = await this.movieRepository.findById(movie_id);
    if (!movie) throw new LocaleError('movieNotFound');

    const { min, max } = movieConfig.rating;
    if (rating < min || rating > max) throw new LocaleError('invalidRating');

    const userMovieRelation =
      await this.userMovieRelationRepository.findByUserAndMovie({
        movie_id: movie.id,
        user_id: user.id,
      });

    const logDetails = JSON.stringify({ rating, movie }, null, 4);

    if (userMovieRelation) {
      userMovieRelation.rating = rating;
      await this.userMovieRelationRepository.save(userMovieRelation);
      logger.info(
        `MOVIE RATING REGISTER UPDATED BY: ${user.email} - ${logDetails}`,
      );
    } else {
      await this.userMovieRelationRepository.create({
        movie_id,
        rating,
        user_id: user.id,
      });
      logger.info(`MOVIE RATING REGISTERED BY: ${user.email} - ${logDetails}`);
    }

    return movie;
  }
}
