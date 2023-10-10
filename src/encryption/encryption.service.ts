import { Injectable } from '@nestjs/common';
import { hash, compare, genSalt } from 'bcrypt';

@Injectable()
export class EncryptionService {
  async hash(password = 'string'): Promise<string> {
    return hash(password, await genSalt(10));
  }

  async compare(plain: string, encrypted: string): Promise<boolean> {
    return compare(plain, encrypted);
  }
}
