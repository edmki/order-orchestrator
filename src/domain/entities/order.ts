import { OrderStatus } from '../enums/order-status';

export interface Order {
  id: string;
  orderId: string;
  idempotencyKey: string;
  customer: Record<string, unknown>;
  items: Record<string, unknown>;
  currency: string;
  status: OrderStatus;
  enrichmentData?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}
