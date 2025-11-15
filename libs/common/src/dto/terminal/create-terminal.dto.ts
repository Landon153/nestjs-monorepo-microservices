import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTerminalDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  code: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;
}
