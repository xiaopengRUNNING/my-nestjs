import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  account: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
