import { DynamicModule, MiddlewareConsumer, Module, NestModule, Provider } from '@nestjs/common';

import { AuthModuleAsyncConfig, AuthModuleConfig, ConfigInjectionToken } from './config.interface';
import { AuthMiddleware } from './auth.middleware';
import { SupertokensService } from './supertokens.service';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  static forRoot({ connectionURI, apiKey, appInfo }: AuthModuleConfig): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
        SupertokensService
      ],
      exports: [],
      imports: [],
    };
  }

  static forRootAsync(options: AuthModuleAsyncConfig): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);

    return {
      module: AuthModule,
      providers: [
        ...asyncProviders,
        SupertokensService
      ],
      imports: options.imports,
    };
  }

  private static createAsyncProviders(options: AuthModuleAsyncConfig): Provider[] {
    if (options.useFactory) {
      return [{
        provide: ConfigInjectionToken,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }];
    }

    return [];
  }
}
