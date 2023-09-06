import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { REQUEST_USER_KEY } from 'src/constants';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '添加用户' })
  @Post('add')
  create(@Body() createUserDto: CreateUserDto, @Req() request: FastifyRequest) {
    return this.userService.create(createUserDto, request[REQUEST_USER_KEY]);
  }

  @ApiOperation({ summary: '查询所有用户' })
  @Get('getAll')
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: '根据ID查询用户' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: '根据ID修改用户信息' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: FastifyRequest,
  ) {
    return this.userService.update(
      id,
      updateUserDto,
      request[REQUEST_USER_KEY],
    );
  }

  @ApiOperation({ summary: '逻辑删除用户' })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: FastifyRequest) {
    return this.userService.remove(id, request[REQUEST_USER_KEY]);
  }

  @ApiOperation({ summary: '取消逻辑删除' })
  @Patch('cancelRemove/:id')
  cancelRemove(@Param('id') id: string, @Req() request: FastifyRequest) {
    return this.userService.cancelRemove(id, request[REQUEST_USER_KEY]);
  }

  @ApiOperation({ summary: '彻底删除用户' })
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
