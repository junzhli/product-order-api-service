import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCreationDto, UserQueryDto } from '../dto/user.dto';
import { User } from '../models/user';
import { createEncryptedHash } from '../utils/password.util';
import * as lodash from 'lodash';
import { InvalidArgumentException } from '../error/invalid-argument.error';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  private readonly logger = new Logger(UserService.name);

  public async createUser(userDto: UserCreationDto): Promise<void> {
    const { username, password, roleId } = userDto;
    await this.userModel.create({
      username,
      password: await createEncryptedHash(password),
      roleId,
    });
  }

  public async getUser(userDto: UserQueryDto): Promise<User> {
    const { username } = userDto;
    const user = await this.userModel.findOne({
      where: {
        username,
      },
    });
    if (lodash.isNil(user)) {
      throw new InvalidArgumentException('user is not found');
    }

    return user;
  }
}
