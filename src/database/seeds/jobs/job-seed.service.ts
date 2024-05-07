import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobEntity, EmploymentType } from '../../../jobs/entities/job.entity';
import { jobs } from './jobs';

@Injectable()
export class JobSeedService {
  constructor(
    @InjectRepository(JobEntity)
    private repository: Repository<JobEntity>,
  ) {}

  async run() {
    await this.repository.clear();
    await this.repository.save(
      jobs.map((job) =>
        this.repository.create({
          id: job.id,
          businessId: job.businessId,
          name: job.name,
          minHourlyPay: job.minHourlyPay,
          maxHourlyPay: job.maxHourlyPay,
          employmentTypes: <EmploymentType[]>job.employmentTypes,
          videoUrl: job.videoUrl,
        }),
      ),
    );
  }
}
