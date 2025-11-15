import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TerminalDetailServiceModule } from './terminal-detail-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TerminalDetailServiceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'terminal-detail',
          brokers: ['kafka-service:9092'],
        },
        producerOnlyMode: true,
        consumer: {
          groupId: 'terminal-detail-consumer',
        },
      },
    },
  );
  await app.listen();
  console.log('Terminal detail service is now running !');
}
bootstrap();
