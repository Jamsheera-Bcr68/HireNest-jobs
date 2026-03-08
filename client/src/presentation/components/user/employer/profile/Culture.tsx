import { useState } from 'react';
import { type CompanyProfileType } from '../../../../../types/dtos/profileTypes/userTypes';
import ModalLayout from '../../../../Layoutes/ModalLayout';
import { Users, SquarePenIcon } from 'lucide-react';
import CompanyProfileInputForm from './CompanyProfileInputForm';
import { companyService } from '../../../../../services/apiServices/companyService';
import { useToast } from '../../../../../shared/toast/useToast';
import { updateCompanyFieldSchema } from '../../../../../libraries/validations/company/companyUpdateFieldsValidation';

export function CultureSection({
  company,
  onUpdate,
}: {
  company: CompanyProfileType | null;
  onUpdate: (data: CompanyProfileType) => void;
}) {
  if (!company) return null;
  const { showToast } = useToast();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [culture, setCulture] = useState<string>(company.culture || '');
  const [error, setError] = useState<string>('');

  const addCulture = async () => {
    console.log('culture', culture);
    const field = { culture: culture };
    const result = updateCompanyFieldSchema.safeParse(field);
    if (!result.success) {
      console.log(result.error);
      const error = result.error.flatten().fieldErrors.culture?.[0];
      if (error) setError(error);
      return;
    }
    setError('');
    try {
      const data = await companyService.addCulture(culture);
      console.log(data);
      showToast({ msg: data.message, type: 'success' });
      setOpen(false);
      setCulture('');
      onUpdate(data.company);
    } catch (error: any) {
      showToast({
        msg: error?.respnse?.data.message || error.message,
        type: 'error',
      });
      setCulture('');
      setOpen(false);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Users size={22} className="text-blue-600 text-bold" />
          <h2 className="text-lg font-semibold mb-3">Company Culture</h2>
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

      {company?.culture ? (
        <p className="text-sm mt-3">{company.culture}</p>
      ) : (
        <p className="text-gray-500 text-sm italic mt-3">
          No company culture added yet.
        </p>
      )}
      <ModalLayout open={isOpen} onClose={() => setOpen(false)}>
        <CompanyProfileInputForm
          onCancel={() => {
            setOpen(false);
            setCulture('');
            setError('');
          }}
          title="Add  company culture"
          placeHolder="Add your company culture here..."
          error={error}
          onSubmit={addCulture}
          value={culture ? culture : company.culture}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setCulture(e.currentTarget.value)
          }
        />
      </ModalLayout>
    </div>
  );
}
