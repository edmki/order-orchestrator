import { OrderStatus } from '../enums/order-status';

export interface OrderCustomer {
  email: string;
  name: string;
}

export interface OrderItem {
  sku: string;
  qty: number;
  unitPrice: number;
}

export interface EnrichmentData {
  exchangeRate: {
    from: string;
    to: string;
    rate: number;
  };
}

export interface Order {
  id: string;
  orderId: string;
  idempotencyKey: string;
  customer: OrderCustomer;
  items: OrderItem[];
  currency: string;
  status: OrderStatus;
  enrichmentData?: EnrichmentData | null;
  createdAt: Date;
  updatedAt: Date;
}
