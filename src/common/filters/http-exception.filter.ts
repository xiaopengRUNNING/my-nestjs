import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status = exception.getStatus();
    const responseInfo = exception.getResponse() as object;

    response.status(status).send({
      statusCode: status,
      ...responseInfo,
      url: request.url,
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
    });
  }
}
