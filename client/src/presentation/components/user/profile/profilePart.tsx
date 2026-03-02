import BasicDataPart from './BasicdataPart';
import { useProfile } from '../../../hooks/user/candidate/profile/useProfile';
import { useToast } from '../../../../shared/toast/useToast';
import type { UserProfileType } from '../../../../types/dtos/profileTypes/userTypes';
import Resume from './Resume';

import AboutMe from './AboutMe';
import Skills from './Skills';
import Experience from './Experience';
import Education from './Education';

const ProfilePart = () => {
  console.log('from candidate profiel');
  const { showToast } = useToast();
  const { user, setUser, allSkills } = useProfile(showToast);
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
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
          <Resume resumes={user?.resumes || []} onUserUpdate={setUser} />
        </div>
      </div>
    </div>
  );

  //         {/* Certifications
  //         <div className="bg-white rounded-lg shadow-md p-6">
  //           <div className="flex justify-between items-center mb-4">
  //             <h3 className="text-xl font-bold text-gray-800">
  //               Certifications
  //             </h3>
  //             <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
  //               Add Certificate
  //             </button>
  //           </div>
  //           <div className="space-y-3">
  //             <div className="flex items-start space-x-3">
  //               <div className="bg-purple-100 rounded-lg p-2">
  //                 <svg
  //                   className="w-5 h-5 text-purple-600"
  //                   fill="none"
  //                   stroke="currentColor"
  //                   viewBox="0 0 24 24"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     strokeWidth="2"
  //                     d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
  //                   />
  //                 </svg>
  //               </div>
  //               <div className="flex-1">
  //                 <h4 className="font-semibold text-gray-800">
  //                   AWS Certified Solutions Architect
  //                 </h4>
  //                 <p className="text-gray-600 text-sm">Amazon Web Services</p>
  //                 <p className="text-gray-500 text-sm">
  //                   Issued: Jan 2023 • Expires: Jan 2026
  //                 </p>
  //               </div>
  //             </div>

  //             <div className="flex items-start space-x-3">
  //               <div className="bg-purple-100 rounded-lg p-2">
  //                 <svg
  //                   className="w-5 h-5 text-purple-600"
  //                   fill="none"
  //                   stroke="currentColor"
  //                   viewBox="0 0 24 24"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     strokeWidth="2"
  //                     d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
  //                   />
  //                 </svg>
  //               </div>
  //               <div className="flex-1">
  //                 <h4 className="font-semibold text-gray-800">
  //                   Meta React Developer Professional
  //                 </h4>
  //                 <p className="text-gray-600 text-sm">Meta (Facebook)</p>
  //                 <p className="text-gray-500 text-sm">Issued: Sep 2022</p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //
  //       </div>
  //     </div>
  //   </div>
  // );
};
export default ProfilePart;
