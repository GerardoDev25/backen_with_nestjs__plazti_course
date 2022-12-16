import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      // return null;
      throw new NotFoundException(`the product with ${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    // const newProduct = new Product();

    // const { description, image, name, price, stock } = payload;

    // newProduct.image = image;
    // newProduct.name = name;
    // newProduct.description = description;
    // newProduct.price = price;
    // newProduct.stock = stock;

    const newProduct = this.productRepo.create(payload);

    console.log(newProduct);

    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.findOne(id);

    this.productRepo.merge(product, payload);

    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
