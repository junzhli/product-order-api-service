import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNumber, Min } from 'class-validator';

export class OrderProductItemsDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  count: number;
}

export class OrderCreationDto {
  @ApiProperty({ type: [OrderProductItemsDto] })
  @ArrayNotEmpty()
  orderProducts: OrderProductItemsDto[];
}
