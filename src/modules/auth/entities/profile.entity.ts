import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Address } from './address.entity';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => User, {
    cascade: true,
  })
  @JoinColumn()
  user: User;

  @OneToOne(() => Address, {
    cascade: true,
  })
  @JoinColumn()
  address: Address;
}
