import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class SystemService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async login(userLoginDto: UserLoginDto) {
    const data = await this.userModel.findOne({
      username: userLoginDto.username,
    });

    if (!data) {
      return { success: false, message: '该账号不存在!' };
    }

    const flag = bcrypt.compareSync(userLoginDto.password, data.password);

    // 密码正确
    if (flag) {
      return { message: '登录成功!' };
    } else {
      return { success: false, message: '账号或密码不正确!' };
    }
  }
}
