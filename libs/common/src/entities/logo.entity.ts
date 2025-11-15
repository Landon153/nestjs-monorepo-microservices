import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TerminalEntity } from './terminal.entity';

@Entity({ name: 'tb_logo' })
export class LogoEntity {
  @PrimaryGeneratedColumn({
    comment: 'id of logo terminal ',
  })
  _id: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  name?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  logo?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  logoAndName?: string;

  @OneToOne(() => TerminalEntity, (ref) => ref.logo, {
    cascade: true,
  })
  @JoinColumn({
    referencedColumnName: 'code',
  })
  terminal: TerminalEntity | string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
