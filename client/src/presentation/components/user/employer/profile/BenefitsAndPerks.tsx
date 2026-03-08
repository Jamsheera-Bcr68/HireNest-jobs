import { useState } from 'react';
import { type CompanyProfileType } from '../../../../../types/dtos/profileTypes/userTypes';
import { Gift, SquarePenIcon } from 'lucide-react';
import ModalLayout from '../../../../Layoutes/ModalLayout';
import CompanyProfileInputForm from './CompanyProfileInputForm';
export function BenefitsPerks({
  company,
}: {
  company: CompanyProfileType | null;
}) {
  if (!company) return null;

  const perks = company?.benefits || [];
  const [benefits, setBenefits] = useState<string[] | []>([]);
  const [benefit, setBenefit] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const addBenefits = () => {};
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Gift size={24} className="text-red-600 text-bold" />
          <h2 className="text-lg font-semibold mb-3">Benefits & Perks</h2>
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
      {perks.length === 0 ? (
        <p className="text-gray-500 text-sm">No benefits added yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {perks.map((perk: string, index: number) => (
            <li
              key={index}
              className="bg-gray-50 px-3 py-2 rounded-md text-sm text-gray-700"
            >
              ✔ {perk}
            </li>
          ))}
        </ul>
      )}
      {/* <ModalLayout open={open} onClose={() => setOpen(false)}>
        <CompanyProfileInputForm on onCancel={()=>setOpen(false)} value={benefit} />
      </ModalLayout> */}
    </div>
  );
}
