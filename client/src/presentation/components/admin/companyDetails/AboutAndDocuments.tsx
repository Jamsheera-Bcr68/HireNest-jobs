import type { CompanyProfileType } from '../../../../types/dtos/profileTypes/userTypes';

function AboutAndDocuments({
  company,
}: {
  company: CompanyProfileType | null;
}) {
  if (!company) return null;
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* About */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          About Company
        </h2>

        <p className="text-sm text-slate-600 leading-relaxed">
          {company.about}
        </p>
      </div>

      {/* Company Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-5">
          Company Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Company Name</p>
            <p className="font-medium text-slate-700">{company.companyName}</p>
          </div>

          <div>
            <p className="text-slate-500">Industry</p>
            <p className="font-medium text-slate-700">{company.industry}</p>
          </div>

          <div>
            <p className="text-slate-500">Company Size</p>
            <p className="font-medium text-slate-700">
              {company.size} Employees
            </p>
          </div>

          <div>
            <p className="text-slate-500">Founded</p>
            <p className="font-medium text-slate-700">{company.startedIn} </p>
          </div>

          <div>
            <p className="text-slate-500">Website</p>
            <p className="font-medium text-indigo-600">{company.website} </p>
          </div>

          <div>
            <p className="text-slate-500">Headquarters</p>
            <p className="font-medium text-slate-700">
              {company.address.state},{company.address.country}{' '}
            </p>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-5">
          Company Documents
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between border p-4 rounded-lg">
            <div>
              <p className="font-medium text-slate-700">
                {company.document.type}
              </p>
              <p className="text-xs text-slate-500">
                Uploaded during registration
              </p>
            </div>

            <button
              onClick={() =>
                window.open(`${baseUrl}${company.document.file}`, '_blank')
              }
              className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-200"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutAndDocuments;
