import React, { useState } from 'react';
import LogoImgViewModal from '../../../../modals/LogoPreviewModal';
import EditCompanyProfileModal from '../../../../modals/EditCompanyProfile';
import type { CompanyProfileType } from '../../../../../types/dtos/profileTypes/userTypes';
import { Twitter, Globe, Linkedin } from 'lucide-react';
import ChangePasswordModal from '../../../../modals/ChangePasswordModal';
// const company = {
//   _id: 'cmp_001',
//   name: 'TechNova Solutions Pvt Ltd',
//   logo: '',

//   industry: 'Software Development',
//   tagline: 'Building Scalable Digital Products',

//   location: {
//     city: 'Kochi',
//     state: 'Kerala',
//     country: 'India',
//   },

//   companySize: '51-200 employees',
//   foundedYear: 2018,

//   website: 'https://technova.com',

//   status: 'approved',

//   totalJobs: 8,
//   totalHires: 34,

//   completionPercentage: 75,
// };
type Props = {
  company: CompanyProfileType | null;
  onUpdate: (updated: CompanyProfileType) => void;
};
function BasicPart({ company, onUpdate }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [openPwd, setOpenPwd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  return (
    <div className="lg:col-span-1 z-1">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center">
          <div
            // onClick={handleLogoClick}
            className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden"
          >
            <img
              onClick={() => setOpen(true)}
              onError={(e) => {
                e.currentTarget.src = '/companyLogo.png';
              }}
              className="rounded-full object-cover w-full h-full"
              src={
                company?.logoUrl
                  ? `${BASE_URL}${company.logoUrl}`
                  : '/profileImage.jpg'
              }
              alt="company-logo"
            />
          </div>
        </div>
        {/* Basic Info */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
            {company?.companyName || ''}
          </h2>
          <h3 className="text-gray-500 italic">{company?.tagline} </h3>
          {company?.isVerified && (
            <span className="text-green-500 text-sm">✔ Verified</span>
          )}
          <p className="text-gray-600 mt-1">{company?.industry || ''} </p>

          <p className="text-gray-500 text-sm mt-2">
            {company?.address?.state},{company?.address?.country}
          </p>

          <p className="text-gray-400 text-sm mt-1">
            {company?.size} • Founded {company?.startedIn}
          </p>
        </div>
        {/* Quick Stats */}
        {/* <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {company?.totalJobs || 0}
            </p>
            <p className="text-gray-600 text-sm">Jobs Posted</p>
          </div>

          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-600">
              {company?.totalHires || 0}
            </p>
            <p className="text-gray-600 text-sm">Total Hires</p>
          </div>
        </div> */}

        {/* Website */}

        {company?.website && (
          <div className="mt-6 text-center">
            <a
              href={company.website}
              target="_blank"
              className="text-blue-600 text-sm hover:underline"
            >
              Visit Website
            </a>
          </div>
        )}
        <div className="mt-6 space-y-3">
          <div className="flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-700 text-sm">{company?.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-gray-700 text-sm">{company?.phone}</span>
          </div>

          <div className="grid grid-cols-6 mt-4 gap-4">
            {company?.socialMediaLinks?.linkedIn && (
              <div>
                <a href={company.socialMediaLinks.linkedIn}>
                  <svg
                    className="w-5 h-5 text-[#0A66C2]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            )}
            {company?.socialMediaLinks?.gitHub && (
              <div>
                <a href={company.socialMediaLinks.gitHub}>
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577
    0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
    -.546-1.387-1.333-1.757-1.333-1.757
    -1.089-.745.084-.729.084-.729
    1.205.084 1.84 1.236 1.84 1.236
    1.07 1.835 2.809 1.305 3.495.998
    .108-.776.418-1.305.762-1.605
    -2.665-.305-5.467-1.334-5.467-5.93
    0-1.31.469-2.38 1.235-3.22
    -.123-.303-.535-1.523.117-3.176
    0 0 1.008-.322 3.3 1.23
    .957-.266 1.983-.399 3.003-.404
    1.02.005 2.047.138 3.006.404
    2.29-1.552 3.296-1.23 3.296-1.23
    .653 1.653.241 2.873.118 3.176
    .77.84 1.233 1.91 1.233 3.22
    0 4.61-2.807 5.624-5.48 5.92
    .43.37.823 1.102.823 2.222
    0 1.606-.015 2.896-.015 3.286
    0 .32.216.694.825.576
    C20.565 21.796 24 17.298 24 12
    24 5.373 18.627 0 12 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            )}
            {company?.socialMediaLinks?.twitter && (
              <div>
                <a href={company.socialMediaLinks.twitter}>
                  <Twitter size={18} className="text-blue-500" />
                </a>
              </div>
            )}
            {company?.socialMediaLinks?.whatsapp && (
              <div>
                <a href={company.socialMediaLinks.whatsapp}>
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="green"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.52 3.48A11.82 11.82 0 0012 0C5.372 0 0 5.373 0 12c0 2.116.553 4.182 1.6 6.01L0 24l6.207-1.63A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12 0-3.204-1.247-6.216-3.48-8.52zM12 21.82c-1.805 0-3.57-.488-5.102-1.412l-.366-.218-3.682.967.984-3.588-.239-.37A9.75 9.75 0 012.18 12c0-5.425 4.395-9.82 9.82-9.82 2.622 0 5.086 1.022 6.94 2.88A9.748 9.748 0 0121.82 12c0 5.425-4.395 9.82-9.82 9.82zm5.388-7.388c-.294-.147-1.74-.86-2.01-.96-.27-.098-.468-.147-.665.147-.196.294-.763.96-.936 1.157-.173.196-.345.22-.64.073-.294-.147-1.242-.458-2.366-1.46-.874-.78-1.464-1.744-1.637-2.038-.173-.294-.018-.453.13-.6.132-.13.294-.345.44-.517.147-.173.196-.294.294-.49.098-.196.049-.368-.024-.517-.073-.147-.665-1.61-.91-2.205-.24-.577-.485-.498-.665-.508l-.566-.01c-.196 0-.517.073-.788.368-.27.294-1.035 1.01-1.035 2.462 0 1.452 1.06 2.856 1.207 3.053.147.196 2.086 3.19 5.053 4.472.706.304 1.256.486 1.685.622.708.225 1.353.193 1.863.117.568-.085 1.74-.71 1.985-1.396.245-.686.245-1.274.172-1.396-.073-.123-.27-.196-.566-.343z" />
                  </svg>
                </a>
              </div>
            )}
            {company?.socialMediaLinks?.youtube && (
              <div>
                <a href={company.socialMediaLinks.youtube}>
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="red"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.01 3.01 0 00-2.118-2.13C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.38.556a3.01 3.01 0 00-2.118 2.13A31.5 31.5 0 000 12a31.5 31.5 0 00.502 5.814 3.01 3.01 0 002.118 2.13C4.495 20.5 12 20.5 12 20.5s7.505 0 9.38-.556a3.01 3.01 0 002.118-2.13A31.5 31.5 0 0024 12a31.5 31.5 0 00-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
                  </svg>
                </a>
              </div>
            )}
            {company?.socialMediaLinks?.portfolio && (
              <div>
                <a href={company.socialMediaLinks.portfolio}>
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 010 20a15.3 15.3 0 010-20z" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
        {/* Edit Company Button */}
        <div className="flex gap-3">
          <button
            onClick={() => setOpenEdit(true)}
            className="w-full mt-6 bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Edit Profile
          </button>
          <button
            onClick={() => setOpenPwd(true)}
            className="w-full mt-6 bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Change password
          </button>
        </div>
      </div>
      <LogoImgViewModal
        onClose={() => setOpen(false)}
        onUpdate={onUpdate}
        profileImage={company?.logoUrl ? `${BASE_URL}${company?.logoUrl}` : ''}
        open={open}
      />
      <ChangePasswordModal open={openPwd} onClose={() => setOpenPwd(false)} />
      <EditCompanyProfileModal
        company={company}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onUpdate={onUpdate}
      />
    </div>
  );
}

export default BasicPart;
