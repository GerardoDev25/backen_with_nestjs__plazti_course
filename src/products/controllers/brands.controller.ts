import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getAll() {
    return this.brandsService.findAll();
  }

  @Get('filter')
  getFilter(): string {
    return `getFilter`;
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateBrandDto) {
    return this.brandsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.brandsService.remove(+id);
  }
}
