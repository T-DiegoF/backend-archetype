import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Country } from './country.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Country, {
    cascade: true,
  })
  @JoinColumn()
  country: Country;

  @Column()
  name: string;
}
