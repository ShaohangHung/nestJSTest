import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(`HttpExceptionFilter in`);
    // const rpcCtx: RpcArgumentsHost = host.switchToRpc(); // MicroService 的封裝內容
    // const httpCtx: HttpArgumentsHost = host.switchToHttp(); // REST 的封裝內容
    // const wsCtx: WsArgumentsHost = host.switchToWs(); // WebSocket 的封裝內容
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;
    const timestamp = new Date().toISOString();
    const responseObject = {
      code: status,
      message,
      timestamp,
    };
    response.status(status).json(responseObject);
  }
}
