import { Bookmark, MapPinIcon, Check, CheckIcon } from 'lucide-react';

import { jobService } from '../../../../services/apiServices/jobService';
import { useToast } from '../../../../shared/toast/useToast';
import { useSelector } from 'react-redux';
import type { StateType } from '../../../../constants/types/user';
import { formatSalary } from '../../../../utils/salaryFormat';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../../redux/authSlice';
import type { JobDetailsDto } from '../../../../types/dtos/jobDto';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function JobData({ job }: { job: JobDetailsDto | null }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const user = useSelector((state: StateType) => state.auth.user);

  if (!job) return null;
  const saveJobHandle = async () => {
    if (!user) {
      showToast({
        msg: 'Please login to save Job',
        type: 'error',
      });
      return;
    }
    if (user.role !== 'candidate') {
      showToast({
        msg: 'You are not allowed to Save job',
        type: 'error',
      });
      return;
    }
    if (!job) return null;
    try {
      const data = await jobService.saveJob(job.id);
      console.log('after saving', data);
      dispatch(
        updateUser({
          savedJobs: data.savedJobs || [...user.savedJobs, job.id],
        })
      );

      showToast({
        msg: data.message,
        type: 'success',
      });
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
    }
  };

  const unSaveJobHandle = async () => {
    console.log('from unsave fun');

    if (!user) {
      showToast({
        msg: 'Please login to save Job',
        type: 'error',
      });
      return;
    }
    try {
      const data = await jobService.unsaveJob(job.id);
      console.log('after unsaving', data);
      dispatch(
        updateUser({
          savedJobs: (user?.savedJobs || []).filter(
            (jobId: string) => job.id !== jobId
          ),
        })
      );
      showToast({
        msg: data.message,
        type: 'success',
      });
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
    }
  };

  return (
    <div>
      <div className=" <div className=" w-full>
        <div
          className="sticky top-24 bg-white rounded-2xl  "
          style={{
            border: '1.5px solid #e8edf5',
            maxHeight: 'calc(100vh - 120px)',
          }}
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-md">
                  <img
                    className="rounded-2xl"
                    src={`${baseUrl}${job.companyLogo}`}
                    alt=""
                  />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    {job.title}
                  </h2>
                  <p className="text-slate-500 font-semibold">
                    {job.companyName}
                  </p>
                </div>
              </div>
              {user?.savedJobs?.includes(job.id) ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    unSaveJobHandle();
                  }}
                  className="text-gray-300 hover:bg-gray-200 p-2 rounded-full hover:text-red-400 transition-colors text-lg leading-none mt-0.5"
                >
                  <Bookmark size={18} className="text-red-700" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    saveJobHandle();
                  }}
                  className="text-gray-300 hover:bg-gray-200 p-2 rounded-full hover:text-red-400 transition-colors text-lg leading-none mt-0.5"
                >
                  <Bookmark size={18} className="text-gray-400" />
                </button>
              )}
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                {
                  icon: <MapPinIcon size={16} className="text-red-400" />,
                  text: `${job.location.place ?? ''},${job.location.state},${job.location.country}`,
                },
                { icon: '💼', text: job.jobType },
                { icon: '⭐', text: job.mode },
                { icon: '🏢', text: job.industry },
              ].map((m) => (
                <span
                  key={m.text}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 px-3 py-1.5 rounded-xl"
                  style={{
                    background: '#f8fafc',
                    border: '1.5px solid #e8edf5',
                  }}
                >
                  {m.icon} {m.text}
                </span>
              ))}
            </div>

            <div className="flex mt-5 justify-center">
              <button
                disabled={user?.appliedJobs?.includes(job.id)}
                className={`px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors ${
                  user?.appliedJobs?.includes(job.id)
                    ? ' cursor-not-allowed'
                    : ''
                }`}
              >
                {user?.appliedJobs?.includes(job.id) ? (
                  <span className="inline-flex items-center gap-1">
                    <Check size={14} className="text-white" />
                    Applied
                  </span>
                ) : (
                  'Apply Now'
                )}
              </button>
            </div>

            <div className="flex items-center ">
              {/* <button
                  className="apply-btn flex-1 py-3 rounded-xl text-sm font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
                  }}
                >
                  Apply Now
                </button> */}

              {/* <button
                  className="px-5 py-3 rounded-xl text-sm font-bold text-indigo-600 transition-all hover:bg-indigo-50"
                  style={{ border: '1.5px solid #c7d2fe' }}
                >
                  Easy Apply
                </button> */}
            </div>
          </div>

          {/* Salary + stats row */}
          <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
            {[
              {
                label: 'Salary',
                value: formatSalary(job.min_salary, job.max_salary),
              },
              { label: 'Applicants', value: `${job.totalApplicants}+` },
              {
                label: 'Posted',
                value: new Date(job.createdAt).toLocaleDateString(),
              },
            ].map((s) => (
              <div key={s.label} className="p-4 text-center">
                <div className="text-sm font-extrabold text-indigo-600">
                  {s.value}
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                About the Role
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed break-all">
                {job.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase break-all text-slate-400 mb-3">
                Responsibilities
              </h4>
              <ul className="space-y-2">
                {job.responsibilities.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-slate-600"
                  >
                    <span
                      className="mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white text-xs"
                      style={{ background: '#4f46e5' }}
                    >
                      <CheckIcon />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs font-semibold text-slate-600 px-3 py-1.5 rounded-xl"
                    style={{
                      background: '#f1f5f9',
                      border: '1.5px solid #e2e8f0',
                    }}
                  >
                    {skill.skillName}
                  </span>
                ))}
              </div>
            </div>
            {job.benefits.length > 0 && (
              <div>
                <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                  Benefits
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {job.benefits.map((b) => (
                    <div
                      key={b}
                      className="text-xs font-semibold text-slate-600 px-3 py-2 rounded-xl flex items-center gap-1.5"
                      style={{
                        background: '#f8fafc',
                        border: '1.5px solid #e8edf5',
                      }}
                    >
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Company card */}
            <div
              className="rounded-2xl p-4"
              style={{ background: '#f8fafc', border: '1.5px solid #e8edf5' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold text-white">
                  <img
                    className="rounded-2xl"
                    src={`${baseUrl}${job.companyLogo}`}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {job.companyName}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    {job.industry} · {job.companySize} employees
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {job.aboutCompany}
              </p>
              <button className="mt-3 text-xs font-bold text-indigo-500 hover:text-indigo-700 transition-colors">
                View company profile →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobData;
