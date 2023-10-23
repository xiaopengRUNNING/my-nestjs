import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { CryptoUtil } from 'src/utils/crypto.util';
import jwtConfig from 'src/config/jwt.config';
import { User } from 'src/modules/user/entities/user.entity';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class SystemService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async login(userLoginDto: UserLoginDto) {
    // 调用 lean 方法，省去生成完整的文档实例，直接返回一个 js 对象
    const user = await this.userModel
      .findOne({
        username: userLoginDto.username,
      })
      .lean();

    if (!user) {
      return { success: false, message: '该账号不存在!' };
    }

    const { password, ...userInfo } = user;

    const flag = CryptoUtil.comparePassWord(userLoginDto.password, password);

    // 密码正确
    if (flag) {
      // 生成 token
      const token = await this.jwtService.signAsync(
        { sub: userInfo._id, ...userInfo },
        {
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.accessTokenTtl,
        },
      );
      return { message: '登录成功!', data: { userInfo, token } };
    } else {
      return { success: false, message: '账号或密码不正确!' };
    }
  }
}
