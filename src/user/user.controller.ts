// user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() body: { username: string; password: string }) {
    const user = await this.userService.createUser(
      body.username,
      body.password,
    );
    return { user };
  }
}
