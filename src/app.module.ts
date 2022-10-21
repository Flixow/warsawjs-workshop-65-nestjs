import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from 'src/config/configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import HealthController from './health/health.controller';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        connectionURI: config.get('supertokens.connectionURI'),
        apiKey: config.get('supertokens.apiKey'),
        appInfo: {
          appName: 'WarsawJS Workshop 65',
          apiDomain: config.get('supertokens.apiDomain'),
          websiteDomain: config.get('supertokens.websiteDomain'),
          apiBasePath: `/auth`,
          websiteBasePath: '/auth'
        },
      }),
      inject: [ConfigService],
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
