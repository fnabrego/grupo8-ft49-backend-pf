import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';
import { User } from '../users/users.entity';
import { Order } from '../orders/orders.entity';

@Entity({
  name: 'receipts',
})
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.receipt)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Order, (order) => order.receipt)
  @JoinColumn()
  orders: Order;

  @Column({
    type: 'varchar',
    length: 50,
  })
  link: string;
}
