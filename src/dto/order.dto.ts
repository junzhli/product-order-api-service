import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsNotEmpty, IsNumber, Min } from "class-validator";

export class OrderProductItemsDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    @IsNumber()
    @Min(0)
    count: number;
}

export class OrderCreationDto {
    @ApiProperty()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ type: [OrderProductItemsDto] })
    @ArrayNotEmpty()
    orderProducts: OrderProductItemsDto[];
}