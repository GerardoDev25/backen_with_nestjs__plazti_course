import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
// import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`the User with ${id} not found`);
    }
    return user;
  }

  async findOrderByUser(id: string) {
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException(`the User with ${id} not found`);
    }

    return {
      data: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }

  create(payload: CreateUserDto) {
    const newUser = this.userModel.create(payload);
    return newUser;
  }

  update(id: string, payload: UpdateUserDto) {
    const user = this.userModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (!user) throw new NotFoundException(`the User with ${id} not found`);
    return user;
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
