import { type ISocialLinks } from '../../../../types/profileTypes';
import { companyRegisterSchema } from '../../../../libraries/validations/company/companyRegisterValidator';
import {
  type IndustryType,
  type CompanySize,
  type DocumentType,
  type AddressType,
} from '../../../../types/dtos/profileTypes/industryType';
import { useToast } from '../../../../shared/toast/useToast';
import { companyService } from '../../../../services/apiServices/companyService';

type NestedKeys = 'links' | 'adress';
import { useState } from 'react';

export type RegisterFormType = {
  companyName: string;
  website: string;
  logo: string | '';
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
  };
  startedIn: string | '';
  isAgreed: boolean;
  isConsent: boolean;
};
const initialStata: RegisterFormType = {
  companyName: '',
  logo: '',
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
  documents: { type: '', file: '' },
  startedIn: '',
  isAgreed: false,
  isConsent: false,
};
const initialError: FormError = {
  companyName: '',
  website: '',
  logo: '',
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
  documents: { type: '', file: '' },
  startedIn: '',
  isAgreed: '',
  isConsent: '',
};
type FormError = {
  companyName: string;
  logo: string;
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
  documents: { type: string; file: string };
  startedIn: string;
  isAgreed: string;
  isConsent: string;
};
export const useRegisterCompany = (url: string | '') => {
  const { showToast } = useToast();
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [formData, setFormData] = useState<RegisterFormType>(initialStata);
  const [error, setError] = useState<FormError>(initialError);
  const [verify_file, setVerify_file] = useState<File | null>(null);
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
    console.log('verify file', verify_file);

    let updatedFormData = { ...formData };
    setFormData((prev) => ({ ...prev, logo: url }));

    if (!verify_file) {
      setError((prev) => ({
        ...prev,
        documents: { ...prev.documents, file: 'Please select a file' },
      }));
      return;
    }
    console.log('from handle submit', updatedFormData);
    const result = companyRegisterSchema.safeParse(updatedFormData);
    if (!result.success) {
      const error = result.error.format();
      const Err: FormError = {
        website: error.website?._errors[0] || '',
        companyName: error.companyName?._errors[0] || '',
        tagLine: error.tagLine?._errors[0] || '',
        logo: error.logo?._errors[0] || '',
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
      const formData = new FormData();

      formData.append('verification_document', verify_file);
      const docResposnse = await companyService.uploadDocument(formData);
      const docUrl = docResposnse.data;
      setFormData((prev) => ({
        ...prev,
        documents: { ...prev.documents, file: docUrl },
      }));
      const data = await companyService.registerCompany(result.data);
      setIsSuccessOpen(true);
      showToast({ msg: data.message, type: 'success' });
    } catch (error: any) {
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
