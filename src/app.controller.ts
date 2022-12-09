import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('new')
  newEndpoint(): string {
    return 'new end point';
  }

  @Get('/ruta/')
  hello(): string {
    return '/con /';
  }

  @Get('products')
  getProducts(@Query() params: any): string {
    const { limit = 10, offset = 0, brand = '' } = params;
    return `getProducts limit=>${limit}, offset=>${offset}, brand=>${brand}`;
  }

  @Get('products/filter')
  getProductFilter(): string {
    return `getProductFilter`;
  }
  @Get('products/:productId')
  getProduct(@Param('productId') productId: any): string {
    return `param id: ${productId}`;
  }

  @Get('categories/:id/products/:productId')
  getCategory(
    @Param('id') id: any,
    @Param('productId') productId: any,
  ): string {
    return `params id: ${id} - ${productId}`;
  }
}
