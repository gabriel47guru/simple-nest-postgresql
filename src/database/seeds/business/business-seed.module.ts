import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessSeedService } from './business-seed.service';
import { BusinessEntity } from '../../../businesses/entities/business.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessEntity])],
  providers: [BusinessSeedService],
  exports: [BusinessSeedService],
})
export class BusinessSeedModule {}
