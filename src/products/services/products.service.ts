import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { Brand } from '../entities/brand.entity';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Brand) private BrandRepo: Repository<Brand>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.productRepo.find({ relations: ['brand'] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['categories', 'brand'],
    });
    if (!product) {
      // return null;
      throw new NotFoundException(`the product with ${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    // const newProduct = new Product();

    // const { description, image, name, price, stock } = payload;

    // newProduct.image = image;
    // newProduct.name = name;
    // newProduct.description = description;
    // newProduct.price = price;
    // newProduct.stock = stock;

    const newProduct = this.productRepo.create(payload);

    if (payload.brandId) {
      const brand = await this.BrandRepo.findOneBy({ id: payload.brandId });
      newProduct.brand = brand;
    }

    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(payload.categoriesIds),
      });
      newProduct.categories = categories;
    }

    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.findOne(id);

    if (payload.brandId) {
      const brand = await this.BrandRepo.findOneBy({ id: payload.brandId });
      product.brand = brand;
    }

    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(payload.categoriesIds),
      });
      product.categories = categories;
    }

    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  async addCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });

    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });
    product.categories.push(category);

    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );

    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
