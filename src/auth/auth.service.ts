import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserRole } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,

    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async signup(username: string, password: string, role: UserRole) {
    try {
      const userInfo = await this.userRepo.findOne({ where: { username } });
      if (userInfo) {
        throw new Error('error.username-already-exists');
      }
      const hashed = await bcrypt.hash(password, 10);
      const user = this.userRepo.create({ username, password: hashed, role });
      const result = await this.userRepo.save(user);
      delete result.password;
      const token = this.generateToken(result);
      return {
        ...result,
        ...token,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async login(username: string, password: string) {
    try {
      const user = await this.userRepo.findOne({ where: { username } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('error.invalid-credentials');
      }
      return this.generateToken(user);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async getUser(id: string): Promise<UserEntity> {
    return this.userRepo.findOne({ where: { id } });
  }

  private generateToken(user: UserEntity) {
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
      }),
    };
  }
}
