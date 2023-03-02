import User from '@modules/user/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Movie from './Movie';

@Entity('user_movie_relation')
export default class UserMovieRelation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  movie_id: string;

  @Column()
  rating: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.rated_movies)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Movie, movie => movie.user_relations)
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'id' })
  movie: Movie;
}
