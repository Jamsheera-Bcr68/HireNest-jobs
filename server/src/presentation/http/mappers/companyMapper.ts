import { CompanyRegisterType } from '../validators/company/registerValidation';
import { companyDto } from '../../../applications/Dtos/companyDto';
import { CompanyProfileEditType } from '../validators/company/companyProfileEditValidation';
import { CompanyUpdateDto } from '../../../applications/Dtos/companyDto';
import { CompanyUpdateFiedType } from '../validators/company/companyUpdateFieldsValidation';

export class CompanyMapper {
  static toCompanyDto(
    data: CompanyRegisterType,
    userId: string
  ): Partial<companyDto> {
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
      logoUrl: data.logoUrl ?? '',
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
      document: data.documents,
    };
  }
  static CompanyProfileEditTypeToCompanyDto(
    data: CompanyProfileEditType
  ): CompanyUpdateDto {
    return {
      companyName: data.companyName,
      website: data.website,
      tagLine: data.tagLine ?? '',

      startedIn: Number(data.startedIn),

      industry: data.industry,
      socialMediaLinks: {
        gitHub: data.socialMediaLinks?.github ?? '',
        linkedIn: data.socialMediaLinks?.linkedin ?? '',
        whatsapp: data.socialMediaLinks?.whatsapp ?? '',
        youtube: data.socialMediaLinks?.youtube ?? '',
        twitter: data.socialMediaLinks?.twitter ?? '',
        portfolio: data.socialMediaLinks?.portfolio ?? '',
      },
      size: data.size,
      address: {
        place: data.address?.place ?? '',
        state: data.address?.state ?? '',
        country: data.address?.country ?? '',
      },
    };
  }
  static CompanyUpdateFiedTypeToCompanyDto(
    data: CompanyUpdateFiedType
  ): Partial<companyDto> {
    console.log('data from mapper', data);

    const dto: Partial<companyDto> = {};

    if (data.mission !== undefined) dto.mission = data.mission;
    if (data.vision !== undefined) dto.vision = data.vision;
    if (data.about !== undefined) dto.about = data.about;
    if (data.benefits !== undefined) dto.benefits = data.benefits;
    if (data.culture !== undefined) dto.culture = data.culture;
    if (data.socialMediaLinks !== undefined)
      dto.socialMediaLinks = data.socialMediaLinks;

    return dto;
  }
}
