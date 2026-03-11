import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import {
  ICompanyDocument,
  companyModel,
} from '../../database/models/user/companyModel';
import { GenericRepository } from '../genericRepository';
import { Company } from '../../../domain/entities/company';
import { CompanyListDTO } from '../../../applications/Dtos/companyDto';

import { Types } from 'mongoose';
import { id } from 'zod/v4/locales';

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
  async getCompanyList(
    filter: Partial<Company>
  ): Promise<CompanyListDTO[] | []> {
    const companies = await this._model.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: 'jobs',
          foreignField: 'companyId',
          localField: '_id',
          as: 'jobs',
        },
      },
      { $addFields: { jobCount: { $size: '$jobs' } } },
      {
        $project: {
          _id: 1,
          companyName: 1,
          email: 1,
          logoUrl: 1,
          status: 1,
          createdAt: 1,
          industry: 1,
        },
      },
    ]);
    console.log('companies docs from repo', companies);
    console.log(
      'after mapping',
      companies.map((e) => this.mapToCompanyListDTO(e))
    );

    return companies.map((e) => this.mapToCompanyListDTO(e));
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
      status: doc.status,

      joinedAt: doc.createdAt,
      requestedSkills: doc.requestedSkills.map((id) => id.toString()),
    };
  }

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
  private mapToCompanyListDTO(doc: any): CompanyListDTO {
    return {
      id: doc._id.toString(),
      companyName: doc.companyName,
      email: doc.email,
      logoUrl: doc.logoUrl,
      status: doc.status,
      industry: doc.industry,
      jobCount: doc.jobCount,
      createdAt: doc.createdAt,
    };
  }
}
