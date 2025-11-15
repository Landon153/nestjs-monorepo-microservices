import { PortType } from '@app/common/types';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEmail,
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsTimeZone,
  MaxLength,
} from 'class-validator';
export class CreateTerminalDetailDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  terminal: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  localPort: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(PortType)
  type: PortType;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  displayName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  company: string[];

  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  opr: string[];

  @IsDefined()
  @IsNotEmpty()
  @IsTimeZone()
  timezone: string;

  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  address: string[];

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  latitude: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  longitude: string;

  @IsDefined()
  @IsNotEmpty()
  @IsPhoneNumber()
  tel: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  fax: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsHexColor()
  backColor: string;

  @IsDefined()
  @IsNotEmpty()
  @IsHexColor()
  fontColor: string;
}
