import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SystemModule } from './system/system.modules';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:pengxincheng123456@localhost:27017/basics-database?authSource=admin',
    ),
    UserModule,
    SystemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
