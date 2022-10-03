import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Country } from './country.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Country, (country) => country.id)
  country: Country;

  @Column()
  name: string;
}
