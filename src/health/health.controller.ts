
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService, HealthCheck,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
class HealthController {
  constructor(
    private health: HealthCheckService,
    private httpHealthIndicator: HttpHealthIndicator,
  ) { }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.httpHealthIndicator.responseCheck(
        'supertokens',
        'http://localhost:3567/hello',
        (res) => res.status === 200 && res.data === 'Hello\n',
      ),
      () => this.httpHealthIndicator.pingCheck(
        'pgadmin',
        'http://localhost:8080',
      ),
    ]);
  }
}

export default HealthController;