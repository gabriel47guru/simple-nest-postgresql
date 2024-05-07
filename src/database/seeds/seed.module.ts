import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { BusinessSeedModule } from './business/business-seed.module';
import { JobSeedModule } from './jobs/job-seed.module';
import databaseConfig from '../config/database.config';
import appConfig from '../../config/app.config';
import { TypeOrmConfigService } from '../typeorm-config.service';

@Module({
  imports: [
    JobSeedModule,
    BusinessSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class SeedModule {}
