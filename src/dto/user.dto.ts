import { ApiProperty } from "@nestjs/swagger";

export class UserCreationDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
    @ApiProperty({
        description: 'manager: 0, customer: 1',
        default: "0",
      })
    roleId: string;
}

export class UserQueryDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}