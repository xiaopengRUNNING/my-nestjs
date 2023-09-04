import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { UserSchema } from 'src/modules/user/entities/user.entity';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [SystemController],
  providers: [
    SystemService,
    { provide: APP_GUARD, useClass: AccessTokenGuard },
  ],
})
export class SystemModule {}
