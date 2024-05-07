import { JobEntity } from '../../jobs/entities/job.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => JobEntity, (job) => job.business)
  jobs: JobEntity[];
}
