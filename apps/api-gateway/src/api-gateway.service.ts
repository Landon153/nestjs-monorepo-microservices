import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { CreateTerminalDto } from '@app/common';
import { OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateTerminalDetailDto } from '@app/common/dto/terminal-detail/create-terminal-detail.dto';
import { CreateTermnalConfigDto } from '@app/common/dto/terminal-config/create-termnal-config.dto';
import { CreateOperationDto } from '@app/common/dto/operation/create-operation.dto';
import { CreateCarrierDto } from '@app/common/dto/carrier/create-carrier.dto';
import { DestinationStore } from '@app/common/types';

@Injectable()
export class ApiGatewayService implements OnModuleInit {
  constructor(
    @Inject('TERMINAL') private readonly terminalClient: ClientKafka,
    @Inject('TERMINAL_DETAIL')
    private readonly terminalDetailClient: ClientKafka,
    @Inject('TERMINAL_CONFIG')
    private readonly terminalConfigClient: ClientKafka,
  ) {}
  async onModuleInit() {
    this.terminalClient.subscribeToResponseOf('terminal-creating');
    this.terminalClient.subscribeToResponseOf('terminal-listing');

    this.terminalDetailClient.subscribeToResponseOf('terminal-detail-creating');
    this.terminalDetailClient.subscribeToResponseOf('terminal-detail-listing');

    this.terminalConfigClient.subscribeToResponseOf('terminal-config-creating');
    this.terminalConfigClient.subscribeToResponseOf('terminal-config-listing');

    this.terminalDetailClient.subscribeToResponseOf('operation-creating');
    this.terminalDetailClient.subscribeToResponseOf('operation-listing');

    this.terminalDetailClient.subscribeToResponseOf('carrier-creating');
    this.terminalDetailClient.subscribeToResponseOf('carrier-listing');

    this.terminalDetailClient.subscribeToResponseOf('logo-creating');

    await this.terminalClient.connect();
    await this.terminalDetailClient.connect();
    await this.terminalConfigClient.connect();
  }

  createTerminal(createTerminalDto: CreateTerminalDto): Observable<any> {
    return this.terminalClient.send('terminal-creating', createTerminalDto);
  }

  getTerminals(code: string) {
    return this.terminalClient.send('terminal-listing', code || '');
  }

  createTerminalDetail(
    createTerminalDto: CreateTerminalDetailDto,
  ): Observable<any> {
    return this.terminalDetailClient.send(
      'terminal-detail-creating',
      createTerminalDto,
    );
  }

  getTerminalsDetail(code: string): Observable<any> {
    return this.terminalDetailClient.send(
      'terminal-detail-listing',
      code || '',
    );
  }

  createTerminalConfig(
    createTerminalConfigDto: CreateTermnalConfigDto,
  ): Observable<any> {
    return this.terminalConfigClient.send(
      'terminal-config-creating',
      createTerminalConfigDto,
    );
  }

  getTerminalsConfig(code: string): Observable<any> {
    return this.terminalConfigClient.send(
      'terminal-config-listing',
      code || '',
    );
  }

  createOperation(createOperationDto: CreateOperationDto): Observable<any> {
    return this.terminalDetailClient.send(
      'operation-creating',
      createOperationDto,
    );
  }

  getOperation(code: string): Observable<any> {
    return this.terminalDetailClient.send('operation-listing', code || '');
  }

  createCarrier(createCarrierDto: CreateCarrierDto): Observable<any> {
    return this.terminalDetailClient.send('carrier-creating', createCarrierDto);
  }

  getCarrier(code: string): Observable<any> {
    return this.terminalDetailClient.send('carrier-listing', code || '');
  }

  createLogo(
    file: Express.Multer.File,
    storage: DestinationStore,
    terminalCode: string,
  ): Observable<any> {
    return this.terminalDetailClient.send('logo-creating', {
      file,
      storage,
      terminalCode,
    });
  }
}
