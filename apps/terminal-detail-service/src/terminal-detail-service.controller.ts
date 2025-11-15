import { Controller } from '@nestjs/common';
import { TerminalDetailService } from './terminal-detail-service.service';
import { CreateTerminalDetailDto } from '@app/common/dto/terminal-detail/create-terminal-detail.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateOperationDto } from '@app/common/dto/operation/create-operation.dto';
import { CreateCarrierDto } from '@app/common/dto/carrier/create-carrier.dto';
import { DestinationStore } from '@app/common/types';

@Controller()
export class TerminalDetailController {
  constructor(private readonly terminalDetailService: TerminalDetailService) {}

  @MessagePattern('terminal-detail-creating')
  async create(@Payload() createTerminalDetailDto: CreateTerminalDetailDto) {
    try {
      return await this.terminalDetailService.create(createTerminalDetailDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern('terminal-detail-listing')
  async findOne(@Payload() code: string) {
    try {
      if (code) return await this.terminalDetailService.findOneBelong(code);
      else return await this.terminalDetailService.findAll();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern('operation-creating')
  async createOperation(@Payload() createOperationDto: CreateOperationDto) {
    try {
      return await this.terminalDetailService.createOperation(
        createOperationDto,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern('operation-listing')
  async findOperation(@Payload() code: string) {
    try {
      if (code)
        return await this.terminalDetailService.findOperationBelong(code);
      else return await this.terminalDetailService.findAllOperation();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern('carrier-creating')
  async createCarrier(@Payload() createCarrierDto: CreateCarrierDto) {
    try {
      return await this.terminalDetailService.createCarrier(createCarrierDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern('carrier-listing')
  async findCarrier(@Payload() code: string) {
    try {
      if (code) return await this.terminalDetailService.findCarrierBelong(code);
      else return await this.terminalDetailService.findAllCarriers();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // TODO Change logic saving image
  @MessagePattern('logo-creating')
  async createLogo({
    file,
    storage,
    terminalCode,
  }: {
    file: Express.Multer.File;
    storage: DestinationStore;
    terminalCode: string;
  }) {
    try {
      return await this.terminalDetailService.createLogo(
        file,
        storage,
        terminalCode,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
