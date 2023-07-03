import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const BearerToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const token =
      GqlExecutionContext.create(ctx).getContext().req?.headers?.authorization;

    if (!token && !token?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid Bearer Token');
    }

    return token.replace('Bearer ', '');
  },
);
