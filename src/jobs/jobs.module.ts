import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobEntity } from './entities/jobs.entity';
import { JobsRepositoy } from './repositories/job.repository';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity])],
  controllers: [JobsController],
  providers: [JobsService, JobsRepositoy],
})
export class JobsModule {}
