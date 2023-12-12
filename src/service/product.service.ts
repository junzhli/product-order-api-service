import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductCreationDto, ProductDeletionDto, ProductQueryDto, ProductUpdateDto } from '../dto/product.dto';
import { Product } from '../models/product';
import * as lodash from 'lodash';
import { IAuthJwtTokenContent } from '../interfaces/auth.interface';
import { Op } from 'sequelize';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product)
    private productModel: typeof Product) {}

    private readonly logger = new Logger(ProductService.name);

  public async createProduct(productDto: ProductCreationDto, user: IAuthJwtTokenContent): Promise<void> {
    const {name, price, stock} = productDto;
    await this.productModel.create({
        name,
        price,
        stock,
        userId: user.id,
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

  public async getProducts(productDto: ProductQueryDto): Promise<Product[]> {
    const {min_price: minPrice, min_stock: minStock, max_price: maxPrice, max_stock: maxStock} = productDto;

    let where = {};
    const rangeQueryPrice = !lodash.isNil(minPrice) && !lodash.isNil(maxPrice);
    const rangeQueryStock = !lodash.isNil(minStock) && !lodash.isNil(maxStock);

    if (rangeQueryPrice && minPrice > maxPrice) {
        throw new Error("minPrice should smaller or equal to maxPrice")
    }
    if (rangeQueryStock && minStock > maxStock) {
        throw new Error("minStock should smaller or equal to maxStock")
    }

    if (rangeQueryPrice) {
        Object.assign(where, {
            price: {
                [Op.gte]: minPrice,
                [Op.lte]: maxPrice,
            },
        });
    } else {
        if (!lodash.isNil(minPrice)) {
            Object.assign(where, {
                price: {
                    [Op.gte]: minPrice,
                },
            });
        }
        if (!lodash.isNil(maxPrice)) {
            Object.assign(where, {
                price: {
                    [Op.lte]: maxPrice,
                },
            });
        }
    }

    if (rangeQueryStock) {
        Object.assign(where, {
            stock: {
                [Op.gte]: minStock,
                [Op.lte]: maxStock,
            },
        });
    } else {
        if (!lodash.isNil(minStock)) {
            Object.assign(where, {
                stock: {
                    [Op.gte]: minStock,
                },
            });
        }
        if (!lodash.isNil(maxStock)) {
            Object.assign(where, {
                stock: {
                    [Op.lte]: maxStock,
                },
            });
        }
    }
    

    const resultItems = await this.productModel.findAll({
        where,
    });

    return resultItems;
  }
}
