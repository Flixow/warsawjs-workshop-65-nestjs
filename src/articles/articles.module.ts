import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Article from 'src/articles/entities/article.entity';
import { SearchModule } from 'src/search/search.module';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    SearchModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
