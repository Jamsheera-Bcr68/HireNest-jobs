import { Company } from "../../domain/entities/company";
import { CompanyDataDto } from "../Dtos/companyDto";

export class CompanyMapper {
    static toCompanyDataDto(company:Company):CompanyDataDto{
        return{
            companyName:company.companyName,
            
             logoUrl:company.logoUrl,
             tagLine:company.tagLine,
           
             website:company.website,
           
             about: company.about,
             mission:company.mission,
             vision: company.vision,
             culture:company.culture,
           
             benefits: company.benefits,
           
             startedIn: company.startedIn,
           
             industry:company.industry,
             size: company.size,
           
             address:company.address.place+' '+company.address.state+' '+company.address.country,
           
             socialMediaLinks: company.socialMediaLinks
        }
    }
}