import Header from '../../../components/common/Header';
import SideBar from '../../../components/common/SideBar';

import ProfilePart from '../../../components/user/profile/profilePart';

const CandidateProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* first division */}
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* <SideBar /> */}
        <ProfilePart />
      </div>
    </div>
  );
};

export default CandidateProfile;
