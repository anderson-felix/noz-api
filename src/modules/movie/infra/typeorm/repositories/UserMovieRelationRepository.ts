import { getRepository, Repository } from 'typeorm';

import IUserMovieRelationRepository, {
  IFindByUserAndMovieParams,
} from '@modules/movie/repositories/IUserMovieRelationRepository';
import ICreateUserMovieRelationDTO from '@modules/movie/dtos/ICreateUserMovieRelationDTO';
import UserMovieRelation from '../entities/UserMovieRelation';

export default class UserMovieRelationRepository
  implements IUserMovieRelationRepository
{
  private ormRepository: Repository<UserMovieRelation>;

  constructor() {
    this.ormRepository = getRepository(UserMovieRelation);
  }

  public async create(data: ICreateUserMovieRelationDTO) {
    const relation = this.ormRepository.create(data);

    return await this.ormRepository.save(relation);
  }

  public async save(relation: UserMovieRelation) {
    return await this.ormRepository.save(relation);
  }

  public async findById(id: string) {
    return await this.ormRepository.findOne({ where: { id } });
  }

  public async findByUserAndMovie({
    movie_id,
    user_id,
  }: IFindByUserAndMovieParams) {
    return await this.ormRepository.findOne({ where: { movie_id, user_id } });
  }

  public async remove(relation: UserMovieRelation) {
    await this.ormRepository.remove(relation);
  }
}
