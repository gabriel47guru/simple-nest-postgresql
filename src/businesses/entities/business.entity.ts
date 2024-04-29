import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('businesses')
export class BusinessEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  name: string;

  @Column({ type: String, nullable: true })
  phoneNumber: string | null;

  @Column()
  businessCity: string | null;

  @Column()
  businessState: string | null;

  @Index()
  @Column()
  isPublic: boolean;
}
