import { Section } from './Section';
import { StatCard } from '../../common/StateCards';
import type { ResumeType } from '../../../../types/dtos/profileTypes/ResumeType';
import type { ReactNode } from 'react';
import { Eye, NotepadText } from 'lucide-react';
import { adminService } from '../../../../services/apiServices/adminService';
import { useToast } from '../../../../shared/toast/useToast';

export type ContactDataType = {
  label: string;
  icon: ReactNode;
  value: string;
};

function RightSideBar({
  contactLinkes,
  resumes,
}: {
  contactLinkes: ContactDataType[];
  resumes: ResumeType[];
}) {
  console.log('from side bar', contactLinkes);
  const { showToast } = useToast();
  const checkResumeExist = async (url: string) => {
    try {
      console.log('resume url', url);

      const data = await adminService.checkExist(url);
      console.log(data);
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
  console.log('backend', baseUrl);
  console.log(resumes);

  return (
    <div className="space-y-6 mt-4">
      {/* Stats */}
      <Section title="Summary" icon="📊">
        <div className="grid  grid-cols-2 gap-3">
          <StatCard
            label="Total Applications"
            //candidate?.stats.totalApplications
            value={0}
            color="border-indigo-100 bg-indigo-50 text-indigo-700"
          />
          <StatCard
            label="Interviews Attended"
            //candidate.stats.totalInterviews
            value={0}
            color="border-violet-100 bg-violet-50 text-violet-700"
          />
          <StatCard
            label="Shortlisted"
            //candidate.stats.shortlisted
            value={0}
            color="border-emerald-100 bg-emerald-50 text-emerald-700"
          />

          <StatCard
            label="Pending"
            //   value={candidate.stats.pending}
            value={0}
            color="border-amber-100 bg-amber-50 text-amber-700"
          />
        </div>
      </Section>

      {/* Resumes */}

      <Section title="Resumes " icon="📄">
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
      <Section title="Contact Details" icon="📬">
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
