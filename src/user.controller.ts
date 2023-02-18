// user.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() body: { email: string; password: string }) {
    const user = await this.userService.createUser(body.email, body.password);
    return { user };
  }

  @Get()
  getUser(): string {
    return this.userService.getUser();
  }
}
