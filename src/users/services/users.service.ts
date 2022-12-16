import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
  ) {}

  private counterId = 1;

  private users: User[] = [
    {
      id: 1,
      email: 'jonhdoe@gmail.com',
      password: '123',
      role: 'admin',
      name: '',
    },
  ];

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const DATA_BASE = this.configService.get('DATA_BASE');
    console.log({ apiKey, DATA_BASE });
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
      name: '',
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

  getTaks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM task', (err, res) => {
        err ? reject(err) : resolve(res.rows);
      });
    });
  }
}
