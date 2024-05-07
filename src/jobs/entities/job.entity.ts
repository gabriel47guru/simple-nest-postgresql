import { BusinessEntity } from '../../businesses/entities/business.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum EmploymentType {
  FULLTIME = 'FULL_TIME',
  PARTTIME = 'PART_TIME',
  SEASONAL = 'SEASONAL',
}

@Entity('jobs')
export class JobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BusinessEntity, (business) => business.jobs, {
    eager: true,
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
    default: [],
  })
  employmentTypes: EmploymentType[] | null;

  @Column()
  videoUrl: string | null;
}
