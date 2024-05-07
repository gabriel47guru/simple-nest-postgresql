import { BusinessMapper } from 'src/businesses/mappers/business.maper';
import { Job } from '../domain/job';
import { JobEntity } from '../entities/jobs.entity';

export class JobMapper {
  static toDomain(raw: JobEntity): Job {
    const job = new Job();
    job.id = raw.id;
    job.business = BusinessMapper.toDomain(raw.business);
    job.name = raw.name;
    job.minHourlyPay = raw.minHourlyPay;
    job.maxHourlyPay = raw.maxHourlyPay;
    job.employmentTypes = [...raw.employmentTypes];
    job.videoUrl = raw.videoUrl;
    return job;
  }
}
