import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Type } from './inheritance/detail-type.entity';
import { TerminalEntity } from './terminal.entity';

@Entity({ name: 'tb_operation_type' })
export class OperationEntity extends Type {
  @PrimaryGeneratedColumn({
    comment: 'id of operation',
  })
  _id: string;

  @Column({
    type: 'varchar',
    comment: 'Prefix of operation',
  })
  prefix: string;

  @ManyToOne(() => TerminalEntity, (ref) => ref.operations)
  @JoinColumn({
    referencedColumnName: 'code',
  })
  terminal: TerminalEntity | string;

  @CreateDateColumn()
  createdDate: Date | string;

  @UpdateDateColumn()
  updatedDate: Date | string;
}
