import {
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Entity,
} from 'typeorm';
import { Article } from '../articles/article.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(
    () => Article,
    article => article.tags,
  )
  articles!: Article[];
}
