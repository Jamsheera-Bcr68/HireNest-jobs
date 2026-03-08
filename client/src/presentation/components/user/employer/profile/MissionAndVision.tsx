import { type CompanyProfileType } from '../../../../../types/dtos/profileTypes/userTypes';

import { TargetIcon, LightbulbIcon, SquarePenIcon } from 'lucide-react';
import ModalLayout from '../../../../Layoutes/ModalLayout';
import { useState } from 'react';
import CompanyProfileInputForm from './CompanyProfileInputForm';
import { companyService } from '../../../../../services/apiServices/companyService';
import { useToast } from '../../../../../shared/toast/useToast';
import { updateCompanyFieldSchema } from '../../../../../libraries/validations/company/companyUpdateFieldsValidation';

export function MissionVision({
  company,
  onUpdate,
}: {
  company: CompanyProfileType | null;
  onUpdate: (company: CompanyProfileType) => void;
}) {
  if (!company) return null;
  const { showToast } = useToast();
  const [mission, setMission] = useState<string>(company.mission || '');
  const [vision, setVision] = useState<string>(company.vision || '');
  const [misOpen, setMisOpen] = useState<boolean>(false);
  const [visOpen, setVisOpen] = useState<boolean>(false);

  const [error, setError] = useState<string>('');
  const addVision = async () => {
    console.log('vision is ', vision);
    const field = { vision: vision };
    const result = updateCompanyFieldSchema.safeParse(field);
    if (!result.success) {
      console.log(result.error);
      const error = result.error.flatten().fieldErrors.vision?.[0];
      if (error) setError(error);
      return;
    }
    setError('');
    try {
      const data = await companyService.addVision(vision);
      console.log(data);
      showToast({ msg: data.message, type: 'success' });
      setVisOpen(false);
      setVision('');
      onUpdate(data.company);
    } catch (error: any) {
      showToast({
        msg: error?.respnse?.data.message || error.message,
        type: 'error',
      });
      setVision('');
      setVisOpen(false);
    }
  };
  const addMission = async () => {
    console.log('mission is ', mission);
    const result = updateCompanyFieldSchema.safeParse({ mission: mission });
    if (!result.success) {
      console.log(result.error);
      const error = result.error.flatten().fieldErrors.mission?.[0];
      if (error) setError(error);
      return;
    }
    setError('');
    try {
      const data = await companyService.addMission(mission);
      console.log(data);
      showToast({ msg: data.message, type: 'success' });
      setMisOpen(false);
      setMission('');
      onUpdate(data.company);
    } catch (error: any) {
      showToast({
        msg: error?.respnse?.data.message || error.message,
        type: 'error',
      });
      setMission('');
      setMisOpen(false);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <div className="space-y-5">
        {/* Mission */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <span className="text-red-600">
                <TargetIcon />
              </span>
              <h3 className="font-medium text-gray-700">Mission</h3>
            </div>
            <div>
              <button
                onClick={() => setMisOpen(true)}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                <SquarePenIcon size={18} />
              </button>
            </div>
          </div>

          {company?.mission ? (
            <p className=" text-sm  mt-3">{company.mission}</p>
          ) : (
            <p className="text-gray-500 text-sm italic mt-3">
              No mission added yet.
            </p>
          )}
        </div>

        <div>
          <div className="flex  items-center justify-between">
            <div className="flex gap-3 items-center">
              <span className="text-yellow-600">
                <LightbulbIcon />
              </span>
              <h3 className="font-medium text-gray-700">Vision</h3>
            </div>

            <button
              onClick={() => setVisOpen(true)}
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              <SquarePenIcon size={18} />
            </button>
          </div>
          {company?.vision.trim() ? (
            <p className="text-sm mt-3">{company.vision}</p>
          ) : (
            <p className="text-gray-500 text-sm italic mt-3">
              No Vision added yet.
            </p>
          )}
        </div>
      </div>
      <ModalLayout open={visOpen} onClose={() => setVisOpen(false)}>
        <CompanyProfileInputForm
          onCancel={() => {
            setVisOpen(false);
            setVision('');
            setError('');
          }}
          onSubmit={addVision}
          value={vision ? vision : company.vision}
          title="Add vision"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setVision(e.currentTarget.value)
          }
          placeHolder="Add company Vision..."
          error={error}
        />
      </ModalLayout>
      <ModalLayout open={misOpen} onClose={() => setMisOpen(false)}>
        <CompanyProfileInputForm
          onCancel={() => {
            setMisOpen(false);
            setMission('');
            setError('');
          }}
          onSubmit={addMission}
          value={mission ? mission : company.mission}
          title="Add Mission"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMission(e.currentTarget.value)
          }
          placeHolder="Add company Mission... "
          error={error}
        />
      </ModalLayout>
    </div>
  );
}
