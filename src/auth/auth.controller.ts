import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AnyTlsaRecord } from 'dns';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from '@nestjs/common';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


    @Post('register')
    register(@Body() body: RegisterDto ){
        return this.authService.register(body)
    }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Request()req){
    return req.user
  }
}