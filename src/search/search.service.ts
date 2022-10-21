import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import Article from 'src/articles/entities/article.entity';

import { ArticleSearch } from 'src/search/types/article-search.interface';


@Injectable()
export default class SearchService {
  index = 'articles'

  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) { }

  async indexArticle(article: ArticleSearch) {
    try {
      const result = await this.elasticsearchService.index<ArticleSearch>({
        index: this.index,
        document: {
          id: article.id,
          title: article.title,
          content: article.content,
        }
      })

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }

  }

  async search(text: string) {
    try {
      const result = await this.elasticsearchService.search<ArticleSearch>({
        index: this.index,
        query: {
          multi_match: {
            query: text,
            fields: ['title', 'content']
          }
        }
      })
  
      const hits = result.hits.hits;
  
      return hits.map((item) => item._source);
    } catch (error) {
      switch (error.statusCode) {
        case 404:
          throw new NotFoundException()
      
        default:
          throw new InternalServerErrorException(error.message)
      }
    }
  }

  async remove(article: number) {
    this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: article,
          }
        }
      }
    })
  }

  async update(article: Article) {
    const newBody: ArticleSearch = {
      id: article.id,
      title: article.title,
      content: article.content,
    }

    const script = Object.entries(newBody).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');

    return this.elasticsearchService.updateByQuery({
      index: this.index,
      refresh: true,
      query: {
        match: {
          id: article.id,
        }
      },
      script: {
        lang: 'painless',
        source: script,
      },
    })
  }
}
