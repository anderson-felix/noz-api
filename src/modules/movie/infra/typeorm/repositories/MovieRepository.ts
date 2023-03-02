import { getRepository, ILike, Repository } from 'typeorm';

import { formatPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import IMovieRepository from '@modules/movie/repositories/IMovieRepository';
import ICreateMovieDTO from '@modules/movie/dtos/ICreateMovieDTO';
import Movie from '../entities/Movie';

export default class MovieRepository implements IMovieRepository {
  private ormRepository: Repository<Movie>;

  constructor() {
    this.ormRepository = getRepository(Movie);
  }

  public async create(data: ICreateMovieDTO) {
    const movie = this.ormRepository.create(data);

    return await this.ormRepository.save(movie);
  }

  public async save(movie: Movie) {
    return await this.ormRepository.save(movie);
  }

  public async find(paging: IPagingTypeORM) {
    if (paging.where.genres) {
      paging.where.genres_string = ILike(`%${paging.where.genres._value}%`);
      delete paging.where.genres;
    }

    if (paging.where.actors) {
      paging.where.actors_string = ILike(`%${paging.where.actors._value}%`);
      delete paging.where.actors;
    }

    paging.relations = ['user_creator', 'user_relations'];
    const response = await this.ormRepository.findAndCount(paging);

    return formatPagingResponse(paging, response);
  }

  public async findById(id: string) {
    return await this.ormRepository.findOne({ where: { id } });
  }

  public async findByName(name: string) {
    return await this.ormRepository.findOne({ where: { name } });
  }

  public async remove(movie: Movie) {
    await this.ormRepository.remove(movie);
  }
}
