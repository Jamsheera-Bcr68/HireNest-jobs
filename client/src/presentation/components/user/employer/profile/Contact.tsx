import type { CompanyProfileType } from '../../../../../types/dtos/profileTypes/userTypes';
import ContactInputForm from './ContactInputForm';
import { type ISocialLinks } from '../../../../../types/profileTypes';
import { socialLinksSchema } from '../../../../../libraries/validations/company/companyUpdateFieldsValidation';
import { useToast } from '../../../../../shared/toast/useToast';
import {
  Linkedin,
  TwitterIcon,
  GithubIcon,
  Globe,
  YoutubeIcon,
  Handshake,
  SquarePenIcon,
} from 'lucide-react';
import ModalLayout from '../../../../Layoutes/ModalLayout';
import { useEffect, useState } from 'react';
import { companyService } from '../../../../../services/apiServices/companyService';
export function ContactLinks({
  company,
  onUpdate,
}: {
  company: CompanyProfileType | null;
  onUpdate: (company: CompanyProfileType) => void;
}) {
  console.log('company.links', company?.socialMediaLinks);
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<ISocialLinks>({
    linkedIn: '',
    gitHub: '',
    twitter: '',
    whatsapp: '',
    youtube: '',
    portfolio: '',
  });
  const [error, setError] = useState<ISocialLinks>({
    linkedIn: '',
    gitHub: '',
    twitter: '',
    whatsapp: '',
    youtube: '',
    portfolio: '',
  });
  const { showToast } = useToast();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (company?.socialMediaLinks) {
      setFormData(company.socialMediaLinks);
    }
  }, [company]);
  const handleSubmit = async () => {
    console.log('from handle submit');

    const result = socialLinksSchema.safeParse(formData);
    console.log('result', result);

    if (!result.success) {
      const err = result.error.flatten().fieldErrors;
      const formatted = {
        linkedIn: err.linkedIn?.[0] || '',
        gitHub: err.gitHub?.[0] || '',
        twitter: err.twitter?.[0] || '',
        whatsapp: err.whatsapp?.[0] || '',
        youtube: err.youtube?.[0] || '',
        portfolio: err.portfolio?.[0] || '',
      };
      console.log('fromatted ', formatted);

      setError(formatted);
      return;
    }
    setError({});
    try {
      const data = await companyService.addLink(result.data);
      console.log('data after links update', data);
      showToast({ msg: data.message, type: 'success' });
      setOpen(false);
      onUpdate(data.company);
    } catch (error: any) {
      showToast({
        msg: error?.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-3">
      <div className="flex justify-between">
        <div className="flex gap-4 text-xl">
          <Handshake size={22} className="text-red-600 mt-1 text-bold" />
          <h2 className="text-lg font-semibold mb-3">Connect</h2>
        </div>
        <div className=" ">
          <button
            onClick={() => setOpen(true)}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            <SquarePenIcon size={18} />
          </button>
        </div>
      </div>
      <div className="flex gap-4 text-xl">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <a
              href={company?.website}
              target="_blank"
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <Globe />
            </a>

            {company?.socialMediaLinks?.linkedIn && (
              <a
                href={company.socialMediaLinks?.linkedIn}
                target="_blank"
                className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
              >
                <Linkedin />
              </a>
            )}
            {company?.socialMediaLinks?.twitter && (
              <a
                href={company?.socialMediaLinks?.twitter}
                target="_blank"
                className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
              >
                <TwitterIcon />
              </a>
            )}

            {company?.socialMediaLinks?.gitHub && (
              <a
                href={company?.socialMediaLinks?.gitHub}
                target="_blank"
                className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
              >
                <GithubIcon />
              </a>
            )}
            {company?.socialMediaLinks?.whatsapp && (
              <a
                href={company?.socialMediaLinks?.whatsapp}
                target="_blank"
                className="p-3 bg-green-100 text-white rounded-full hover:bg-green-200"
              >
                <svg
                  className="w-5 h-5 text-white-500"
                  fill="green"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.52 3.48A11.82 11.82 0 0012 0C5.372 0 0 5.373 0 12c0 2.116.553 4.182 1.6 6.01L0 24l6.207-1.63A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12 0-3.204-1.247-6.216-3.48-8.52zM12 21.82c-1.805 0-3.57-.488-5.102-1.412l-.366-.218-3.682.967.984-3.588-.239-.37A9.75 9.75 0 012.18 12c0-5.425 4.395-9.82 9.82-9.82 2.622 0 5.086 1.022 6.94 2.88A9.748 9.748 0 0121.82 12c0 5.425-4.395 9.82-9.82 9.82zm5.388-7.388c-.294-.147-1.74-.86-2.01-.96-.27-.098-.468-.147-.665.147-.196.294-.763.96-.936 1.157-.173.196-.345.22-.64.073-.294-.147-1.242-.458-2.366-1.46-.874-.78-1.464-1.744-1.637-2.038-.173-.294-.018-.453.13-.6.132-.13.294-.345.44-.517.147-.173.196-.294.294-.49.098-.196.049-.368-.024-.517-.073-.147-.665-1.61-.91-2.205-.24-.577-.485-.498-.665-.508l-.566-.01c-.196 0-.517.073-.788.368-.27.294-1.035 1.01-1.035 2.462 0 1.452 1.06 2.856 1.207 3.053.147.196 2.086 3.19 5.053 4.472.706.304 1.256.486 1.685.622.708.225 1.353.193 1.863.117.568-.085 1.74-.71 1.985-1.396.245-.686.245-1.274.172-1.396-.073-.123-.27-.196-.566-.343z" />
                </svg>
              </a>
            )}
            {company?.socialMediaLinks?.youtube && (
              <a
                href={company?.socialMediaLinks?.youtube}
                target="_blank"
                className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
              >
                <YoutubeIcon />
              </a>
            )}
          </div>
        </div>
      </div>
      <ModalLayout open={open} onClose={() => setOpen(false)}>
        <ContactInputForm
          title="Add Social links"
          onCancel={() => setOpen(false)}
          onSubmit={handleSubmit}
          onChange={handleChange}
          formData={formData}
          error={error}
        />
      </ModalLayout>
    </div>
  );
}
