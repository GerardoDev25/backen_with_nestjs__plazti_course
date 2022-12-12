import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import {
  CreateProductDto,
  FlterProductsDto,
  UpdateProductDto,
} from '../dtos/product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAll(params?: FlterProductsDto) {
    if (!params) return this.productModel.find().exec();

    const { limit, offset, maxPrice, minPrice } = params;
    const filters: FilterQuery<Product> = {};

    if (maxPrice && minPrice) {
      console.log({ maxPrice, minPrice });
      filters.price = { $gte: minPrice, $lte: maxPrice };
    }
    return this.productModel.find(filters).skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`the product with ${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = this.productModel.create(payload);
    return newProduct;
  }

  update(id: string, payload: UpdateProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
