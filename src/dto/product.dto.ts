import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class ProductCreationDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock: number;

    @ApiProperty()
    userId: string;
}

export class ProductUpdateDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;
    @ApiProperty({required: false})
    name?: string;
    @ApiProperty({required: false})
    price?: number;
    @ApiProperty({required: false})
    stock?: number;
}

export class ProductDeletionDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;
}