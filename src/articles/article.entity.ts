import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Tag } from '../tags/tag.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  slug!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column('text')
  body!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(
    () => User,
    user => user.articles,
  )
  author!: User;

  @ManyToMany(
    () => User,
    user => user.favorites,
  )
  favoritedBy!: User[];

  @ManyToMany(
    () => Tag,
    tag => tag.articles,
  )
  @JoinTable({ name: 'article_tag' })
  tags!: Tag[];

  @OneToMany(
    () => Comment,
    comment => comment.article,
  )
  comments!: Comment[];
}
