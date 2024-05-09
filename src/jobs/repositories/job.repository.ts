import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { JobEntity } from '../entities/job.entity';
import { FilterJobsDto, SortJobDto } from '../dto/query-jobs.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { JobMapper } from '../mappers/job.maper';
import { Job } from '../domain/job';
import { EntityCondition } from '../../utils/types/entity-condition.type';
import { NullableType } from '../../utils/types/nullable.type';

@Injectable()
export class JobsRepositoy {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobsRepository: Repository<JobEntity>,
  ) {}

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterJobsDto | null;
    sortOptions?: SortJobDto[] | null;
    paginationOptions?: IPaginationOptions;
  }): Promise<Job[]> {
    const where: FindOptionsWhere<JobEntity> = {};

    const entities = await this.jobsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((business) => JobMapper.toDomain(business));
  }

  async findOne(fields: EntityCondition<Job>): Promise<NullableType<Job>> {
    const entity = await this.jobsRepository.findOne({
      where: fields as unknown as FindOptionsWhere<JobEntity>,
    });

    return entity ? JobMapper.toDomain(entity) : null;
  }
}
