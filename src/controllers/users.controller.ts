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
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getProducts() {
    return this.userService.findAll();
  }

  @Get('filter')
  getProductFilter(): string {
    return `getUsertFilter`;
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.userService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
