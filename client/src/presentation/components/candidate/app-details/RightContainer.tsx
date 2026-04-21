import { useState } from 'react';
import type { ApplicationDetailsDto } from '../../../../types/dtos/application.dto';
import { Card, SectionTitle } from '../ReusableComponents';
import { useToast } from '../../../../shared/toast/useToast';
import ModalFormat from '../../common/ModalFormat';
import CompanyData from './CompanyData';
import {
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Building2,
  Globe,
  AlertCircle,
} from 'lucide-react';
import { jobService } from '../../../../services/apiServices/jobService';
import { type JobDetailsDto } from '../../../../types/dtos/jobDto';
import JobData from './JobData';
import { companyService } from '../../../../services/apiServices/companyService';
import { type CompanyDataDto } from '../../../../types/dtos/company.dto';

type Props = {
  application: ApplicationDetailsDto | null;
};
const baseUrl = import.meta.env.VITE_BACKEND_URL;
function RightContainer({ application }: Props) {
  const { showToast } = useToast();
  const [showJobModal, setShowJobModal] = useState<boolean>(false);
  const [showCompanyModal, setShowCompanyModal] = useState<boolean>(false);
  const [job, setJob] = useState<JobDetailsDto | null>(null);
  const [company, setCompany] = useState<CompanyDataDto | null>(null);
  if (!application) return null;

  const handleViewJob = async () => {
    setShowJobModal(true);
    const getJob = async () => {
      try {
        const data = await jobService.getDetails(application.job.id);

        setJob(data.jobDetails);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    };
    getJob();
  };

  const handleViewCompany = async () => {
    setShowCompanyModal(true);
    const getCompany = async () => {
      try {
        const data = await companyService.getCompanyDetails(
          application.company.id
        );

        setCompany(data.companyData);
        setShowCompanyModal(true);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    };
    getCompany();
  };
  return (
    <div className="flex flex-col gap-5">
      {/* Candidate Profile */}
      <Card className="p-5">
        <SectionTitle>Your Profile</SectionTitle>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center text-violet-700 font-bold text-base flex-shrink-0">
            {application.profileImg ? (
              <img
                className="w-11 h-11 rounded-full"
                src={`${baseUrl}${application.profileImg}`}
                alt={`${application.candidateName.charAt(0).toUpperCase()}`}
              />
            ) : (
              <>{application.candidateName.charAt(0).toUpperCase()}</>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {application.candidateName}
            </p>
            <p className="text-xs text-gray-400">{application.role}</p>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-3 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={13} className="text-blue-500" />
            {application.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={13} className="text-green-500" />
            {application.phone}
          </div>
        </div>
      </Card>

      {/* Job Summary */}
      <Card className="p-5">
        <SectionTitle>Job Summary</SectionTitle>
        <div className="flex flex-col divide-y divide-gray-100">
          {[
            {
              label: 'Type',
              value:
                application.job.jobType == 'fullTime'
                  ? 'Full Time'
                  : 'Part Time',
            },
            { label: 'Mode', value: application.job.mode },
            {
              label: 'Experience',
              value: application.job.experience + ' years',
            },
            { label: 'Location', value: application.job.location },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between items-start py-2.5"
            >
              <span className="text-xs text-gray-400">{label}</span>
              <span className="text-xs text-gray-800 font-medium text-right max-w-[55%]">
                {value}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={handleViewJob}
          className="w-full mt-4 py-2.5 rounded-xl text-xs font-medium border border-gray-200 bg-gray-50 text-gray-600 flex items-center justify-center gap-1.5 hover:bg-gray-100 transition-colors"
        >
          <ExternalLink size={12} /> View Job Posting
        </button>
      </Card>

      {/* Company */}
      <Card className="p-5">
        <SectionTitle>Company</SectionTitle>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            <img
              className="w-10 h-10 rounded-xl"
              src={`${baseUrl}${application.company.logoUrl}`}
              alt=""
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {application.company.companyName}
            </p>
            <p className="text-xs text-gray-400">
              {application.company.industry}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={12} className="text-gray-300" />{' '}
            {application.company.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Building2 size={12} className="text-gray-300" />{' '}
            {application.company.size}
          </div>
        </div>
        <button
          onClick={handleViewCompany}
          className="w-full mt-4 py-2.5 rounded-xl text-xs font-medium border border-gray-200 bg-gray-50 text-gray-600 flex items-center justify-center gap-1.5 hover:bg-gray-100 transition-colors"
        >
          <Globe size={12} /> View Company Profile
        </button>
      </Card>

      {/* Warning */}
      <div className="flex gap-3 items-start bg-amber-50 border border-amber-100 rounded-2xl p-4">
        <AlertCircle
          size={14}
          className="text-amber-500 flex-shrink-0 mt-0.5"
        />
        <p className="text-xs text-amber-700 leading-relaxed">
          Withdrawing your application is permanent. You'll need to re-apply if
          you change your mind.
        </p>
      </div>
      <ModalFormat
        title=""
        isOpen={showJobModal}
        onClose={() => setShowJobModal(false)}
      >
        <JobData job={job} />
      </ModalFormat>
      <ModalFormat
        title=""
        isOpen={showCompanyModal}
        onClose={() => setShowCompanyModal(false)}
      >
        <CompanyData company={company} />
      </ModalFormat>
    </div>
  );
}

export default RightContainer;
