import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { City } from './city.entitiy';
import { Profile } from './profile.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @OneToOne(() => City, {
    cascade: true,
  })
  @JoinColumn()
  city: City;
}
