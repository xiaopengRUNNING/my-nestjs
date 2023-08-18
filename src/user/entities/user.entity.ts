import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as dayjs from 'dayjs';

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime',
    currentTime: () => dayjs().format('YYYY-MM-DD HH:mm:ss') as any,
  },
})
export class User {
  @Prop({ unique: true, required: true })
  account: string;

  @Prop({})
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({})
  createTime: string;

  @Prop({})
  createBy: string;

  @Prop({})
  updateTime: string;

  @Prop({})
  updateBy: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
