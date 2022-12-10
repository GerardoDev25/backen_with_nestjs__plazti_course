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
  Res,
} from '@nestjs/common';

import { Response } from 'express';
@Controller('products')
export class ProductsController {
  @Get()
  getProducts(@Query() params: any) {
    const { limit = 10, offset = 0, brand = '' } = params;
    return {
      limit,
      offset,
      brand,
    };
  }

  @Get('filter')
  getProductFilter(): string {
    return `getProductFilter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Res() response: Response, @Param('productId') productId: any) {
    response.status(200).send(`param id: ${productId}`);
    // return `param id: ${productId}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      massage: 'accion de crear',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
    };
  }
}
