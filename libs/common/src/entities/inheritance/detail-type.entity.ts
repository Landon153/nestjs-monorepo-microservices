import { Length } from 'class-validator';
import { Column } from 'typeorm';

export abstract class Type {
  @Column({
    type: 'varchar',
    comment: 'code type',
  })
  code: string;

  @Column({
    type: 'varchar',
    comment: 'name type',
  })
  name: string;

  @Column({
    type: 'varchar',
    comment: 'Hex code back color',
  })
  @Length(7, 7)
  backColor: string;

  @Column({
    type: 'varchar',
    comment: 'Hex code font color',
  })
  @Length(7, 7)
  fontColor: string;
}
