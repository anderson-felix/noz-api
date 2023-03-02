import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { RoleEnum } from '@modules/user/interfaces/RoleEnum';
import UserMovieRelation from '@modules/movie/infra/typeorm/entities/UserMovieRelation';
import Movie from '@modules/movie/infra/typeorm/entities/Movie';

@Entity('user')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: RoleEnum })
  role: RoleEnum;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserMovieRelation, relation => relation.user)
  rated_movies: UserMovieRelation[];

  @OneToMany(() => Movie, movie => movie.user_creator)
  created_movies: Movie[];
}
