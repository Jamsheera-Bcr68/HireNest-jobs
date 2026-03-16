import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import {
  ICompanyDocument,
  companyModel,
} from '../../database/models/user/companyModel';

import { GenericRepository } from '../genericRepository';
import { Company } from '../../../domain/entities/company';
import {
  PaginatedCompanies,
  CompanyListDTO,
  CompanyStatus,
} from '../../../applications/Dtos/companyDto';

import mongoose, { Types,  } from 'mongoose';

type CompanyQuery = Partial<Company> & {
  $or?: {
    companyName?: { $regex: string; $options: string };
    email?: { $regex: string; $options: string };
    industry?: { $regex: string; $options: string };
  }[];
};
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
   // console.log('company from repo', company);

    if (!company) return null;
    return this.mapToEntity(company);
  }

  async getCompanyList(
    filter: Partial<Company>,
    page: number,
    search: string,
    limit: number
  ): Promise<PaginatedCompanies> {

 const query: CompanyQuery = { ...filter };

if (search) {
  query.$or = [
    { companyName: { $regex: search, $options: "i" } },
    { email: { $regex: search, $options: "i" } },
    { industry: { $regex: search, $options: "i" } }
  ];
}
    const skip = (page - 1) * limit;
    const companies = await this._model
      .aggregate([
        { $match: query },
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
      ])
      .skip(skip)
      .limit(limit);
   // console.log('companies docs from repo', companies);
    // console.log(
    //   'after mapping',
    //   companies.map((e) => this.mapToCompanyListDTO(e))
    // );
    const totalDocs = await this._model.countDocuments(query);
    return {
      companies: companies.map((e) => this.mapToCompanyListDTO(e)),
      totalDocs,
    };
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
    if (entity.isVerified !== undefined) data.isVerified = entity.isVerified;
    if (entity.status !== undefined) data.status = entity.status;
    if (entity.size !== undefined) data.size = entity.size;
    if (entity.address !== undefined) data.address = entity.address;
    if (entity.document !== undefined) data.document = entity.document;
  //  console.log('data after persisatnce', data);

    return data;
  }


async getStatus(): Promise<CompanyStatus> {
  const statusDoc=await this._model.aggregate([{$group:{_id:'$status',count:{$sum:1}}}])
  const total=statusDoc.reduce((acc,doc)=>acc+doc.count,0)
 const status=Object.fromEntries(statusDoc.map(doc=>[doc._id,doc.count]))
 status.totalCompany=total
 console.log('status',status);
 
  return status
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
