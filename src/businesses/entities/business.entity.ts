import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobEntity } from '../../jobs/entities/job.entity';
import { EntityHelper } from '../../utils/entity-helper';
import { Business } from '../domain/business';

@Entity('businesses')
export class BusinessEntity extends EntityHelper implements Business {
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
