import { Injectable } from '@nestjs/common';
import { BusinessesRepository } from './repositories/business.repository';
import { FilterBusinessDto, SortBusinessDto } from './dto/query-business.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Business } from './domain/business';

@Injectable()
export class BusinessesService {
  constructor(private readonly businessesRepository: BusinessesRepository) {}

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterBusinessDto | null;
    sortOptions?: SortBusinessDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Business[]> {
    return this.businessesRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }
}
