import { injectable, inject } from 'tsyringe';

import { logger } from '@shared/utils';
import IMovieRepository from '@modules/movie/repositories/IMovieRepository';
import User from '@modules/user/infra/typeorm/entities/User';
import ICreateMovieDTO from '@modules/movie/dtos/ICreateMovieDTO';
import Movie from '@modules/movie/infra/typeorm/entities/Movie';
import { LocaleError } from '@shared/errors/LocaleError';

interface IRequest extends Omit<ICreateMovieDTO, 'created_by'> {
  user: User;
}

@injectable()
export default class CreateMovieService {
  constructor(
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}

  public async execute({ user, ...req }: IRequest): Promise<Movie> {
    const movieWithSameName = await this.movieRepository.findByName(req.name);
    if (movieWithSameName) throw new LocaleError('movieAlreadyExists');

    const params: ICreateMovieDTO = { ...req, created_by: user.id };
    const movie = await this.movieRepository.create(params);

    logger.info(
      `MOVIE CREATED BY: ${user.email} - ${JSON.stringify(params, null, 4)}`,
    );

    return movie;
  }
}
