import { IsNotEmpty } from 'class-validator';

import Article from 'src/articles/entities/article.entity';

export class CreateArticleDto implements Partial<Article> {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public content: string;
}
