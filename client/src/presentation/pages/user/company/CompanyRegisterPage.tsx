import CompanyRegistration from '../../../components/user/profile/company/CompanyRegistrationForm';
import Header from '../../../components/common/Header';

export default function CompanyRegistrationPage() {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Header />
      <main className="pt-24 pb-10 px-4 sm:px-6 lg:px-8">
        <CompanyRegistration />
      </main>
    </div>
  );
}
