import { type CompanyProfileType } from '../../../../../types/dtos/profile-types/user.types';


export function CompanyStatistics({
  company,stats
}: {
  company: CompanyProfileType | null,stats:{label:string,value?:number}[]
}) {
  if (!company) return null;

  console.log('');
  

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Company Statistics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="bg-fuchsia-50 rounded-lg p-4 text-center hover:-transition-y-1"
          >
            <p className="text-xl text-fuchsia-800  font-semibold">{item.value}</p>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
