import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { Error as STError } from 'supertokens-node';
import { VerifySessionOptions } from 'supertokens-node/recipe/session';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';

export const AuthGuard = (options?: VerifySessionOptions): any => {
  class AuthGuardMixin implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = context.switchToHttp();

      let err = undefined;
      const resp = ctx.getResponse();

      await verifySession(options)(
        ctx.getRequest(),
        resp,
        (res) => {
          err = res;
        },
      );

      if (resp.headersSent) {
        throw new STError({
          message: 'RESPONSE_SENT',
          type: 'RESPONSE_SENT',
        });
      }

      if (err) {
        throw err;
      }

      return true;
    }
  }

  return mixin(AuthGuardMixin);
};
