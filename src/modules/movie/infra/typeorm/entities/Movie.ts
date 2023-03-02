import User from '@modules/user/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import UserMovieRelation from './UserMovieRelation';

@Entity('movie')
export default class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  director: string;

  @Column({ type: 'json' })
  genres: string[];

  @Column({ type: 'json' })
  actors: string[];

  @Column({ type: 'uuid' })
  created_by: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserMovieRelation, relation => relation.movie)
  user_relations: UserMovieRelation[];

  @ManyToOne(() => User, user => user.created_movies)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  user_creator: User;

  @BeforeUpdate()
  @BeforeInsert()
  json2String() {
    this.genres_string = this.genres?.toString() || '';
    this.actors_string = this.actors?.toString() || '';
  }

  // Columns only to reflect json fileds
  @Column()
  genres_string?: string;

  @Column()
  actors_string?: string;
}
