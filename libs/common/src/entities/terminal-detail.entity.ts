import { ArrayMaxSize, IsArray, IsEmail } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PortType } from '../types';
import { TerminalEntity } from './terminal.entity';

@Entity({ name: 'tb_terminal_detail' })
export class TerminalDetailEntity {
  @PrimaryGeneratedColumn({
    comment: 'id auto gen for detail terminal',
  })
  _id: string;

  @Column({
    type: 'varchar',
    comment: 'local port of terminal',
  })
  localPort: string;

  @Column({
    type: 'varchar',
    comment: 'type of terminal',
    enum: PortType,
  })
  type: PortType;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'display name of terminal',
  })
  displayName: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    comment: 'Company terminal name',
  })
  @IsArray()
  @ArrayMaxSize(2)
  company: string[];

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
  })
  @IsArray()
  @ArrayMaxSize(2)
  opr: string[];

  @Column({
    type: 'varchar',
    comment: 'Timezone terminal',
  })
  timezone: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    comment: 'Address terminal',
  })
  @IsArray()
  @ArrayMaxSize(2)
  address: string[];

  @Column({
    type: 'varchar',
    comment: 'latitude of terminal',
  })
  latitude: string;

  @Column({
    type: 'varchar',
    comment: 'longitude of terminal',
  })
  longitude: string;

  @Column({
    type: 'varchar',
    comment: 'tel of terminal',
  })
  tel: string;

  @Column({
    type: 'varchar',
    comment: 'fax of terminal',
  })
  fax: string;

  @Column({
    type: 'varchar',
    comment: 'tel of terminal',
  })
  @IsEmail()
  email: string;

  @Column({
    type: 'varchar',
    comment: 'back color of terminal',
  })
  backColor: string;

  @Column({
    type: 'varchar',
    comment: 'font color of terminal',
  })
  fontColor: string;

  @OneToOne(() => TerminalEntity, (ref) => ref.detail)
  @JoinColumn({
    referencedColumnName: 'code',
  })
  terminal: TerminalEntity | string;

  @CreateDateColumn()
  createdDate: Date | string;

  @UpdateDateColumn()
  updatedDate: Date | string;
}
