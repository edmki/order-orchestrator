import { OrderStatus } from 'src/domain/enums/order-status';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class OrderSchema {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'order_id' })
  orderId: string;

  @Index({ unique: true })
  @Column({ name: 'idempotency_key' })
  idempotencyKey: string;

  @Column({ type: 'jsonb' })
  customer: Record<string, unknown>;

  @Column({ type: 'jsonb' })
  items: Record<string, unknown>;

  @Column({ length: 3 })
  currency: string;

  @Column({ enum: OrderStatus, default: OrderStatus.RECEIVED })
  status: OrderStatus;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  enrichmentData: Record<string, unknown> | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
