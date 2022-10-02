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

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => User)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  address: Address;

  @Column()
  name: string;
}
