import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from 'src/config/configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { ArticlesModule } from './articles/articles.module';

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [
          __dirname + './**/*.entity.ts',
        ],
        // Do not use in production. Use migrations instead!
        synchronize: true,
        autoLoadEntities: true,
      })
    }),
    HealthModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
