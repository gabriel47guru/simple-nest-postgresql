import { Injectable } from '@nestjs/common';
import { JobsRepositoy } from './repositories/job.repository';
import { FilterJobsDto, SortJobDto } from './dto/query-jobs.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Job } from './domain/job';
import { NullableType } from '../utils/types/nullable.type';
import { EntityCondition } from '../utils/types/entity-condition.type';

@Injectable()
export class JobsService {
  constructor(private readonly jobsRepository: JobsRepositoy) {}

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterJobsDto | null;
    sortOptions?: SortJobDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Job[]> {
    return this.jobsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findOne(fields: EntityCondition<Job>): Promise<NullableType<Job>> {
    return this.jobsRepository.findOne(fields);
  }
}
