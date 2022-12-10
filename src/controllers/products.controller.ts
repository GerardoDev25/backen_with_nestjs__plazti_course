import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(@Query() params: any): string {
    const { limit = 10, offset = 0, brand = '' } = params;
    return `getProducts limit=>${limit}, offset=>${offset}, brand=>${brand}`;
  }

  @Get('filter')
  getProductFilter(): string {
    return `getProductFilter`;
  }

  @Get(':productId')
  getProduct(@Param('productId') productId: any): string {
    return `param id: ${productId}`;
  }
}
