import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SignupDto, SignupResponseDto } from './dto/signup.dto';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    type: SignupResponseDto,
  })
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body.username, body.password, body.role);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Authenticate a user and return a token' })
  @ApiResponse({
    type: LoginResponseDto,
  })
  login(@Body() body: LoginDto) {
    return this.authService.login(body.username, body.password);
  }
}
