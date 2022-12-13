import { IsString, IsNotEmpty, IsPhoneNumber, IsArray } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ description: 'name of customer' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  readonly skills: any;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
