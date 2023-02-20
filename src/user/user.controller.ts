// user.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

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

  @Get(':username')
  @UseGuards(AuthGuard('jwt'))
  async findOneByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }
}
