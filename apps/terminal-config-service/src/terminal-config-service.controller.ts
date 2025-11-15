import { CreateTermnalConfigDto } from '@app/common/dto/terminal-config/create-termnal-config.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { TerminalConfigService } from './terminal-config-service.service';

@Controller()
export class TerminalConfigController {
  constructor(private readonly terminalConfigService: TerminalConfigService) {}

  @MessagePattern('terminal-config-creating')
  async create(@Payload() createTermnalConfigDto: CreateTermnalConfigDto) {
    try {
      return await this.terminalConfigService.create(createTermnalConfigDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern('terminal-config-listing')
  async findOne(@Payload() code: string) {
    try {
      if (!code) return await this.terminalConfigService.findAll();
      else return await this.terminalConfigService.findOneBelong(code);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
