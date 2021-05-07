import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import * as ApolloErrors from 'apollo-server-errors';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();
    console.log(`[Exception] ${new Date().toISOString()} : ${exception.message}`);
    if ( exception instanceof NotFoundException ) {
      throw new ApolloErrors.UserInputError(exception.message);
    } else if ( exception instanceof ForbiddenException ) {
      throw new ApolloErrors.ForbiddenError(exception.message);
    }
    throw new ApolloErrors.ApolloError(exception.message);
  }
}