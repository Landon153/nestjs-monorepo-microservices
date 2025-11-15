import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TerminalService } from 'apps/terminal/src/terminal.service';
import { CreateTerminalDetailDto } from '@app/common/dto/terminal-detail/create-terminal-detail.dto';
import { TerminalDetailEntity } from '@app/common/entities/terminal-detail.entity';
import { TerminalEntity } from '@app/common/entities/terminal.entity';
import { formatUTC } from '@app/common/utils/date';
import { OperationEntity } from '@app/common/entities/operation-type.entity';
import { CreateOperationDto } from '@app/common/dto/operation/create-operation.dto';
import { CreateCarrierDto } from '@app/common/dto/carrier/create-carrier.dto';
import { CarrierEntity } from '@app/common/entities/carrier-type.entity';
import { LogoEntity } from '@app/common/entities/logo.entity';
import { DestinationStore } from '@app/common/types';

@Injectable()
export class TerminalDetailService {
  constructor(
    @InjectRepository(TerminalDetailEntity)
    private readonly terminalDetailRepository: Repository<TerminalDetailEntity>,
    @InjectRepository(OperationEntity)
    private readonly operationEntity: Repository<OperationEntity>,
    @InjectRepository(CarrierEntity)
    private readonly carrierEntity: Repository<CarrierEntity>,
    @InjectRepository(LogoEntity)
    private readonly logoRepository: Repository<LogoEntity>,
    private readonly terminalService: TerminalService,
  ) {}

  // -------------- For terminal detail methods
  async create(createTerminalDetailDto: CreateTerminalDetailDto) {
    await this.terminalService.findOne(createTerminalDetailDto.terminal);

    const created = await this.terminalDetailRepository.insert(
      createTerminalDetailDto,
    );

    return JSON.stringify(created);
  }

  async findAll(): Promise<TerminalDetailEntity[]> {
    const terDetail = await this.terminalDetailRepository.find();
    return terDetail.map((terminal) => ({
      ...terminal,
      createdDate: formatUTC(terminal.createdDate),
      updatedDate: formatUTC(terminal.updatedDate),
    }));
  }

  async findOneBelong(terminalCode: string) {
    await this.terminalService.findOne(terminalCode);
    let exist = await this.terminalDetailRepository.findOne({
      relations: ['terminal'],
      where: {
        terminal: {
          code: terminalCode,
        },
      },
    });

    exist = {
      ...exist,
      createdDate: formatUTC(exist.createdDate),
      updatedDate: formatUTC(exist.updatedDate),
      terminal: {
        ...(exist.terminal as TerminalEntity),
        createdDate: formatUTC(exist.terminal['createdDate']),
        updatedDate: formatUTC(exist.terminal['updatedDate']),
      },
    };
    return JSON.stringify(exist);
  }

  // -------------- For operation methods
  async createOperation(createOperationDto: CreateOperationDto) {
    await this.terminalService.findOne(createOperationDto.terminal);

    const created = await this.operationEntity.insert(createOperationDto);

    return JSON.stringify(created);
  }

  async findAllOperation() {
    const operations = await this.operationEntity.find();
    return operations.map((terminal) => ({
      ...terminal,
      createdDate: formatUTC(terminal.createdDate),
      updatedDate: formatUTC(terminal.updatedDate),
    }));
  }

  async findOperationBelong(terminalCode: string) {
    const exist = await this.operationEntity.findOne({
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

  async createCarrier(createCarrierDto: CreateCarrierDto): Promise<string> {
    await this.terminalService.findOne(createCarrierDto.terminal);

    const created = await this.carrierEntity.insert(createCarrierDto);
    return JSON.stringify(created);
  }

  async findAllCarriers() {
    const carrier = await this.carrierEntity.find();
    return carrier.map((terminal) => ({
      ...terminal,
      createdDate: formatUTC(terminal.createdDate),
      updatedDate: formatUTC(terminal.updatedDate),
    }));
  }

  async findCarrierBelong(terminalCode: string) {
    await this.terminalService.findOne(terminalCode);
    const exist = await this.carrierEntity.findOne({
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

  async createLogo(
    file: Express.Multer.File,
    storage: DestinationStore,
    terminalCode: string,
  ) {
    await this.terminalService.findOne(terminalCode);
    let exist: any;

    switch (storage) {
      case 'LOGO':
        exist = await this.logoRepository.findOne({
          relations: ['terminal'],
          where: {
            terminal: {
              code: terminalCode,
            },
          },
        });
        if (!exist) {
          const created = await this.logoRepository.insert({
            logo: `logo/${file.originalname}`,
            terminal: terminalCode,
          });

          return JSON.stringify(created);
        } else {
          const updated = await this.logoRepository
            .createQueryBuilder()
            .relation(TerminalEntity, 'logo')
            .update(LogoEntity)
            .set({
              logo: `logo/${file.originalname}`,
            })
            .where('terminal = :terminalCode', { terminalCode })
            .execute();

          return JSON.stringify(updated);
        }
      case 'NAME':
        exist = await this.logoRepository.findOne({
          relations: ['terminal'],
          where: {
            terminal: {
              code: terminalCode,
            },
          },
        });

        if (!exist) {
          const created = await this.logoRepository.insert({
            name: `name/${file.originalname}`,
            terminal: terminalCode,
          });

          return JSON.stringify(created);
        } else {
          const updated = await this.logoRepository
            .createQueryBuilder()
            .relation(TerminalEntity, 'logo')
            .update(LogoEntity)
            .set({
              name: `name/${file.originalname}`,
            })
            .where('terminal = :terminalCode', { terminalCode })
            .execute();

          return JSON.stringify(updated);
        }

      case 'LOGO_AND_NAME':
        exist = await this.logoRepository.findOne({
          relations: ['terminal'],
          where: {
            terminal: {
              code: terminalCode,
            },
          },
        });

        if (!exist) {
          const created = await this.logoRepository.insert({
            logoAndName: `logo_and_name/${file.originalname}`,
            terminal: terminalCode,
          });
          return JSON.stringify(created);
        } else {
          const updated = await this.logoRepository
            .createQueryBuilder()
            .relation(TerminalEntity, 'logo')
            .update(LogoEntity)
            .set({
              logoAndName: `logo_and_name/${file.originalname}`,
            })
            .where('terminal = :terminalCode', { terminalCode })
            .execute();

          return JSON.stringify(updated);
        }

      default:
        return new Promise((resolve, reject) =>
          reject({
            detail:
              'Storage was not defined on query parameter !. Please define a storage one of these options [LOGO, NAME, LOGO_NAME]',
          }),
        );
    }
  }
}
