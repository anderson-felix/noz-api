import { injectable, inject } from 'tsyringe';

import { logger } from '@shared/utils';
import { LocaleError } from '@shared/errors/LocaleError';
import User from '@modules/user/infra/typeorm/entities/User';
import IMovieRepository from '@modules/movie/repositories/IMovieRepository';

@injectable()
export default class DeleteMovieService {
  constructor(
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}

  public async execute(user: User, movie_id: string): Promise<void> {
    const movie = await this.movieRepository.findById(movie_id);
    if (!movie) throw new LocaleError('movieNotFound');
    if (movie.created_by !== user.id)
      throw new LocaleError('operationNotPermitted');

    await this.movieRepository.remove(movie);

    logger.info(
      `MOVIE DELETED BY: ${user.email} - ${JSON.stringify(movie, null, 4)}`,
    );
  }
}
