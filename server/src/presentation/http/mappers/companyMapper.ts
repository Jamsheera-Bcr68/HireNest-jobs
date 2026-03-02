import { CompanyRegisterType } from '../validators/company/registerValidation';
import { companyDto } from '../../../applications/Dtos/companyDto';

export class CompanyMapper {
  static toCompanyDto(data: CompanyRegisterType, userId: string): companyDto {
    return {
      companyName: data.companyName,
      website: data.website,
      tagLine: data.tagLine ?? '',
      email: data.email,
      userId: userId,
      phone: data.phone,
      about: data.about,
      startedIn: Number(data.startedIn),
      isAgreed: data.isAgreed,
      isConsent: data.isConsent,
      logo: data.logo ?? '',
      industry: data.industry,
      socialMediaLinks: {
        gitHub: data.links.gitHub ?? '',
        linkedIn: data.links.linkedIn ?? '',
        whatsapp: data.links.whatsapp ?? '',
        youtube: data.links.youtube ?? '',
        twitter: data.links.twitter ?? '',
        portfolio: data.links.portfolio ?? '',
      },
      size: data.size,
      address: data.adress,
      documents: data.documents,
    };
  }
}
