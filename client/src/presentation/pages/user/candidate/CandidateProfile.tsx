import ProfilePart from '../../../components/user/profile/profilePart';

const CandidateProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-[calc(100vh-64px)]">
        <ProfilePart />
      </div>
    </div>
  );
};

export default CandidateProfile;
