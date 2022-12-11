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
  get() {
    console.log('hola');
    return this.userService.findAll();
  }

  @Get('filter')
  getFilter(): string {
    return `getUsertFilter`;
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get(':id/orders')
  @HttpCode(HttpStatus.ACCEPTED)
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOrderByUser(id);
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
