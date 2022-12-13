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
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  get() {
    return this.userService.findAll();
  }

  @Get('filter')
  getFilter(): string {
    return `getUsertFilter`;
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getById(@Param('id', MongoIdPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Get(':id/orders')
  @HttpCode(HttpStatus.ACCEPTED)
  getOrders(@Param('id', MongoIdPipe) id: string) {
    return this.userService.findOrderByUser(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserDto) {
    return this.userService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.userService.remove(id);
  }
}
