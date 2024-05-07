import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Job } from '../domain/job';

export class FilterJobsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}

export class SortJobDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Job;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryJobDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @Transform(({ value }) =>
    value ? plainToInstance(FilterJobsDto, JSON.parse(value)) : undefined,
  )
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterJobsDto)
  filters?: FilterJobsDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortJobDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  sort?: SortJobDto[] | null;
}
