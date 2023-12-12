import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";

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

export class ProductQueryDto {
    @ApiProperty({required: false})
    min_price?: number;
    @ApiProperty({required: false})
    max_price?: number;
    @ApiProperty({required: false})
    min_stock?: number;
    @ApiProperty({required: false})
    max_stock?: number;
}