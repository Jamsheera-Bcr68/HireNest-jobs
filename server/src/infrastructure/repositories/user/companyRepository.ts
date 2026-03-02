import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import {
  ICompanyDocument,
  companyModel,
} from '../../database/models/user/companyModel';
import { GenericRepository } from '../genericRepository';
import { Company } from '../../../domain/entities/company';
import { companyDto } from '../../../applications/Dtos/companyDto';
import { User } from '../../../domain/entities/User';
import { Types } from 'mongoose';

export class CompanyRepository
  extends GenericRepository<Company, ICompanyDocument>
  implements ICompanyRepository
{
  constructor() {
    super(companyModel);
  }

  protected mapToEntity(doc: ICompanyDocument): Company {
    return {
      id: doc._id.toString(),
      companyName: doc.companyName,
      website: doc.website,
      userId: doc.userId.toString(),
      tagLine: doc.tagLine,
      email: doc.email,
      phone: doc.phone,
      about: doc.about,
      startedIn: doc.startedIn,
      isAgreed: doc.isAgreed,
      isConsent: doc.isConsent,
      logoUrl: doc.logoUrl,
      industry: doc.industry,
      socialMediaLinks: doc.socialMediaLinks,
      size: doc.size,
      address: doc.address,
      document: doc.document,
    };
  }
  protected mapToPersistance(entity: Company): Partial<ICompanyDocument> {
    return {
      companyName: entity.companyName,
      userId: new Types.ObjectId(entity.userId),
      website: entity.website ?? '',
      tagLine: entity.tagLine ?? '',
      email: entity.email,
      phone: entity.phone,
      about: entity.about,
      startedIn: entity.startedIn,
      isAgreed: entity.isAgreed,
      isConsent: entity.isConsent,
      logoUrl: entity.logoUrl,
      industry: entity.industry,
      socialMediaLinks: entity.socialMediaLinks,
      size: entity.size,
      address: entity.address,
      document: entity.document,
    };
  }
}
