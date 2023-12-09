import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductCreationDto, ProductDeletionDto, ProductUpdateDto } from '../dto/product.dto';
import { Product } from '../models/product';
import lodash from 'lodash';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product)
    private productModel: typeof Product) {}

    private readonly logger = new Logger(ProductService.name);

  public async createProduct(productDto: ProductCreationDto): Promise<void> {
    const {name, price, stock, userId} = productDto;
    await this.productModel.create({
        name,
        price,
        stock,
        userId,
    });
  }

  public async updateProduct(productDto: ProductUpdateDto): Promise<void> {
    const {id,name, price, stock} = productDto;
    const product = await this.productModel.findOne({
        where: {
            id,
        }
    });

    if (lodash.isNil(product)) {
        throw new Error("Product id not found");
    }
    
    await product.update({
        name,
        price,
        stock,
    })
  }

  public async deleteProduct(productDto: ProductDeletionDto): Promise<void> {
    const {id} = productDto;
    const affectedItems = await this.productModel.destroy({
        where: {
            id
        }
    });

    if (affectedItems === 0) {
        throw new Error("Product id not found");
    }
  }
}
