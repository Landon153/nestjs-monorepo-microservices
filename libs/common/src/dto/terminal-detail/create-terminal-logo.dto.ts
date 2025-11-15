import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateTerminalLogoDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  terminal: string;
}
