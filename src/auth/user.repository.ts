import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: Partial<User>): Promise<User> {
    const newUser: User = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }
  async findUserByName(userName: string): Promise<User | null> {
    return this.userRepository.findOneBy({ userName });
  }
}
