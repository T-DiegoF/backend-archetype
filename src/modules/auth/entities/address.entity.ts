import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.address)
  profile: Profile;

  @Column()
  street: string;


}
