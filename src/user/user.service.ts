import * as bcrypt from 'bcrypt';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    // Make sure that the username is not null or empty
    if (!username) {
      throw new BadRequestException('Username cannot be null or empty');
    }
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user entity with the hashed password
    const user = new User();
    user.username = username;
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User> {
    if (!username) {
      throw new BadRequestException('Username cannot be null or empty');
    }
    return this.userRepository.findOne({
      where: { username },
    });
  }
}
