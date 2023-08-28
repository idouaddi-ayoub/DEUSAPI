import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, compare, genSalt } from 'bcrypt';

@Injectable()
export class EncryptionService {
  constructor(private readonly configService: ConfigService) {}

  async hash(password = 'string'): Promise<string> {
    return hash(password, await genSalt(10));
  }

  async compare(plain: string, encrypted: string): Promise<boolean> {
    return compare(plain, encrypted);
  }
}
