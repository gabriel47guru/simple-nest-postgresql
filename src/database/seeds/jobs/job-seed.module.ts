import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeedService } from './job-seed.service';
import { JobEntity } from '../../../jobs/entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity])],
  providers: [JobSeedService],
  exports: [JobSeedService],
})
export class JobSeedModule {}
