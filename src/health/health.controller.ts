
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService, HealthCheck,
  TypeOrmHealthIndicator, HttpHealthIndicator,
} from '@nestjs/terminus';
import { ElasticsearchHealthIndicator } from 'src/health/indicators/elasticsearch.health-indicator';

@Controller('health')
class HealthController {
  constructor(
    private health: HealthCheckService,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private httpHealthIndicator: HttpHealthIndicator,
    private elasticsearchHealthIndicator: ElasticsearchHealthIndicator,
  ) { }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.typeOrmHealthIndicator.pingCheck('database'),
      () => this.httpHealthIndicator.pingCheck('supertokens', 'http://localhost:3567/hello'),
      () => this.httpHealthIndicator.pingCheck('pgadmin', 'http://localhost:8080'),
      () => this.elasticsearchHealthIndicator.isHealthy('elasticsearch')
    ]);
  }
}

export default HealthController;
