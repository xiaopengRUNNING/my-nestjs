import * as bcrypt from 'bcrypt';

export class CryptoUtil {
  static encryptPassWord(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  static comparePassWord(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }
}
