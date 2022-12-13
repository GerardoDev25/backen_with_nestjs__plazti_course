import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  findAll() {
    return this.customerModel.find().exec();
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException(`the Customer with ${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    const newCustomer = this.customerModel.create(payload);
    return newCustomer;
  }

  update(id: string, payload: UpdateCustomerDto) {
    const customer = this.customerModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!customer)
      throw new NotFoundException(`the Customer with ${id} not found`);
    return customer;
  }

  remove(id: string) {
    return this.customerModel.findByIdAndDelete(id).exec();
  }
}
