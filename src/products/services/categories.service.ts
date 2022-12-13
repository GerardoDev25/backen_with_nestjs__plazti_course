import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  findAll() {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`the Category with ${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    const newCategory = this.categoryModel.create(payload);
    return newCategory;
  }

  async update(id: string, payload: UpdateCategoryDto) {
    const category = await this.categoryModel
      .findByIdAndUpdate(
        id,
        {
          $set: payload,
        },
        { new: true },
      )
      .exec();
    if (!category)
      throw new NotFoundException(`the Category with ${id} not found`);
    return category;
  }

  remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
