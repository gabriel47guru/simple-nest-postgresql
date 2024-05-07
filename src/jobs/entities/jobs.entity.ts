import { BusinessEntity } from '../../businesses/entities/business.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum EmploymentType {
  FULLTIME = 'full_time',
  PARTTIME = 'part_time',
  SEASONAL = 'seasonal',
}

@Entity('jobs')
export class JobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BusinessEntity, (business) => business.jobs)
  business: BusinessEntity;

  @Column()
  name: string | null;

  @Column()
  minHourlyPay: number | null;

  @Column()
  maxHourlyPay: number | null;

  @Column({
    type: 'enum',
    enum: EmploymentType,
    default: [],
  })
  employmentTypes: EmploymentType[];

  @Column()
  videoUrl: string | null;
}
