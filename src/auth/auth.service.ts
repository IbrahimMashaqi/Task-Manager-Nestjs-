import { ConflictException, Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly UserRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { userName, password } = authCredentialsDto;
    try {
      const user = this.UserRepository.createUser({
        userName: userName,
        password: password,
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
}
