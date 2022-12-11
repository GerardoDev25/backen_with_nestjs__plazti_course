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
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAll() {
    return this.categoriesService.findAll();
  }

  @Get('filter')
  getFilter(): string {
    return `getFilter`;
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.categoriesService.remove(+id);
  }
}
