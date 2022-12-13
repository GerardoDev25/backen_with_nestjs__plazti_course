import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer'; // 👈 transform

import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './category.dto';
import { CreateSubDocDto } from './sub-doc.dto'; // 👈 import

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
  @ValidateNested()
  @IsNotEmpty()
  readonly category: CreateCategoryDto;

  @IsMongoId()
  @IsNotEmpty()
  readonly brand: string;

  @ApiProperty({ type: () => [CreateSubDocDto] })
  @IsNotEmpty()
  @ValidateNested()
  readonly subDoc: CreateSubDocDto; // 👈 1:1

  @ApiProperty({ type: () => [CreateSubDocDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubDocDto)
  readonly subDocs: CreateSubDocDto[]; // 👈 1:N
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FlterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
