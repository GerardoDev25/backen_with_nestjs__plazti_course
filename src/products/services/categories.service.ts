import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`the category with ${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    const newcategory = this.categoryRepo.create(payload);

    return this.categoryRepo.save(newcategory);
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const category = await this.findOne(id);

    this.categoryRepo.merge(category, payload);

    return this.categoryRepo.save(category);
  }

  remove(id: number) {
    return this.categoryRepo.delete(id);
  }
}
