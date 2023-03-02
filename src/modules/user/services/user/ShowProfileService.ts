import { inject, injectable } from 'tsyringe';

import User from '@modules/user/infra/typeorm/entities/User';
import { formatUserEntity, IFormattedUser } from '@modules/user/utils';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import Movie from '@modules/movie/infra/typeorm/entities/Movie';
import UserMovieRelation from '@modules/movie/infra/typeorm/entities/UserMovieRelation';

interface IFormattedCreatedMovies {
  id: string;
  name: string;
  director: string;
  genres: string[];
  actors: string[];
}

interface IFormattedRatedMovies {
  id: string;
  name: string;
  director: string;
  rating: number;
  genres: string[];
  actors: string[];
}

interface IResponse extends IFormattedUser {
  created_movies: IFormattedCreatedMovies[];
  rated_movies: IFormattedRatedMovies[];
}

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(_user: User): Promise<IResponse> {
    const user = (await this.userRepository.findById(_user.id)) as User;
    const userFormatted = formatUserEntity(user);

    return {
      ...userFormatted,
      created_movies: this.formatCreatedMovies(user.created_movies),
      rated_movies: this.formatRatedMovies(user.rated_movies),
    };
  }

  private formatCreatedMovies(movies: Movie[]): IFormattedCreatedMovies[] {
    return movies.map(movie => ({
      id: movie.id,
      name: movie.name,
      director: movie.director,
      genres: movie.genres,
      actors: movie.actors,
    }));
  }

  private formatRatedMovies(
    relations: UserMovieRelation[],
  ): IFormattedRatedMovies[] {
    return relations.map(({ movie, rating }) => ({
      id: movie.id,
      name: movie.name,
      director: movie.director,
      genres: movie.genres,
      actors: movie.actors,
      rating,
    }));
  }
}
