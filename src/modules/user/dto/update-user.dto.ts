import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // 获取参数时排除该字段
  @Exclude()
  username: string;

  @ApiProperty()
  name: string;

  // 获取参数时排除该字段
  @Exclude()
  password: string;
}
