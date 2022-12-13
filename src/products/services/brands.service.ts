import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entity';
@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  findAll() {
    return this.brandModel.find().exec();
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id).exec();
    console.log(brand);
    if (!brand) {
      throw new NotFoundException(`the Brand with ${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    const newBrand = this.brandModel.create(payload);
    return newBrand;
  }

  async update(id: string, payload: UpdateBrandDto) {
    const brand = await this.brandModel.findByIdAndUpdate(
      id,
      {
        $set: payload,
      },
      { new: true },
    );
    if (!brand) throw new NotFoundException(`the Brand with ${id} not found`);
    return brand;
  }

  remove(id: string) {
    return this.brandModel.findByIdAndDelete(id);
  }
}
