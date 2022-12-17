import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  findOne(id: number) {
    const customer = this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`the customer with ${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(payload);
    return newCustomer;
  }

  async update(id: number, payload: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    this.customerRepo.merge(customer, payload);
    return this.customerRepo.save(customer);
  }

  remove(id: number) {
    return this.customerRepo.delete(id);
  }
}
