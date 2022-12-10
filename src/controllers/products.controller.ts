import { Controller, Get, Param, Post, Query, Body } from '@nestjs/common';

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
  getProduct(@Param('productId') productId: any): string {
    return `param id: ${productId}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      massage: 'accion de crear',
      payload,
    };
  }
}
