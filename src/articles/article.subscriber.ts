import {
  EntitySubscriberInterface,
  EventSubscriber,
  Connection,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Article } from './article.entity';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import slugify from 'slugify';

@Injectable()
@EventSubscriber()
export class ArticleSubscriber implements EntitySubscriberInterface<Article> {
  constructor(@InjectConnection() connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Article;
  }

  beforeInsert(event: InsertEvent<Article>) {
    this.slugifyTitle(event.entity);
  }

  beforeUpdate(event: UpdateEvent<Article>) {
    if (event.updatedColumns.some(column => column.propertyName === 'title')) {
      this.slugifyTitle(event.entity);
    }
  }

  private slugifyTitle(article: Article) {
    article.slug = slugify(article.title);
  }
}
