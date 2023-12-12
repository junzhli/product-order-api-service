import { Injectable, Logger } from '@nestjs/common';
import { checkPasswordIfMatchWithHashedValue } from '../utils/password.util';
import { UserService } from './user.service';
import { UserQueryDto } from 'src/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { IAuthJwtTokenContent } from '../interfaces/auth.interface';
import { InvalidArgumentException } from '../error/invalid-argument.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  public async generateUserAuthToken(authDto: UserQueryDto): Promise<string> {
    const user = await this.userService.getUser(authDto);
    const matched = await checkPasswordIfMatchWithHashedValue(
      authDto.password,
      user.password,
    );
    if (!matched) {
      throw new InvalidArgumentException("password doesn't match");
    }
    const payload: IAuthJwtTokenContent = {
      id: user.id,
      roleId: user.roleId.toString(),
    };
    return this.jwtService.signAsync(payload);
  }
}
