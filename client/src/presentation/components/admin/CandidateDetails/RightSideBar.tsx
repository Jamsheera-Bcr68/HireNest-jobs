import { Section } from './Section';
import { StatCard } from '../../common/StateCards';
import type { ResumeType } from '../../../../types/dtos/profile-types/resume.type';
import type { ReactNode } from 'react';
import {
  Eye,
  NotepadText,
  LayoutDashboard,
  FileUser,
  Contact2,
} from 'lucide-react';
import { adminService } from '../../../../services/api-services/adminService';
import { useToast } from '../../../../shared/toast/use-toast';
import type { UserProfileType } from '../../../../types/dtos/profile-types/user.types';

export type ContactDataType = {
  label: string;
  icon: ReactNode;
  value: string;
};

function RightSideBar({
  contactLinkes,
  resumes,
  isLoading,
  candidate,
}: {
  contactLinkes: ContactDataType[];
  resumes: ResumeType[];
  isLoading: boolean;
  candidate: UserProfileType;
}) {
  const { showToast } = useToast();
  const checkResumeExist = async (url: string) => {
    try {
      
      const data = await adminService.checkExist(url);

      if (data.isExist) {
        window.open(`${baseUrl}${url}`, '_blank');
      } else {
        showToast({
          msg: data.message,
          type: 'error',
        });
        return;
      }
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
    }
  };
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="space-y-6 mt-4">
      {/* Stats */}
      <Section title="Summary" icon={LayoutDashboard}>
        <div className="grid  grid-cols-2 gap-3">
          <StatCard
            isLoading={isLoading}
            key={candidate.applicationCount ?? 0}
            //candidate?.stats.totalApplications
            value={candidate.applicationCount ?? 0}
            label="Total Applications"
            color="border-indigo-100 bg-indigo-50 text-indigo-700"
          />
          <StatCard
            isLoading={isLoading}
            key={candidate.applicationCount ?? 0}
            label="Interviews Attended"
            //candidate.stats.totalInterviews
            value={candidate.interviewsCount ?? 0}
            color="border-violet-100 bg-violet-50 text-violet-700"
          />
          <StatCard
            isLoading={isLoading}
            key={candidate.shortListedCount ?? 0}
            label="Shortlisted"
            //candidate.stats.shortlisted
            value={candidate.shortListedCount ?? 0}
            color="border-emerald-100 bg-emerald-50 text-emerald-700"
          />

          <StatCard
            isLoading={isLoading}
            key={candidate.offeredCount ?? 0}
            label="Pending"
            //   value={candidate.stats.pending}
            value={candidate.offeredCount ?? 0}
            color="border-amber-100 bg-amber-50 text-amber-700"
          />
        </div>
      </Section>

      {/* Resumes */}

      <Section title="Resumes " icon={FileUser}>
        {resumes.length > 0 ? (
          <div className="space-y-2">
            {resumes.map((resume, ind) => (
              <button
                title="View"
                key={ind}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors"
              >
                <span>
                  <NotepadText className="text-blue-600" size={18} />
                </span>

                <span>{resume.name}</span>

                <span className="ml-auto">
                  <Eye
                    onClick={() => checkResumeExist(resume.url)}
                    size={18}
                    className="text-blue-600"
                  />
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="italic text-slate-400">Resumes are not added yet</p>
        )}
      </Section>

      {/* Contact Info */}
      <Section title="Contact Details" icon={Contact2}>
        {contactLinkes.length > 0 ? (
          <div className="space-y-3 text-sm">
            {contactLinkes.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-xs text-slate-400 font-medium"></p>

                  <a
                    href={
                      item.value.startsWith('http')
                        ? item.value
                        : `https://${item.value}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 cursor-pointer"
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="italic text-slate-400">
            Contact links are not added yet
          </p>
        )}
      </Section>
    </div>
  );
}

export default RightSideBar;
