import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User } from '../../core/database/entities';

export const UserData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    return GqlExecutionContext.create(ctx).getContext().req.user;
  },
);
