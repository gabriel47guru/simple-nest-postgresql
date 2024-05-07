import { Business } from 'src/businesses/domain/business';

export class Job {
  id: number | string;

  business: Business;

  name: string | null;

  minHourlyPay: number | null;

  maxHourlyPay: number | null;

  employmentTypes: string[];

  videoUrl: string | null;
}
