import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Type } from './inheritance/detail-type.entity';
import { TerminalEntity } from './terminal.entity';

@Entity({ name: 'tb_carrier_type' })
export class CarrierEntity extends Type {
  @PrimaryGeneratedColumn({
    comment: 'id of carrier',
  })
  _id: string;

  @Column({
    type: 'varchar',
    comment: 'in TML of carrier',
  })
  inTML: string;

  @ManyToOne(() => TerminalEntity, (ref) => ref.carriers)
  @JoinColumn({
    referencedColumnName: 'code',
  })
  terminal: TerminalEntity | string;

  @CreateDateColumn()
  createdDate: Date | string;

  @UpdateDateColumn()
  updatedDate: Date | string;
}
