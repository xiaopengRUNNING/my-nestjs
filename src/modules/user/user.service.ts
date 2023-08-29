import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CryptoUtil } from 'src/utils/crypto.util';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);

    // 明文密码加密
    newUser.password = CryptoUtil.encryptPassWord(newUser.password);

    return newUser.save();
  }

  async findAll() {
    const data = await this.userModel.find({}, { password: 0 });

    return { data };
  }

  async findOne(id: string) {
    const data = await this.userModel.findById(id, { password: 0 });
    return { data };
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: updateUserDto },
    );
  }

  remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }
}
