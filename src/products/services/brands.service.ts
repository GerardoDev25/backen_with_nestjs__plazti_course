import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entity';
@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll() {
    return this.brandRepo.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findOneBy({ id });
    if (!brand) {
      throw new NotFoundException(`the brand with ${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    const newBrand = this.brandRepo.create(payload);

    console.log(newBrand);

    return this.brandRepo.save(newBrand);
  }

  async update(id: number, payload: UpdateBrandDto) {
    const brand = await this.findOne(id);

    this.brandRepo.merge(brand, payload);

    return this.brandRepo.save(brand);
  }

  remove(id: number) {
    return this.brandRepo.delete(id);
  }
}
