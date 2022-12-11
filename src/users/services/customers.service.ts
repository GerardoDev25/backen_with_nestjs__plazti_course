import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  private counterId = 1;

  private customers: Customer[] = [
    {
      id: 1,
      lastName: 'doe',
      name: 'jonh',
      phone: '2321',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      // return null;
      throw new NotFoundException(`the Customer with ${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counterId++;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);
    if (!customer) return null;
    const index = this.customers.findIndex((item) => item.id === id);

    this.customers[index] = {
      ...customer,
      ...payload,
    };
    return this.customers[index];
  }

  remove(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;
  }
}
