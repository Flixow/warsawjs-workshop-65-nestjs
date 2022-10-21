import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { ArticlesService } from 'src/articles/articles.service';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(
    private articlesService: ArticlesService
  ) {}

  @Get('')
  getAll(@Query('search') search: string) {
    if (search) {
      return this.articlesService.searchForArticles(search);
    }
    return this.articlesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.articlesService.getById(Number(id));
  }

  @Delete(':id')
  deleteArticle(@Param('id') id: string) {
    return this.articlesService.deleteArticle(Number(id));
  }

  @Post('')
  createArticle(@Body() payload: CreateArticleDto) {
    return this.articlesService.createArticle(payload);
  }
}
