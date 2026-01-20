import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly UserRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { userName, password } = authCredentialsDto;
    return this.UserRepository.createUser({
      userName: userName,
      password: password,
    });
  }
}
