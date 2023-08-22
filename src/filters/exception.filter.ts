import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch()
export class ErrorExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    const errorResponse = {
      statusCode: 500, // 自定义错误码
      message: exception.message, // 自定义错误信息
      url: ctx.getRequest().url, // 请求路径
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '), // 错误时间戳
    };

    response.status(500).send(errorResponse);
  }
}
