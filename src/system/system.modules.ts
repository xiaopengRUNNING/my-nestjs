import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/entities/user.entity';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule {}
