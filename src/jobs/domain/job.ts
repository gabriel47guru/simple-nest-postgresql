import { Business } from 'src/businesses/domain/business';
import { EmploymentType } from '../entities/job.entity';

export class Job {
  id: number | string;

  business: Business | null;

  name: string | null;

  minHourlyPay: number | null;

  maxHourlyPay: number | null;

  employmentTypes: EmploymentType[] | null;

  videoUrl: string | null;
}
