import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Role } from 'src/roles/roles.enum';
import { Orders } from '../orders/orders.entity';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  password: string;
  hacer;

  @Column({
    type: 'int',
  })
  dni: number;

  @Column({
    type: 'int',
  })
  cuit_cuil: number;

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

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn()
  orderds: Orders[];
}
