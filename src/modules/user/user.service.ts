import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CryptoUtil } from 'src/utils/crypto.util';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto, requestUser: User) {
    const newUser = new this.userModel({
      ...createUserDto,
      createBy: requestUser.username,
    });

    // 明文密码加密
    newUser.password = CryptoUtil.encryptPassWord(newUser.password);

    return newUser.save();
  }

  async findAll() {
    const data = await this.userModel.find({ deleted: false }, { password: 0 });

    return { data };
  }

  async findOne(id: string) {
    const data = await this.userModel.findById(id, { password: 0 });
    return { data };
  }

  // 数据更新
  update(id: string, updateUserDto: UpdateUserDto, requestUser: User) {
    return this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...updateUserDto, updateBy: requestUser.username } },
    );
  }

  // 逻辑删除
  remove(id: string, requestUser: User) {
    return this.userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          deleted: true,
          deleteBy: requestUser.username,
          deleteTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        },
      },
    );
  }

  // 取消逻辑删除
  cancelRemove(id: string, requestUser: User) {
    return this.userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          updateBy: requestUser.username,
          deleted: false,
          deleteBy: '',
          deleteTime: '',
        },
      },
    );
  }

  delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
