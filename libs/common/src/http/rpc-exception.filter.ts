import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';

@Catch(RpcException)
export class RpcExceptionOne implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const err = exception.getError();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    response.json({
      code: err['code'],
      message: err['detail'],
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
