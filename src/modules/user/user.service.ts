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
    const data = await this.userModel.find({ deleted: 0 }, { password: 0 });

    return { data };
  }

  async findList(queryUserListDto) {
    const { pageNo, pageSize, name } = queryUserListDto;
    const selector = {
      $and: [
        { deleted: { $eq: 0 } },
        { name: { $regex: new RegExp(name, 'm') } },
      ],
    };
    const no = pageNo && Number.isInteger(+pageNo) && pageNo > 0 ? +pageNo : 1;
    const size =
      pageSize && Number.isInteger(+pageSize) && pageSize > 0 ? +pageSize : 10;

    const total = await this.userModel.count(selector);
    const records = await this.userModel
      .find(selector, { password: 0 })
      .skip((no - 1) * size)
      .limit(size);

    return {
      data: {
        records,
        total,
        size,
        current: no,
        pages: Math.ceil(total / size),
      },
    };
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
          deleted: 1,
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
          deleted: 0,
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
