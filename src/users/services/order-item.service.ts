import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
  ) {}

  async create(payload: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne({
      where: { id: payload.orderId },
    });

    const product = await this.productRepo.findOne({
      where: { id: payload.productId },
    });

    const item = new OrderItem();

    item.order = order;
    item.product = product;
    item.quantity = payload.quantity;

    return this.itemRepo.save(item);
  }
}
