import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResFormator } from './api-format-class';

@Catch(HttpException)
export class CommonHttpExceptionFilter implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { message } = exception.response;
    const status = exception.getStatus();
    response.status(status).json(new ResFormator(new Error(message)));
  }
}
