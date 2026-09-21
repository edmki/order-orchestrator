import { Injectable } from '@nestjs/common';
import { OrderStatus } from 'src/domain/enums/order-status';
import { OrderRepository } from 'src/domain/repositories/order-repository';
import { ExchangeRateService } from 'src/domain/services/exchange-rate.service';
import { Env } from 'src/shared/env';

@Injectable()
export class ProcessOrder {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly exchangeRateService: ExchangeRateService,
  ) {}

  async execute(orderId: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }

    await this.orderRepository.updateStatus(order.id, OrderStatus.PROCESSING);

    const exchangeRate = await this.exchangeRateService.getExchangeRate(
      order.currency,
    );

    await this.orderRepository.complete(order.id, {
      exchangeRate: {
        from: order.currency,
        to: Env.targetExchangeRateCurrency,
        rate: exchangeRate,
      },
    });
  }
}
