import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Client } from 'pg';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    const user = this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`the User with ${id} not found`);
    }
    return user;
  }

  // async findOrderByUser(id: number) {
  //   const user = this.findOne(id);
  //   if (!user) {
  //     throw new NotFoundException(`the User with ${id} not found`);
  //   }

  //   return {
  //     data: new Date(),
  //     user,
  //     products: await this.productsService.findAll(),
  //   };
  // }

  create(payload: CreateUserDto) {
    const newUser = this.userRepo.create(payload);
    return newUser;
  }

  async update(id: number, payload: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepo.merge(user, payload);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  getTaks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM task', (err, res) => {
        err ? reject(err) : resolve(res.rows);
      });
    });
  }
}
