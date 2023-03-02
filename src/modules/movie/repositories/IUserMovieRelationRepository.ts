import UserMovieRelation from '@modules/movie/infra/typeorm/entities/UserMovieRelation';
import ICreateUserMovieRelationDTO from '@modules/movie/dtos/ICreateUserMovieRelationDTO';

export interface IFindByUserAndMovieParams {
  user_id: string;
  movie_id: string;
}

export default interface IUserMovieRelationRepository {
  create(data: ICreateUserMovieRelationDTO): Promise<UserMovieRelation>;
  save(movie: UserMovieRelation): Promise<UserMovieRelation>;
  findById(id: string): Promise<UserMovieRelation | undefined>;
  findByUserAndMovie(
    data: IFindByUserAndMovieParams,
  ): Promise<UserMovieRelation | undefined>;
  remove(movie: UserMovieRelation): Promise<void>;
}
