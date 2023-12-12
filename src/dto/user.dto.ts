import { ApiProperty } from '@nestjs/swagger';

export class UserCreationDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty({
    description: 'manager: 1, customer: 2',
    default: '1',
  })
  roleId: string;
}

export class UserQueryDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
