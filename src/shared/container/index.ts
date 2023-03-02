import { container } from 'tsyringe';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import HashProvider from '@shared/container/providers/HashProvider/implementations/HashProvider';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';

import IMovieRepository from '@modules/movie/repositories/IMovieRepository';
import MovieRepository from '@modules/movie/infra/typeorm/repositories/MovieRepository';

import IUserMovieRelationRepository from '@modules/movie/repositories/IUserMovieRelationRepository';
import UserMovieRelationRepository from '@modules/movie/infra/typeorm/repositories/UserMovieRelationRepository';

container.register<IHashProvider>('HashProvider', HashProvider);

container.register<IUserRepository>('UserRepository', UserRepository);

container.register<IMovieRepository>('MovieRepository', MovieRepository);

container.register<IUserMovieRelationRepository>(
  'UserMovieRelationRepository',
  UserMovieRelationRepository,
);
