import CompanyRegistration from '../../../components/user/profile/company/CompanyRegistrationForm';
import { useSearchParams } from 'react-router-dom';

export default function CompanyRegistrationPage() {
const [searchParams]=useSearchParams()

const companyId = searchParams.get('companyId');
  const isReapply = searchParams.get('reapply') === 'true';
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <main className="pt-24 pb-10 px-4 sm:px-6 lg:px-8">
        <CompanyRegistration isReapply={isReapply} />
      </main>
    </div>
  );
}
