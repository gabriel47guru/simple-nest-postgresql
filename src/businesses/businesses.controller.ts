import { Controller, Get, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { QueryBusinessDto } from './dto/query-business.dto';
import { Business } from './domain/business';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { infinityPagination } from '../utils/infinity-pagination';

@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryBusinessDto,
  ): Promise<InfinityPaginationResultType<Business>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.businessesService.findManyWithPagination({
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
}
