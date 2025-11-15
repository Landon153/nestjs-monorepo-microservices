import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TerminalController } from './terminal.controller';
import { TerminalService } from './terminal.service';

import { ENV_DEV } from '@app/common/joi/database.joi';
import { TerminalEntity } from '@app/common/entities/terminal.entity';
import { TerminalDetailEntity } from '@app/common/entities/terminal-detail.entity';
import { TerminalConfigEntity } from '@app/common/entities/terminal-config.entity';
import { OperationEntity } from '@app/common/entities/operation-type.entity';
import { CarrierEntity } from '@app/common/entities/carrier-type.entity';
import { LogoEntity } from '@app/common/entities/logo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/terminal-config-service/.env.dev',
      validationSchema: ENV_DEV,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          TerminalEntity,
          TerminalDetailEntity,
          TerminalConfigEntity,
          OperationEntity,
          CarrierEntity,
          LogoEntity,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      TerminalEntity,
      TerminalDetailEntity,
      TerminalConfigEntity,
      OperationEntity,
      CarrierEntity,
      LogoEntity,
    ]),
  ],
  controllers: [TerminalController],
  providers: [TerminalService],
  exports: [TerminalService],
})
export class TerminalServiceModule {}
