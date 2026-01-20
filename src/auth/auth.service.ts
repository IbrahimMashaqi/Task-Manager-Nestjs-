import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload-interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { userName, password } = authCredentialsDto;

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await this.userRepository.createUser({
        userName: userName,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      if (error.code === '23505') {
        //Duplicated uesrName
        throw new ConflictException(
          `User with userName: "${userName}" already exist.`,
        );
      }
      throw error;
    }
  }
  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { userName, password } = authCredentialsDto;
    const user = await this.userRepository.findUserByName(userName);
    if (!user)
      throw new NotFoundException(
        `User with userName: "${userName}" not found.`,
      );
    if (await bcrypt.compare(password, user.password)) {
      const payLoad: JwtPayload = { userName };
      const accessToken: string = this.jwtService.sign(payLoad);
      return { accessToken };
    } else
      throw new UnauthorizedException('Please check your login credentials.');
  }
}
