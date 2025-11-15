import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TerminalConfigEntity } from '@app/common/entities/terminal-config.entity';
import { TerminalService } from 'apps/terminal/src/terminal.service';
import { CreateTermnalConfigDto } from '@app/common/dto/terminal-config/create-termnal-config.dto';
import { formatUTC } from '@app/common/utils/date';
import { TerminalEntity } from '@app/common/entities/terminal.entity';

@Injectable()
export class TerminalConfigService {
  constructor(
    @InjectRepository(TerminalConfigEntity)
    private readonly terminalConfigEntity: Repository<TerminalConfigEntity>,
    private readonly terminalService: TerminalService,
  ) {}

  async create(createTermnalConfigDto: CreateTermnalConfigDto) {
    await this.terminalService.findOne(createTermnalConfigDto.terminal);

    const created = await this.terminalConfigEntity.insert(
      createTermnalConfigDto,
    );
    return JSON.stringify(created);
  }

  async findAll() {
    const terConfigs = await this.terminalConfigEntity.find();
    return terConfigs.map((terminal) => ({
      ...terminal,
      createdDate: formatUTC(terminal.createdDate),
      updatedDate: formatUTC(terminal.updatedDate),
    }));
  }

  async findOneBelong(terminalCode: string) {
    await this.terminalService.findOne(terminalCode);
    const exist = await this.terminalConfigEntity.findOne({
      relations: ['terminal'],
      where: {
        terminal: {
          code: terminalCode,
        },
      },
    });

    return {
      ...exist,
      createdDate: formatUTC(exist.createdDate),
      updatedDate: formatUTC(exist.updatedDate),
      terminal: {
        ...(exist.terminal as TerminalEntity),
        createdDate: formatUTC(exist.terminal['createdDate']),
        updatedDate: formatUTC(exist.terminal['updatedDate']),
      },
    };
  }
}
