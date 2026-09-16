import { CheckList, CompanyLogo, JobOverviewCard, Section } from './Common';
import { useTheme } from '../../../../contexts/ThemeContext';
import type { JobDetailsDto } from '../../../../types/dtos/job.dto';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Check,
  Gift,
  GraduationCap,
  LanguagesIcon,
  ToolCaseIcon,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import ReportJobModal from '../jobListing/JobReportForm';
import { useState } from 'react';
import type {
  ErrorType,
  ReportFormType,
} from '../jobListing/ListingContainter';
import { reportFormSchema } from '../../../../libraries/validations/company/job-form.validation';
import { jobService } from '../../../../services/api-services/jobService';

export function Main({
  job,
  onReportsubmit,
  handleChange,
  reportError,
  reportForm,
}: {
  reportError: ErrorType | null;
  job: JobDetailsDto;
  onReportsubmit: () => void;
  handleChange: (data: Partial<ReportFormType>) => void;
  reportForm: ReportFormType;
}) {
  const { t, mode } = useTheme();
  const navigate = useNavigate();
  const isDark = mode === 'dark';
  const user = useSelector((state: RootState) => state.auth.user);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  console.log('from main,onreportsubmit', onReportsubmit);

  const handleReportFormChange = (data: Partial<ReportFormType>) => {
    console.log('from handle form change', data);

    // setReportForm((prev) => ({ ...prev, ...data }));
  };

  const handleReportClick = () => {
    console.log('from handle report click');
    setModalOpen(true);
  };
  return (
    <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-8 lg:items-start">
      <div className="space-y-6 lg:space-y-8">
        <Section title="About the Job">
          <p
            className={`text-[14px] leading-relaxed whitespace-pre-line break-words ${t.subheading}`}
          >
            {job?.description ?? ''}
          </p>
        </Section>

        {job?.responsibilities?.length > 0 && (
          <Section title="Responsibilities">
            <CheckList items={job.responsibilities} />
          </Section>
        )}

        {job?.requirements?.length > 0 && (
          <Section title="Requirements">
            <CheckList items={job?.requirements} />
          </Section>
        )}

        <Section icon={ToolCaseIcon} title="Skills">
          <div className="flex flex-wrap gap-2">
            {job?.skills.map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className={`text-[12px] px-3 py-1.5 rounded-full font-medium lg:transition-transform lg:hover:scale-105 ${t.skillChipBg} ${t.skillChipText} border ${t.skillChipBorder}`}
              >
                {skill.skillName}
              </span>
            ))}
          </div>
        </Section>

        {/* Education + Languages: stacked on mobile, 2-col from sm up */}
        {(job?.education || job?.languages?.length > 0) && (
          <div className="grid sm:grid-cols-2 gap-6">
            {job?.education && (
              <Section title="Education" icon={GraduationCap}>
                <p className={`text-[14px] ${t.subheading}`}>{job.education}</p>
              </Section>
            )}
            {job.languages?.length > 0 && (
              <Section title="Languages" icon={LanguagesIcon}>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`text-[12px] px-3 py-1 rounded-full ${t.filterBg} border ${t.surfaceBorder} ${t.subheading}`}
                  >
                    {job?.languages}
                  </span>
                  {/* {job.languages.map((lang, i) => (
                    <span
                      key={i}
                      className={`text-[12px] px-3 py-1 rounded-full ${t.filterBg} border ${t.surfaceBorder} ${t.subheading}`}
                    >
                      {lang}
                    </span>
                  ))} */}
                </div>
              </Section>
            )}
          </div>
        )}

        {job?.benefits?.length > 0 && (
          <Section title="Benefits & Perks" icon={Gift}>
            {/* 1 col mobile, 2 col tablet, 3 col desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {job?.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 ${t.filterBg} border ${t.surfaceBorder} rounded-xl px-3 py-2.5 text-[13px] ${t.subheading}
                        lg:transition-all lg:hover:-translate-y-0.5 lg:hover:shadow-[0_6px_14px_-4px_rgba(147,51,234,0.25)]`}
                >
                  <Check size={14} className="text-fuchsia-500 flex-shrink-0" />
                  <span className="break-words">{benefit}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Company section — single column mobile, logo+info side by side from sm up */}
        <Section title="About Company" icon={Building2}>
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl ${t.metaBadgeBg} border ${t.metaBadgeBorder} flex items-center justify-center overflow-hidden flex-shrink-0 mx-auto sm:mx-0`}
            >
              <CompanyLogo name={job?.companyName} src={job?.companyLogo} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3
                className={`text-[15px] font-semibold mb-2 break-words ${t.cardTitle}`}
              >
                {job?.companyName}
              </h3>
              <div
                className={`flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-[13px] mb-3 ${t.subheading}`}
              >
                {job?.industry && (
                  <div>
                    <span className="block text-[11px] opacity-70">
                      Industry
                    </span>
                    {job?.industry}
                  </div>
                )}
                {job && job.companySize && (
                  <div>
                    <span className="block text-[11px] opacity-70">
                      Company Size
                    </span>
                    {job.companySize}
                  </div>
                )}
                {job?.companyEmployeeCount && (
                  <div>
                    <span className="block text-[11px] opacity-70">
                      Employees
                    </span>
                    {job.companyEmployeeCount}
                  </div>
                )}
              </div>
              {job?.aboutCompany && (
                <p
                  className={`text-[14px] leading-relaxed break-words ${t.subheading}`}
                >
                  {job.aboutCompany}
                </p>
              )}
              <div className="flex justify-end">
                <button
                  onClick={() =>
                    navigate(`/candidate/company/${job.companyId}`)
                  }
                  className="bg-fuchsia-800 hover:bg-fuchsia-600 text-white rounded-xl text-xs py-2 px-3"
                >
                  View Company
                </button>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Sidebar: only lg+, sticky and independently scrollable, glassy */}
      <div className=" lg:block sticky top-16 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
        <JobOverviewCard job={job} glass isDark={isDark} />
        <Section title="Report This Job?">
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            If you believe this job posting contains misleading information,
            inappropriate content, or violates our job posting guidelines, you
            can report it to our team for review.
          </p>

          <div className="flex justify-end">
            {job.reportedBy?.includes(user.id) ? (
              <button
                disabled
                className="text-xs font-semibold bg-gray-200 rounded-xl px-3 py-2 text-red-500 cursor-not-allowed"
              >
                You Reported this Job
              </button>
            ) : (
              <button
                onClick={handleReportClick}
                className="text-xs font-semibold bg-gray-200 rounded-xl px-3 py-2 text-red-500 hover:text-red-700 transition-colors"
              >
                Report this job
              </button>
            )}
          </div>
        </Section>
      </div>
      {modalOpen && (
        <ReportJobModal
          handleChange={handleChange}
          formData={reportForm}
          error={reportError}
          onSubmit={onReportsubmit}
          onClose={() => {
            handleChange({ jobId: '', reason: '', info: '' });
            setModalOpen(false);
          }}
          open={modalOpen}
        />
      )}
    </div>
  );
}

export default Main;
