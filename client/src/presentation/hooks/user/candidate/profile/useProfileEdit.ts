import { useEffect, useState } from 'react';
import { profileDataSchema } from '../../../../../libraries/validations/auth/candidate/profile.validation';

import type { typeOfToast } from '../../../../../types/toast.types';
import type { ISocialLinks } from '../../../../../types/profile.types';
import { type UserProfileType } from '../../../../../types/dtos/profile-types/user.types';
import { profileService } from '../../../../../services/api-services/candidateService';

type FormData = {
  name?: string;
  title?: string;
  place?: string;
  state?: string;
  country?: string;
  socialMediaLinks?: ISocialLinks;
};

export const useProfileEdit = (
  showToast: (toast: typeOfToast) => void,
  onClose: () => void,
  user: UserProfileType | undefined,
  onUserUpdate: (updatedUser: UserProfileType) => void
) => {
  const [formData, setFormData] = useState<FormData>({});
  const [error, setError] = useState<FormData>({});

  useEffect(() => {
    if (!user) return;
    if (user) {
      setFormData({
        name: user?.name || '',
        title: user?.title || '',
        place: user?.address?.place || '',
        state: user?.address?.state || '',
        country: user?.address?.country || '',
        socialMediaLinks: {
          gitHub: user?.socialLinks?.gitHub || '',
          linkedIn: user?.socialLinks?.linkedIn || '',
          portfolio: user?.socialLinks?.portfolio || '',
          whatsapp: user?.socialLinks?.whatsapp || '',
          youtube: user?.socialLinks?.youtube || '',
          twitter: user?.socialLinks?.twitter || '',
        },
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('from handle change');

    const { name, value, dataset } = e.currentTarget;
    if (dataset && dataset.section) {
      setFormData((prev) => ({
        ...prev,
        socialMediaLinks: {
          ...prev.socialMediaLinks,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form data ', formData);

    const result = profileDataSchema.safeParse(formData);
    if (!result.success) {
      const error = result.error.format();
      console.log('zode error', error);

      const formattedError: FormData = {
        name: error?.name?._errors?.[0],
        title: error.title?._errors?.[0],
        place: error.place?._errors?.[0],
        state: error.state?._errors?.[0],
        country: error.country?._errors?.[0],
        socialMediaLinks: {
          gitHub: error.socialMediaLinks?.gitHub?._errors?.[0],
          linkedIn: error.socialMediaLinks?.linkedIn?._errors?.[0],
          whatsapp: error.socialMediaLinks?.whatsapp?._errors?.[0],
          portfolio: error.socialMediaLinks?.portfolio?._errors?.[0],
          twitter: error.socialMediaLinks?.twitter?._errors?.[0],
          youtube: error.socialMediaLinks?.youtube?._errors?.[0],
        },
      };

      setError(formattedError);

      return;
    }
    console.log('result.data', result.data);

    if (Object.entries(result.data).every((arr) => arr[1] == undefined)) {
      showToast({ msg: 'Nothing to Update', type: 'error' });
      return;
    }

    setError({});
    try {
      const data = await profileService.updateProfile(formData);

      const updated: UserProfileType = data.user;
      showToast({ msg: data.message, type: 'success' });
      onUserUpdate(updated);
      onClose();
      setFormData({});
    } catch (error: any) {
      console.log(error);
      showToast({
        msg: error?.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  return {
    formData,
    handleChange,
    handleSubmit,
    error,
  };
};
