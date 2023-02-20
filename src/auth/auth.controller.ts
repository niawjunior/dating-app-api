import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const payload = {
      username: loginDto.username,
      password: loginDto.password,
    };
    const user = await this.authService.validateJwtUser(payload);
    const token = await this.authService.login(user);
    return { token };
  }
}
