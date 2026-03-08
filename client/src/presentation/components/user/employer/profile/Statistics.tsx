import { type CompanyProfileType } from '../../../../../types/dtos/profileTypes/userTypes';
export function CompanyStatistics({
  company,
}: {
  company: CompanyProfileType | null;
}) {
  if (!company) return null;

  const stats = [
    { label: 'Employees', value: company?.startedIn || 'N/A' },
    { label: 'Founded', value: company?.startedIn || 'N/A' },
    { label: 'Jobs Posted', value: company?.startedIn || '0' },
    { label: 'Offices', value: company?.startedIn || '1' },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Company Statistics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="bg-green-50 rounded-lg p-4 text-center"
          >
            <p className="text-xl font-semibold">{item.value}</p>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
