import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import {
  ICompanyDocument,
  companyModel,
} from '../../database/models/user/companyModel';
import { GenericRepository } from '../genericRepository';
import { Company } from '../../../domain/entities/company';

import { Types } from 'mongoose';

export class CompanyRepository
  extends GenericRepository<Company, ICompanyDocument>
  implements ICompanyRepository
{
  constructor() {
    super(companyModel);
  }
  async findByUserId(userId: string): Promise<Company | null> {
    const company = await this._model.findOne({
      userId: new Types.ObjectId(userId),
    });
    console.log('company from repo', company);

    if (!company) return null;
    return this.mapToEntity(company);
  }
  protected mapToEntity(doc: ICompanyDocument): Company {
    return {
      id: doc._id.toString(),
      companyName: doc.companyName,
      website: doc.website,
      mission: doc.mission,

      userId: doc.userId.toString(),

      vision: doc.vision,
      culture: doc.culture,
      benefits: doc.benefits,
      tagLine: doc.tagLine,
      isVerified: doc.isVerified,
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
  // protected mapToPersistance(entity: Company): Partial<ICompanyDocument> {
  //   console.log('USER ID IN ENTITY:', entity.userId);
  protected mapToPersistance(
    entity: Partial<Company>
  ): Partial<ICompanyDocument> {
    const data: Partial<ICompanyDocument> = {};
    console.log('from map to persistance', entity);

    if (entity.companyName !== undefined) data.companyName = entity.companyName;
    if (entity.userId !== undefined)
      data.userId = new Types.ObjectId(entity.userId);

    if (entity.website !== undefined) data.website = entity.website;
    if (entity.tagLine !== undefined) data.tagLine = entity.tagLine;
    if (entity.email !== undefined) data.email = entity.email;
    if (entity.phone !== undefined) data.phone = entity.phone;
    if (entity.about !== undefined) data.about = entity.about;

    if (entity.startedIn !== undefined)
      data.startedIn = Number(entity.startedIn);

    if (entity.mission !== undefined) data.mission = entity.mission;
    if (entity.vision !== undefined) data.vision = entity.vision;
    if (entity.culture !== undefined) data.culture = entity.culture;
    if (entity.benefits !== undefined) data.benefits = entity.benefits;

    if (entity.isAgreed !== undefined) data.isAgreed = entity.isAgreed;
    if (entity.isConsent !== undefined) data.isConsent = entity.isConsent;

    if (entity.logoUrl !== undefined) data.logoUrl = entity.logoUrl;
    if (entity.industry !== undefined) data.industry = entity.industry;

    if (entity.socialMediaLinks !== undefined)
      data.socialMediaLinks = entity.socialMediaLinks;

    if (entity.size !== undefined) data.size = entity.size;
    if (entity.address !== undefined) data.address = entity.address;
    if (entity.document !== undefined) data.document = entity.document;

    return data;
  }
  // return {
  //   companyName: entity.companyName,
  //   userId: new Types.ObjectId(entity.userId),
  //   website: entity.website ?? '',
  //   tagLine: entity.tagLine ?? '',
  //   email: entity.email,
  //   phone: entity.phone,
  //   about: entity.about,
  //   startedIn: Number(entity.startedIn),
  //   mission: entity.mission,
  //   vision: entity.vision,
  //   culture: entity.culture,
  //   benefits: entity.benefits,
  //   isAgreed: entity.isAgreed,
  //   isConsent: entity.isConsent,
  //   logoUrl: entity.logoUrl,
  //   industry: entity.industry,
  //   socialMediaLinks: entity.socialMediaLinks,
  //   size: entity.size,
  //   address: entity.address,
  //   document: entity.document,
  // };
  //}
}
