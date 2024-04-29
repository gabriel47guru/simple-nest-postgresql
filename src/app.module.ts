import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { BusinessesModule } from './businesses/businesses.module';
import { TypeOrmConfigService } from './database/typeorm-config.service';

const dataBaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});

@Module({
  imports: [dataBaseModule, BusinessesModule],
})
export class AppModule {}
