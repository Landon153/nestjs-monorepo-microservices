import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CarrierEntity } from './carrier-type.entity';
import { LogoEntity } from './logo.entity';
import { OperationEntity } from './operation-type.entity';
import { TerminalConfigEntity } from './terminal-config.entity';
import { TerminalDetailEntity } from './terminal-detail.entity';

@Entity({ name: 'tb_terminal' })
export class TerminalEntity {
  @PrimaryGeneratedColumn({
    comment: 'id auto gen for terminal',
  })
  _id: string;

  @Column({
    name: 'code',
    type: 'varchar',
    nullable: false,
    unique: true,
    comment: 'Barcode of terminal',
  })
  code: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
    comment: 'name of the terminal',
  })
  name: string;

  @OneToOne(() => TerminalDetailEntity, (ref) => ref.terminal)
  detail: TerminalDetailEntity;

  @OneToOne(() => LogoEntity, (ref) => ref.terminal)
  logo: LogoEntity;

  @OneToMany(() => OperationEntity, (ref) => ref.terminal)
  operations: OperationEntity[];

  @OneToMany(() => CarrierEntity, (ref) => ref.terminal)
  carriers: CarrierEntity[];

  @OneToMany(() => TerminalConfigEntity, (ref) => ref.terminal)
  configs: TerminalConfigEntity[];

  @CreateDateColumn()
  createdDate: Date | string;

  @UpdateDateColumn()
  updatedDate: Date | string;
}
