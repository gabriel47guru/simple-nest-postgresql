import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Business } from '../domain/business';

export class FilterBusinessDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}

export class SortBusinessDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Business;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryBusinessDto {
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
    value ? plainToInstance(FilterBusinessDto, JSON.parse(value)) : undefined,
  )
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterBusinessDto)
  filters?: FilterBusinessDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortBusinessDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  sort?: SortBusinessDto[] | null;
}
