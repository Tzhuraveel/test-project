import { Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql/error';
import { JsonWebTokenError } from 'jsonwebtoken';

@Catch(HttpException, JsonWebTokenError)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException | any) {
    if (
      exception.message === 'jwt expired' ||
      exception.message === 'jwt malformed'
    ) {
      throw new GraphQLError(exception.message, {
        extensions: { code: 'Unauthorized' },
      });
    }

    const response: any = exception.getResponse();
    throw new GraphQLError(response.message, {
      extensions: { code: response.error },
    });
  }
}
