import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    return this.userRepository.save(user);
  }

  getUser(): string {
    return 'Hello User!';
  }
}
