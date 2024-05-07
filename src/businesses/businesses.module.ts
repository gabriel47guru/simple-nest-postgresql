import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessesController } from './businesses.controller';
import { BusinessesService } from './businesses.service';
import { BusinessEntity } from './entities/business.entity';
import { BusinessesRepository } from './repositories/business.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessEntity])],
  controllers: [BusinessesController],
  providers: [BusinessesService, BusinessesRepository],
})
export class BusinessesModule {}
