import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'libs/public'),
    }),
    ClientsModule.register([
      {
        name: 'TERMINAL',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'terminal',
            brokers: ['kafka-service:9092'],
          },
          consumer: {
            groupId: 'terminal-consumer',
          },
        },
      },
      {
        name: 'TERMINAL_DETAIL',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'terminal-detail',
            brokers: ['kafka-service:9092'],
          },
          consumer: {
            groupId: 'terminal-detail-consumer',
          },
        },
      },
      {
        name: 'TERMINAL_CONFIG',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'terminal-config',
            brokers: ['kafka-service:9092'],
          },
          consumer: {
            groupId: 'terminal-config-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
