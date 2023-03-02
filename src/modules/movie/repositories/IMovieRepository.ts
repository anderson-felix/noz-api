import Movie from '@modules/movie/infra/typeorm/entities/Movie';
import ICreateMovieDTO from '@modules/movie/dtos/ICreateMovieDTO';
import { IPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';

export default interface IMovieRepository {
  create(data: ICreateMovieDTO): Promise<Movie>;
  save(movie: Movie): Promise<Movie>;
  find(paging: IPagingTypeORM): Promise<IPagingResponse<Movie>>;
  findById(id: string): Promise<Movie | undefined>;
  findByName(name: string): Promise<Movie | undefined>;
  remove(movie: Movie): Promise<void>;
}
