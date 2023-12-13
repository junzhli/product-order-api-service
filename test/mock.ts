import { OrderCreationDto } from '../src/dto/order.dto';
import { Role } from '../src/decorator/role.decorator';
import { IAuthJwtTokenContent } from '../src/interfaces/auth.interface';

export const mockCustomorUserJwtContent: IAuthJwtTokenContent = {
  id: '1',
  roleId: Role.Customer,
};

export const mockOrderCreationDto: OrderCreationDto = {
  orderProducts: [
    {
      id: '1',
      count: 2,
    },
  ],
};
