import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export default class AppExceptionsFilter implements ExceptionFilter {
  private readonly _adapter: HttpAdapterHost;

  constructor(adapter: HttpAdapterHost) {
    this._adapter = adapter;
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this._adapter;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const httpResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    const responseBody = {
      ok: false,
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      message: httpResponse,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
