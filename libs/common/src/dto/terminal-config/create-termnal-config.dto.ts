import { IsDefined, IsIP, IsNotEmpty, IsString } from 'class-validator';

export class CreateTermnalConfigDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  terminal: string;

  @IsDefined()
  @IsString()
  group: string;

  @IsDefined()
  @IsString()
  item: string;

  @IsDefined()
  @IsString()
  description: string;

  @IsDefined()
  @IsIP()
  ipv4: string;

  @IsDefined()
  @IsIP()
  ipv6: string;
}
