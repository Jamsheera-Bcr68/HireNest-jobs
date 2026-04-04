import SectionTitle from './SectionTitle';
import { Check } from 'lucide-react';

type Props = {
  benefits: string[];
  tab: string;
};

function Benefits({ benefits, tab }: Props) {
  if (tab !== 'benefits') return null;

  return (
    <div>
      <SectionTitle>Benefits & perks</SectionTitle>

      {benefits.length === 0 ? (
        <p className="text-sm text-gray-400">Benefits not added yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/40 transition"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <Check
                  size={14}
                  strokeWidth={2.5}
                  className="text-emerald-500"
                />
              </div>

              <span className="text-sm font-medium text-gray-700">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Benefits;
