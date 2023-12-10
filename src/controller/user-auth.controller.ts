import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserCreationDto, UserQueryDto } from '../dto/user.dto';
import { AuthService } from '../service/auth.service';

@Controller("user")
export class UserAuthController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post("/create")
  async createUser(@Body() userDto: UserCreationDto) {
    return this.userService.createUser(userDto);
  }

  @Post("/login")
  async createAuthToken(@Body() userDto: UserQueryDto) {
    return {
      jwtToken: await this.authService.generateUserAuthToken(userDto),
    }
  }
}
