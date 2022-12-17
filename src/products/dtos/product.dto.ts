import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly brandId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly categoriesIds: number[];
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @ApiProperty()
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty()
  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsPositive()
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}
