import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductCreationDto, ProductDeletionDto, ProductUpdateDto } from '../dto/product.dto';

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() productDto: ProductCreationDto) {
    return this.productService.createProduct(productDto);
  }

  @Put()
  async updateProduct(@Body() productDto: ProductUpdateDto) {
    return this.productService.updateProduct(productDto);
  }

  @Delete()
  async deleteProduct(@Body() productDto: ProductDeletionDto) {
    return this.productService.deleteProduct(productDto);
  }

  @Get()
  async getProducts(@Param() price?: number, @Param() stock?: number) {
    
  }
}
