import { useTheme } from '../../../../contexts/ThemeContext';
import ProfilePart from '../../../components/user/profile/profilePart';

const CandidateProfile = () => {
  const {t}=useTheme()
 return (
  <div className={`min-h-screen ${t.pageBg} ${t.pageText}`}>
    <div className="flex min-h-[calc(100vh-64px)]">
      <ProfilePart />
    </div>
  </div>
);
};

export default CandidateProfile;
