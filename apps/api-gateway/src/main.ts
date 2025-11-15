import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ResponseInterceptor } from '@app/common/interceptor/response.interceptor';
import { RpcExceptionOne } from '@app/common/http/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new RpcExceptionOne());
  // app.enableCors({
  //   origin: ['http://localhost:30001'],
  // });
  await app.listen(3000, () => console.log('Server listening on port 3000'));
}
bootstrap();
