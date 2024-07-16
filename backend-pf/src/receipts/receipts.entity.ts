import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";
import { Order } from "../orders/orders.entity";

@Entity({
  name: 'receipts',
})
export class Receipt {
  /**
   * @description ID de la Orden
   * @example 'd290f1ee-6c54-4b01-90e6-d701748f0851'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
     * @description ID del Usuario
     * @example 'd290f1ee-6c54-4b01-90e6-d701748f0851'
     */
  @ManyToOne(() => User, (user) => user.receipt)
  @JoinColumn({ name: 'user_id' })
  user: Partial<User>;

  @OneToOne(() => Order, (order) => order.receipt)
  order: Partial<Order>;

  /**
     * @description Link de recibo pdf en Firebase
     * @example 'https://firebasestorage.googleapis.com/v0/b/expreso-rivadavia.appspot.com/o/Recibos%2F2024%2F07%2F5AM67500XP511550A.pdf?alt=media&token=86b97c3d-5f13-4ccb-a8ba-5285923fe49c'
     */
  @Column({
    type: 'text',
    nullable: true
  })
  link?: string;
}

