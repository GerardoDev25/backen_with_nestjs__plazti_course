import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ParseIntPipe } from '../common/parse-int/parse-int.pipe';

import { ProductsService } from 'src/services/products.service';
import { CreateProductDto, UpdateProductDto } from 'dtos/product.dto';
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(@Query() params: any) {
    // const { limit = 10, offset = 0, brand = '' } = params;
    // return {
    //   limit,
    //   offset,
    //   brand,
    // };

    return this.productsService.findAll();
  }

  @Get('filter')
  getProductFilter(): string {
    return `getProductFilter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    // response.status(200).send(`param id: ${productId}`);
    // return `param id: ${productId}`;
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    // return {
    //   massage: 'accion de crear',
    //   payload,
    // };
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }
}
