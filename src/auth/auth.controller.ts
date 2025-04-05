import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupDto, SignupResponseDto } from './dto/signup.dto';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiResponse({
    type: SignupResponseDto,
  })
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body.username, body.password, body.role);
  }

  @Post('login')
  @ApiResponse({
    type: LoginResponseDto,
  })
  login(@Body() body: LoginDto) {
    return this.authService.login(body.username, body.password);
  }
}
