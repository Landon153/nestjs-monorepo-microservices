import { CreateTerminalDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TerminalEntity } from '@app/common/entities/terminal.entity';
import { formatUTC } from '@app/common/utils/date';

@Injectable()
export class TerminalService {
  constructor(
    @InjectRepository(TerminalEntity)
    private readonly terminalEntity: Repository<TerminalEntity>,
  ) {}

  async create(createTerminalDto: CreateTerminalDto) {
    const created = await this.terminalEntity.insert(createTerminalDto);
    return JSON.stringify(created);
  }

  async findAll() {
    const terminals = await this.terminalEntity.find();
    return terminals.map((terminal) => ({
      ...terminal,
      createdDate: formatUTC(terminal.createdDate),
      updatedDate: formatUTC(terminal.updatedDate),
    }));
  }

  async findOne(code: string) {
    const exist = await this.terminalEntity.findOne({
      relations: ['detail', 'operations', 'carriers', 'configs'],
      where: {
        code,
      },
    });
    return new Promise((resolve, reject) => {
      if (!exist) reject({ detail: 'This terminal does not exist !' });
      else resolve(JSON.stringify(exist));
    });
  }
}
