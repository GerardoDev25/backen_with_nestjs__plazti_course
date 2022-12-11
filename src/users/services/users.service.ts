import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @Inject('API_KEY') private apiKey: string,
  ) {}

  private counterId = 1;

  private users: User[] = [
    {
      id: 1,
      email: 'jonhdoe@gmail.com',
      password: '123',
      role: 'admin',
    },
  ];

  findAll() {
    console.log(this.apiKey);
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`the User with ${id} not found`);
    }
    return user;
  }

  findOrderByUser(id: number): Order {
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException(`the User with ${id} not found`);
    }

    return {
      data: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }

  create(payload: CreateUserDto) {
    this.counterId++;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (!user) return null;
    const index = this.users.findIndex((item) => item.id === id);

    this.users[index] = {
      ...user,
      ...payload,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
}
