import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { BusinessSeedService } from './business/business-seed.service';
import { JobSeedService } from './jobs/job-seed.service';

const runSeeds = async () => {
  const app = await NestFactory.create(SeedModule);

  //run
  await app.get(JobSeedService).run();
  await app.get(BusinessSeedService).run();

  await app.close();
};

void runSeeds();
