import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Article } from '../articles/article.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true, length: 16 })
  username!: string;

  @Column()
  passwordHash!: string;

  @Column('text', { nullable: true })
  bio?: string;

  @Column('text', { nullable: true })
  image?: string;

  @ManyToMany(
    () => User,
    user => user.followers,
  )
  @JoinTable({
    name: 'user_following',
    joinColumn: { name: 'follower_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'following_id', referencedColumnName: 'id' },
  })
  following!: User[];

  @ManyToMany(
    () => User,
    user => user.following,
  )
  followers!: User[];

  @ManyToMany(
    () => Article,
    article => article.favoritedBy,
  )
  @JoinTable({
    name: 'user_favorite',
  })
  favorites!: Article[];

  @OneToMany(
    () => Article,
    article => article.author,
  )
  articles!: Article[];

  @OneToMany(
    () => Comment,
    comment => comment.author,
  )
  comments!: Comment[];

  constructor(obj: Partial<User> = {}) {
    Object.assign(this, obj);
  }
}
