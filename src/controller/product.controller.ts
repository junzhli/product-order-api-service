import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductCreationDto, ProductDeletionDto, ProductQueryDto, ProductUpdateDto } from '../dto/product.dto';
import { Role, Roles } from '../decorator/role.decorator';
import { AuthGuard } from '../middleware/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../decorator/user.decorator';
import { IAuthJwtTokenContent } from '../interfaces/auth.interface';

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Manager)
  @Post()
  async createProduct(@Body() productDto: ProductCreationDto, @User() user: IAuthJwtTokenContent) {
    return this.productService.createProduct(productDto, user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Manager)
  @Put()
  async updateProduct(@Body() productDto: ProductUpdateDto) {
    return this.productService.updateProduct(productDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Manager)
  @Delete()
  async deleteProduct(@Body() productDto: ProductDeletionDto) {
    return this.productService.deleteProduct(productDto);
  }

  @Get()
  async getProducts(@Query() productDto: ProductQueryDto) {
    return this.productService.getProducts(productDto);
  }
}
