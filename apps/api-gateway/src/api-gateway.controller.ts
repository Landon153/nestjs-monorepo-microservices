import { CreateTerminalDto } from '@app/common';
import { CreateCarrierDto } from '@app/common/dto/carrier/create-carrier.dto';
import { CreateOperationDto } from '@app/common/dto/operation/create-operation.dto';
import { CreateTermnalConfigDto } from '@app/common/dto/terminal-config/create-termnal-config.dto';
import { CreateTerminalDetailDto } from '@app/common/dto/terminal-detail/create-terminal-detail.dto';
import { CreateTerminalLogoDto } from '@app/common/dto/terminal-detail/create-terminal-logo.dto';

import { DestinationStore } from '@app/common/types';
import { diskStorageOptions, fileFilterOptions } from '@app/common/utils/file';
import {
  Body,
  Controller,
  Get,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { catchError, Observable } from 'rxjs';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('terminal')
  createTerminal(
    @Body() createTerminalDto: CreateTerminalDto,
  ): Observable<any> {
    return this.apiGatewayService.createTerminal(createTerminalDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get('terminal')
  findTerminals(@Query('terminal-code') code: string) {
    return this.apiGatewayService.getTerminals(code).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  // Terminal detail
  @Post('terminal-detail')
  createTerminalDetail(
    @Body() createTerminalDto: CreateTerminalDetailDto,
  ): Observable<any> {
    return this.apiGatewayService.createTerminalDetail(createTerminalDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get('terminal-detail')
  findTerminalsDetail(@Query('terminal-code') code: string): Observable<any> {
    return this.apiGatewayService.getTerminalsDetail(code).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  // Terminal config
  @Post('terminal-config')
  createTerminalConfig(
    @Body() createTerminalConfigDto: CreateTermnalConfigDto,
  ): Observable<any> {
    return this.apiGatewayService
      .createTerminalConfig(createTerminalConfigDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get('terminal-config')
  findTerminalConfig(@Query('terminal-code') code: string): Observable<any> {
    return this.apiGatewayService.getTerminalsConfig(code).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  // Operation
  @Post('operation')
  createOperation(
    @Body() createOperationDto: CreateOperationDto,
  ): Observable<any> {
    return this.apiGatewayService.createOperation(createOperationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get('operation')
  findOperation(@Query('terminal-code') code: string): Observable<any> {
    return this.apiGatewayService.getOperation(code).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  // ------- CARRIER -------
  @Post('carrier')
  createCarrier(@Body() createCarrierDto: CreateCarrierDto): Observable<any> {
    return this.apiGatewayService.createCarrier(createCarrierDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get('carrier')
  findCarrier(@Query('terminal-code') code: string): Observable<any> {
    return this.apiGatewayService.getCarrier(code).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('terminal-logo/upload-files')
  @UseInterceptors(
    FileInterceptor('logo', {
      fileFilter: (req: Request, file: Express.Multer.File, cb) =>
        fileFilterOptions(file, cb),
      limits: {
        files: 1,
      },
      storage: diskStorage(diskStorageOptions),
    }),
  )
  uploadFiles(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
      }),
    )
    logo: Express.Multer.File,
    @Query('storage') storage: DestinationStore,
    @Body()
    createTerminalLogoDto: CreateTerminalLogoDto,
  ) {
    const { terminal } = createTerminalLogoDto;
    return this.apiGatewayService.createLogo(logo, storage, terminal).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
