import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessEntity } from '../../../businesses/entities/business.entity';
import { businesses } from './businesses.ts';

@Injectable()
export class BusinessSeedService {
  constructor(
    @InjectRepository(BusinessEntity)
    private repository: Repository<BusinessEntity>,
  ) {}

  async run() {
    await this.repository.clear();
    await this.repository.save(
      businesses.map((business) =>
        this.repository.create({
          id: business.id,
          name: business.name,
          phoneNumber: business.phoneNumber,
          businessCity: business.businessCity,
          businessState: business.businessState,
          isPublic: business.isPublic,
        }),
      ),
    );
  }
}
