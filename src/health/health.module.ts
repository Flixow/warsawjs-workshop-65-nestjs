import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import HealthController from 'src/health/health.controller';
import { ElasticsearchHealthIndicator } from 'src/health/indicators/elasticsearch.health-indicator';
import { SearchModule } from 'src/search/search.module';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    SearchModule,
  ],
  controllers: [
    HealthController,
  ],
  providers: [
    ElasticsearchHealthIndicator,
  ],
})
export class HealthModule {}
