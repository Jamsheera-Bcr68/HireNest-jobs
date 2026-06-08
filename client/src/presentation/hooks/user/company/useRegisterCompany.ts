import { type ISocialLinks } from '../../../../types/profile.types';
import { companyRegisterSchema } from '../../../../libraries/validations/company/company-register.validator';
import {
  type IndustryType,
  type CompanySize,
  type DocumentType,
  type AddressType,
} from '../../../../types/dtos/profile-types/industry.type';
import { updateUser } from '../../../../redux/auth-slice';

import { useToast } from '../../../../shared/toast/use-toast';
import { companyService } from '../../../../services/api-services/companyService';
import { useDispatch } from 'react-redux';

type NestedKeys = 'links' | 'adress';
import { useEffect, useState } from 'react';

export type RegisterFormType = {
  companyName: string;
  website: string;
  logoUrl: string | '';
  industry: IndustryType | '';
  tagLine: string;
  links: ISocialLinks;
  size: CompanySize | '';
  adress: AddressType;
  email: string;
  phone: string;
  about: string;
  documents: {
    type: DocumentType | '';
    file: string;
    name: string;
  };
  startedIn: string | '';
  isAgreed: boolean;
  isConsent: boolean;
};
const initialStata: RegisterFormType = {
  companyName: '',
  logoUrl: '',
  website: '',
  industry: '',
  tagLine: '',
  phone: '',
  links: {
    portfolio: '',
    linkedIn: '',
    youtube: '',
    whatsapp: '',
    twitter: '',
  },
  size: '',
  adress: {
    country: '',
    place: '',
    state: '',
  },
  email: '',
  about: '',
  documents: { type: '', file: '', name: '' },
  startedIn: '',
  isAgreed: false,
  isConsent: false,
};
const initialError: FormError = {
  companyName: '',
  website: '',
  logoUrl: '',
  industry: '',

  tagLine: '',
  phone: '',
  links: {
    portfolio: '',
    linkedIn: '',
    youtube: '',
    whatsapp: '',
    twitter: '',
  },
  size: '',
  adress: {
    country: '',
    place: '',
    state: '',
  },
  email: '',
  about: '',
  documents: { type: '', file: '', name: '' },
  startedIn: '',
  isAgreed: '',
  isConsent: '',
};
type FormError = {
  companyName: string;
  logoUrl: string;
  industry: string;
  tagLine: string;
  phone: string;
  website: string;
  links: {
    portfolio: string;

    linkedIn: string;
    youtube: string;
    whatsapp: string;
    twitter: string;
  };
  size: string;
  adress: {
    country: string;
    place: '';
    state: string;
  };
  email: string;
  about: string;
  documents: { type: string; file: string; name: string };
  startedIn: string;
  isAgreed: string;
  isConsent: string;
};
export const useRegisterCompany = (isReapply?: boolean) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [formData, setFormData] = useState<RegisterFormType>(initialStata);
  const [error, setError] = useState<FormError>(initialError);
  const [verify_file, setVerify_file] = useState<File | null>(null);

  useEffect(() => {
    console.log('form use register reapply s ', isReapply);

    const fetchCompany = async () => {
      try {
        const data = await companyService.getCompany();
        console.log('data after fetching company from useregster', data);

        if (data.company)
          setFormData({
            ...formData,
            companyName: data.company.companyName,
            website: data.company.website ?? '',
            logoUrl: data.company.logoUrl,
            industry: data.company.industry,
            tagLine: data.company.tagLine,
            size: data.company.size,
            links: {
              gitHub: data.company.socialMediaLinks.gitHub ?? '',
              linkedIn: data.company.socialMediaLinks.linkedIn ?? '',
              portfolio: data.company.socialMediaLinks.portfolio ?? '',
              whatsapp: data.company.socialMediaLinks.whatsapp ?? '',
              youtube: data.company.socialMediaLinks.Youtube ?? '',
              twitter: data.company.socialMediaLinks.twitter ?? '',
            },
            adress: {
              state: data.company.address.state ?? '',
              country: data.company.address.country ?? '',
            },
            email: data.company.email ?? '',
            phone: data.company.phone ?? '',
            about: data.company.about ?? '',
            documents: {
              type: data.company.document.type ?? '',
              file: data.company.document.file,
              name: data.company.document.name ?? '',
            },
          startedIn: String(data.company.startedIn),
            isAgreed: data.company.isAgreed,
            isConsent: data.company.isConsent,
          });
      } catch (error) {}
    };
    if (isReapply) fetchCompany();
  }, [isReapply]);

  const handleAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name, type } = e.currentTarget;
    if (
      e.currentTarget instanceof HTMLInputElement &&
      name == 'isAgreed' &&
      type == 'checkbox'
    ) {
      let { checked } = e.currentTarget;
      setFormData((prev) => ({ ...prev, isAgreed: checked ? true : false }));
    } else if (
      e.currentTarget instanceof HTMLInputElement &&
      name == 'isConsent' &&
      type == 'checkbox'
    ) {
      let { checked } = e.currentTarget;
      setFormData((prev) => ({ ...prev, isConsent: checked ? true : false }));
    } else {
      if (name.includes('.')) {
        console.log('from handlechange');

        const [parent, child] = name.split('.') as [NestedKeys, string];

        setFormData((prev) => ({
          ...prev,
          [parent]: { ...prev[parent], [child]: value },
        }));
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    console.log('from register file');

    console.log('verify file', verify_file);

    if (!verify_file && !formData.documents.file) {
      console.log('no verify file and formadat.documents');
      
      setError((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          file: 'Please select a file',
        },
      }));
      console.log('formData.documents.file',formData.documents.file,'verfy file',verify_file);
   
      return;
    }
    console.log('from handle submit', formData);
    const result = companyRegisterSchema.safeParse(formData);
  console.log('validation result',result);
    if (!result.success) {
      const error = result.error.format();
      const Err: FormError = {
        website: error.website?._errors[0] || '',
        companyName: error.companyName?._errors[0] || '',
        tagLine: error.tagLine?._errors[0] || '',
        logoUrl: error.logoUrl?._errors[0] || '',
        phone: error.phone?._errors[0] || '',
        size: error.size?._errors[0] || '',
        email: error.email?._errors[0] || '',
        industry: error.industry?._errors[0] || '',
        about: error.about?._errors[0] || '',
        startedIn: error.startedIn?._errors[0] || '',
        isAgreed: error.isAgreed?._errors[0] || '',
        isConsent: error.isConsent?._errors[0] || '',

        documents: {
          type: error.documents?.type?._errors[0] || '',
          file: error.documents?.file?._errors[0] || '',
          name: '',
        },

        adress: {
          country: error.adress?.country?._errors[0] || '',
          state: error.adress?.state?._errors[0] || '',
          place: '', // if needed
        },

        links: {
          portfolio: '', // not in schema, keep default
          linkedIn: error.links?.linkedIn?._errors[0] || '',
          youtube: error.links?.youtube?._errors[0] || '',
          whatsapp: error.links?.whatsapp?._errors[0] || '',
          twitter: error.links?.twitter?._errors[0] || '',
        },
      };
      setError(Err);
      return;
    }
  
    
    setError(initialError);

    console.log('validation success');
    try {
      let docUrl: string = formData.documents.file;
      let docName: string = formData.documents.name;
      if (verify_file) {
        const docData = new FormData();
        docData.append('verification_document', verify_file);
        const docResposnse = await companyService.uploadDocument(docData);
        docUrl = docResposnse.data.docUrl;
        docName = verify_file.name;
      }

      console.log('doc url', docUrl);

      setFormData((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          file: docUrl,
          name: docName,
        },
      }));
      console.log('result.data', result.data);
      let resData = result.data;
      resData = {
        ...resData,
        documents: {
          ...resData.documents,
          file: docUrl,
          name: docName,
        },
      };
      console.log('resdata after file adding', resData);

      const data = isReapply
        ? await companyService.updateCompany(resData)
        : await companyService.registerCompany(resData);
      console.log('after form sumbit', data);

      setIsSuccessOpen(true);
      dispatch(updateUser({ isRequested: true }));
      showToast({ msg: data.message, type: 'success' });
    } catch (error: any) {
      console.log('error',error);
      
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
    }
  };

  return {
    error,
    formData,
    handleChange,
    handleAreaChange,
    handleSubmit,
    setFormData,
    verify_file,
    setVerify_file,
    isSuccessOpen,
    setIsSuccessOpen,
  };
};
