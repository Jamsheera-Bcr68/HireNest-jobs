import BasicDataPart from './BasicdataPart';
import { useProfile } from '../../../hooks/user/candidate/profile/useProfile';

import { useNavigate } from 'react-router-dom';
import Resume from './Resume';

import AboutMe from './AboutMe';
import Skills from './Skills';
import Experience from './Experience';
import Education from './Education';

const ProfilePart = () => {
  const navigate = useNavigate();
  console.log('from candidate profiel');

  const { user, setUser, allSkills } = useProfile();
  console.log('user', user);

  if (!user) return null;
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {user.isRequested &&
        user.company &&
        user.company.status === 'rejected' && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-red-700">
                  Company Verification Rejected
                </h3>

                <p className="mt-1 text-sm text-red-600">
                  Reason:{' '}
                  {user.company.reason || 'No rejection reason provided.'}
                </p>
              </div>

              <button
                onClick={() =>
                {
                  console.log('from rejected company',user.company);
                  
                  navigate(
                    `/company/register?companyId=${user.company?.id}&reapply=true`
                  )
                }
                }
                className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
              >
                Reapply
              </button>
            </div>
          </div>
        )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[calc(100vh-4rem)]">
        {/* Profile Card */}
        <div className="h-fit lg:sticky lg:top-6">
          <BasicDataPart
            user={user}
            onUserUpdate={(updatedUser) => setUser(updatedUser)}
          />
        </div>

        {/* Content */}
        <div className="lg:col-span-2 lg:overflow-y-auto space-y-6 pr-2">
          <AboutMe user={user} onUserUpdate={setUser} />
          <Skills user={user} skills={allSkills} onUserUpdate={setUser} />
          <Experience user={user} onUserUpdate={setUser} />
          <Education
            onUserUpdate={setUser}
            educations={user?.education || []}
          />
          {/* Resume Upload */}
          <Resume
            resumes={
              user.resumes.length
                ? user.resumes.sort(
                    (r1, r2) =>
                      new Date(r2.uploadedAt).getTime() -
                      new Date(r1.uploadedAt).getTime()
                  )
                : []
            }
            onUserUpdate={setUser}
          />
        </div>
      </div>
    </div>
  );
};
export default ProfilePart;
