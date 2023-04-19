import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class DefaultExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    if (exception) {
      return response.status(statusCode).json(exception.getResponse());
    }

    return response.status(500).json({
      statusCode: 500,
      type: 'internal_server_error',
      message: 'Internal server error',
      solution: 'Try again later.',
    });
  }
}
