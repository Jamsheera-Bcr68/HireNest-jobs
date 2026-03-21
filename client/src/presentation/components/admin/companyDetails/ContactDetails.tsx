import type { CompanyProfileType } from '../../../../types/dtos/profileTypes/userTypes';

function ContactDetails({ company }: { company: CompanyProfileType | null }) {
  if (!company) return null;
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Contact Information
      </h2>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-slate-500">Email</p>
          <p className="font-medium text-slate-700">{company.email} </p>
        </div>

        <div>
          <p className="text-slate-500">Phone</p>
          <p className="font-medium text-slate-700">{company.phone} </p>
        </div>

        <div>
          <p className="text-slate-500">Address</p>
          <p className="font-medium text-slate-700">
            {company.address.state},{company.address.country}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
