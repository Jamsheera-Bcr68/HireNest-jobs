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
  className="
    group
    relative
    overflow-hidden
    rounded-xl
    border border-fuchsia-100
    bg-gradient-to-br from-fuchsia-50 to-white
    p-4
    text-center

    shadow-sm
    transition-all duration-300 ease-out

    hover:-translate-y-2
    hover:scale-[1.02]
    hover:rotate-[0.5deg]
    hover:border-fuchsia-200
    hover:shadow-[0_12px_25px_rgba(192,38,211,0.18)]

    active:translate-y-0
    active:scale-[0.98]
  "
>
  {/* subtle 3D glow */}
  <div
    className="
      absolute -right-6 -top-6
      h-16 w-16
      rounded-full
      bg-fuchsia-200/40
      blur-2xl
      transition-all duration-300
      group-hover:scale-150
      group-hover:bg-fuchsia-300/50
    "
  />

  <div className="relative z-10">
    <p className="text-xl font-semibold text-fuchsia-800 transition-all duration-300 group-hover:scale-110">
      {item.value}
    </p>

    <p className="mt-1 text-sm text-gray-500 transition-colors duration-300 group-hover:text-fuchsia-700">
      {item.label}
    </p>
  </div>
</div>
        ))}
      </div>
    </div>
  );
}
