import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TerminalServiceModule } from './terminal.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TerminalServiceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'terminal',
          brokers: ['kafka-service:9092'],
        },
        producerOnlyMode: true,
        consumer: {
          groupId: 'terminal-consumer',
        },
      },
    },
  );
  await app.listen();

  console.log('Terminal service is now running !');
}
bootstrap();
