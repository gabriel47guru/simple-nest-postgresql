import { Business } from '../domain/business';
import { BusinessEntity } from '../entities/business.entity';

export class BusinessMapper {
  static toDomain(raw: BusinessEntity): Business {
    const business = new Business();
    business.id = raw.id;
    business.name = raw.name;
    business.phoneNumber = raw.phoneNumber;
    business.businessCity = raw.businessCity;
    business.businessState = raw.businessState;
    business.isPublic = raw.isPublic;
    return business;
  }
}
