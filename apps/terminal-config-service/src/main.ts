import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TerminalConfigServiceModule } from './terminal-config-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TerminalConfigServiceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'terminal-config',
          brokers: ['kafka-service:9092'],
        },
        producerOnlyMode: true,
        consumer: {
          groupId: 'terminal-config-consumer',
        },
      },
    },
  );
  await app.listen();
  console.log('Terminal config service is now running !');
}
bootstrap();
