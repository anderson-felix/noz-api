import { injectable, inject } from 'tsyringe';

import { logger, updateEntity } from '@shared/utils';
import { LocaleError } from '@shared/errors/LocaleError';
import IMovieRepository from '@modules/movie/repositories/IMovieRepository';
import User from '@modules/user/infra/typeorm/entities/User';
import Movie from '@modules/movie/infra/typeorm/entities/Movie';

interface IRequest {
  user: User;
  movie_id: string;
  name?: string;
  director?: string;
  genres?: string[];
  actors?: string[];
}

@injectable()
export default class UpdateMovieService {
  constructor(
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}

  public async execute({
    user,
    movie_id,
    ...params
  }: IRequest): Promise<Movie> {
    const movie = await this.movieRepository.findById(movie_id);
    if (!movie) throw new LocaleError('movieNotFound');
    if (movie.created_by !== user.id)
      throw new LocaleError('operationNotPermitted');

    if (params.name && params.name !== movie.name) {
      const movieWithSameName = await this.movieRepository.findByName(
        params.name,
      );
      if (movieWithSameName) throw new LocaleError('movieAlreadyExists');
    }

    updateEntity(movie, params);

    await this.movieRepository.save(movie);

    logger.info(
      `MOVIE UPDATED BY: ${user.email} - ${JSON.stringify(movie, null, 4)}`,
    );

    return movie;
  }
}
