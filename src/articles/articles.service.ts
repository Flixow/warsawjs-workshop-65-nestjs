import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Article from 'src/articles/entities/article.entity';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>
  ) {}

  async getAll(): Promise<Article[]> {
    return this.articlesRepository.find();
  }

  async getById(id: number): Promise<Article> {
    const article = await this.articlesRepository.findOneBy({ id });
    if (article) {
      return article;
    }
    throw new NotFoundException('Article not found');
  }

  async createArticle(article: CreateArticleDto): Promise<Article> {
    const newArticle = await this.articlesRepository.create(article);
    await this.articlesRepository.save(newArticle);

    return newArticle;
  }

  async deleteArticle(id: number) {
    const deleteResponse = await this.articlesRepository.delete(id);

    if (!deleteResponse.affected) {
      throw new NotFoundException('Post not found');
    }
  }
}
