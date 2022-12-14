import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import {
  CreateProductDto,
  UpdateProductDto,
  FlterProductsDto,
} from '../dtos/product.dto';
import { ProductsService } from '../services/products.service';

// import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@UseGuards(AuthGuard('jwt'))
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'list of products' })
  getProducts(@Query() params: FlterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get('filter')
  getProductFilter(): string {
    return `getProductFilter`;
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
