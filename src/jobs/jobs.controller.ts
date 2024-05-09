import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Param,
  Query,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { QueryJobDto } from './dto/query-jobs.dto';
import { Job } from './domain/job';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { infinityPagination } from '../utils/infinity-pagination';
import { NullableType } from '../utils/types/nullable.type';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryJobDto,
  ): Promise<InfinityPaginationResultType<Job>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.jobsService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Job['id']): Promise<NullableType<Job>> {
    return this.jobsService.findOne({ id });
  }
}
