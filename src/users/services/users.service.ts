import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from 'src/products/services/products.service';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
    private customersService: CustomersService,
  ) {}

  findAll() {
    return this.userRepo.find({ relations: ['customer'] });
  }

  findOne(id: number) {
    const user = this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`the User with id: ${id} not found`);
    }
    return user;
  }

  findByEmail(email: string) {
    const user = this.userRepo.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`the User with email: ${email} not found`);
    }
    return user;
  }

  async create(payload: CreateUserDto) {
    const newUser = this.userRepo.create(payload);

    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;

    if (payload.customerId) {
      const customer = await this.customersService.findOne(payload.customerId);
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
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
