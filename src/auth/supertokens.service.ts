import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword';

import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    private configService: ConfigService
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        UserMetadata.init(),
        ThirdPartyEmailPassword.init({
          providers: [
            ThirdPartyEmailPassword.Google({
              clientId: configService.get('supertokens.googleClientId'),
              clientSecret: configService.get('supertokens.googleClientSecret'),
            }),
            ThirdPartyEmailPassword.Github({
              clientSecret: configService.get(
                'supertokens.githubClientSecret'
              ),
              clientId: configService.get('supertokens.githubClientId'),
            }),
          ],
        }),
        Session.init({
          cookieDomain: configService.get('supertokens.cookieDomain'),
        }),
      ],
    });
  }
}
