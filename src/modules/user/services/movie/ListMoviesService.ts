import { injectable, inject } from 'tsyringe';

import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { IPagingResponse } from '@shared/utils';
import IMovieRepository from '@modules/movie/repositories/IMovieRepository';
import { formatMovieEntity, IFormattedMovie } from '@modules/user/utils';

@injectable()
export default class ListMoviesService {
  constructor(
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}

  public async execute(
    paging: IPagingTypeORM,
  ): Promise<IPagingResponse<IFormattedMovie>> {
    const { results, ...response } = await this.movieRepository.find(paging);

    return { results: results.map(formatMovieEntity), ...response };
  }
}
