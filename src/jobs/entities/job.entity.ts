import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BusinessEntity } from '../../businesses/entities/business.entity';
import { Job } from '../domain/job';
import { EntityHelper } from '../../utils/entity-helper';

export enum EmploymentType {
  FULLTIME = 'FULL_TIME',
  PARTTIME = 'PART_TIME',
  SEASONAL = 'SEASONAL',
}

@Entity('jobs')
export class JobEntity extends EntityHelper implements Job {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BusinessEntity, (business) => business.jobs, {
    eager: true,
    createForeignKeyConstraints: false,
  })
  business: BusinessEntity | null;

  @Column()
  businessId: number | null;

  @Column()
  name: string | null;

  @Column()
  minHourlyPay: number | null;

  @Column()
  maxHourlyPay: number | null;

  @Column({
    type: 'enum',
    enum: EmploymentType,
    array: true,
  })
  employmentTypes: EmploymentType[] | null;

  @Column()
  videoUrl: string | null;
}
