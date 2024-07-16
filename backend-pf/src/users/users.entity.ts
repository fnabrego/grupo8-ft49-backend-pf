import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Role } from 'src/roles/roles.enum';
import { Order } from '../orders/orders.entity';
import { Receipt } from '../receipts/receipts.entity';
import { Review } from 'src/reviews/reviews.entity';

@Entity({
  name: 'users',
})
export class User {
  /**
   * @description ID de identificacion
   * @example 'd290f1ee-6c54-4b01-90e6-d701748f0851'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * @description El Email del usuario
   * @example 'user@example.com'
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  /**
   * @description El nombre del usuario
   * @example 'Pedro'
   */
  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  name: string;

  /**
   * @description El apellido del usuario
   * @example 'Gomez'
   */
  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  lastName: string;

  /**
   * @description El nombre de la empresa a la que representa el usuario en caso de hacerlo
   * @example 'Gucci'
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  companyName: string;

  /**
   * @description La contraseña del usuario
   * @example 'strongPassword123!'
   */
  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  password: string;

  /**
   * @description DNI del usuario
   * @example 12345678
   */
  @Column({
    type: 'varchar',
    nullable: true,
  })
  dni: string;

  /**
   * @description El CUIT o CUIL del usuario
   * @example 20304050607
   */
  @Column({
    type: 'varchar',
    nullable: true,
  })
  cuit_cuil: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  locality: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
    default: 'https://cdn-icons-png.flaticon.com/512/6676/6676016.png',
  })
  profilePicture: string;
/**
   * @description Estado eliminacion, en false indica que existe
   * @example 'false'
   */
  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn()
  orders: Order[];

  @OneToMany(() => Receipt, (receipt) => receipt.user)
  @JoinColumn()
  receipt: Receipt;

  @OneToMany(() => Review, (review) => review.user)
  @JoinColumn()
  reviews: Review[];

}
