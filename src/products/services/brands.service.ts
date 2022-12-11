import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entity';
@Injectable()
export class BrandsService {
  private counterId = 1;

  private brands: Brand[] = [
    {
      id: 1,
      image: 'http://myimage.jpg',
      name: 'image',
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((item) => item.id === id);
    if (!brand) {
      // return null;
      throw new NotFoundException(`the Brand with ${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    this.counterId++;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);
    if (!brand) return null;
    const index = this.brands.findIndex((item) => item.id === id);

    this.brands[index] = {
      ...brand,
      ...payload,
    };
    return this.brands[index];
  }

  remove(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brands.splice(index, 1);
    return true;
  }
}
