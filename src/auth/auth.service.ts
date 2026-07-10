import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  private users: any[] = [];

  async register(dto: RegisterDto) {
    const user = this.users.find(
      user => user.email === dto.email,
    );

    if (user) {
      return {
        message: 'Пользователь уже существует',
      };
    }
      const hashedPassword = await bcrypt.hash(
    dto.password,
    10,
      )
const newUser = {
  id: this.users.length + 1,
  email: dto.email,
  password: hashedPassword,
  role: 'user',
};

    this.users.push(newUser);
console.log(this.users);
    return {
      message: 'Регистрация успешна',
      user: newUser,
    };
  }
 async login(dto: LoginDto) {
  console.log("===== LOGIN =====");
  console.log("DTO:", dto);
  console.log("EMAIL:", dto.email);
  console.log("PASSWORD:", dto.password);

  console.log("USERS:", this.users);

  const user = this.users.find(
    user => user.email === dto.email,
  );

  console.log("FOUND USER:", user);

  if (!user) {
    return {
      message: 'Пользователь не найден',
    };
  }

  const passwordMatch = await bcrypt.compare(
    dto.password,
    user.password,
  );

  console.log("PASSWORD MATCH:", passwordMatch);

  if (!passwordMatch) {
    return {
      message: 'Неверный пароль',
    };
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  console.log("PAYLOAD:", payload);

  const token = this.jwtService.sign(payload);

  console.log("TOKEN:", token);

  return {
    access_token: token,
  };
}
}

