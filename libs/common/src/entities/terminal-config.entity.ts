import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TerminalEntity } from './terminal.entity';

@Entity({
  name: 'tb_terminal_config',
})
export class TerminalConfigEntity {
  @PrimaryGeneratedColumn({
    comment: 'id of terminal config',
  })
  _id: string;

  @Column({
    type: 'varchar',
    comment: 'group terminal configuration',
  })
  group: string;

  @Column({
    type: 'varchar',
    comment: 'item of terminal configuration',
  })
  item: string;

  @Column({
    type: 'varchar',
    comment: 'description of terminal configuration',
  })
  description: string;

  @Column({
    type: 'varchar',
    comment: 'ipv1 type of terminal configuration',
  })
  ipv4: string;

  @Column({
    type: 'varchar',
    comment: 'ipv4 type of terminal configuration',
  })
  ipv6: string;

  @ManyToOne(() => TerminalEntity, (ref) => ref.configs)
  @JoinColumn({
    referencedColumnName: 'code',
  })
  terminal: TerminalEntity | string;

  @CreateDateColumn()
  createdDate: Date | string;

  @UpdateDateColumn()
  updatedDate: Date | string;
}
