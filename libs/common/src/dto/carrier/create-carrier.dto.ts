import {
  IsDefined,
  IsHexColor,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCarrierDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  terminal: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  inTML: string;

  @IsDefined()
  @IsNotEmpty()
  @IsHexColor()
  @MinLength(7)
  @MaxLength(7)
  backColor: string;

  @IsDefined()
  @IsNotEmpty()
  @IsHexColor()
  @MinLength(7)
  @MaxLength(7)
  fontColor: string;
}
