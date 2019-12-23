import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticleSubscriber } from './article.subscriber';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticleSubscriber],
})
export class ArticlesModule {}
