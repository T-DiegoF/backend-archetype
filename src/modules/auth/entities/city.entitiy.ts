import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Country } from './country.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Country)
  @JoinColumn([{ name: 'countryId', referencedColumnName: 'id' }])
  countryId: Country;

  @Column()
  name: string;
}
