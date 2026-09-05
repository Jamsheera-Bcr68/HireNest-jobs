import { Company } from '../../domain/entities/company.entity';
import { CompanyDataDto } from '../dtos/company.dto';

export class CompanyMapper {
  static toCompanyDataDto(company: Company): CompanyDataDto {
    return {...company}
    // return {
    //   companyName: company.companyName,

    //   logoUrl: company.logoUrl,
    //   tagLine: company.tagLine,

    //   website: company.website,

    //   about: company.about,
    //   mission: company.mission,
    //   vision: company.vision,
    //   culture: company.culture,

    //   benefits: company.benefits,

    //   startedIn: company.startedIn,
    //   document: company.document,
    //   industry: company.industry,
    //   size: company.size,

    //   address:
    //     company.address.place +
    //     ' ' +
    //     company.address.state +
    //     ' ' +
    //     company.address.country,

    //   socialMediaLinks: company.socialMediaLinks,
    // };
  }
}
