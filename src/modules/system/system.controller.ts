import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { UserLoginDto } from './dto/user-login.dto';
import { SystemService } from './system.service';

@ApiTags('System')
@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Post('login')
  @Public()
  login(@Body() userLoginDto: UserLoginDto) {
    return this.systemService.login(userLoginDto);
  }
}
