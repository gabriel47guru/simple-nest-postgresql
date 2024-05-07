import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BusinessEntity } from '../entities/business.entity';
import { FilterBusinessDto, SortBusinessDto } from '../dto/query-business.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { BusinessMapper } from '../mappers/business.maper';
import { Business } from '../domain/business';

@Injectable()
export class BusinessesRepository {
  constructor(
    @InjectRepository(BusinessEntity)
    private readonly businessesRepository: Repository<BusinessEntity>,
  ) {}

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterBusinessDto | null;
    sortOptions?: SortBusinessDto[] | null;
    paginationOptions?: IPaginationOptions;
  }): Promise<Business[]> {
    const where: FindOptionsWhere<BusinessEntity> = {};

    where.isPublic = filterOptions?.isPublic ?? true;

    const entities = await this.businessesRepository.find({
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

    return entities.map((business) => BusinessMapper.toDomain(business));
  }
}
