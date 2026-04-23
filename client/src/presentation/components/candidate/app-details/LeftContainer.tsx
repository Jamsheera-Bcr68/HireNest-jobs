import { useState, type ReactNode, useEffect } from 'react';
import type { ApplicationDetailsDto } from '../../../../types/dtos/application.dto';
import { formatSalary } from '../../../../utils/salaryFormat';
import { Card, SectionTitle } from '../ReusableComponents';
import { useDispatch } from 'react-redux';
import ConfirmationModal from '../../../modals/ConfirmationModal';
import { updateUser } from '../../../../redux/authSlice';
import { useToast } from '../../../../shared/toast/useToast';
import { useSelector } from 'react-redux';
import {
  CheckCircle2,
  FileText,
  CalendarDays,
  DollarSign,
  Eye,
} from 'lucide-react';
import { applicationService } from '../../../../services/apiServices/application.service';
import type { StateType } from '../../../../constants/types/user';

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-gray-400 font-medium mb-0.5">{label}</p>
        <p className="text-sm text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}
function TimelineDot({ status }: { status: string }) {
  if (status === 'done')
    return (
      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 size={12} className="text-white" />
      </div>
    );
  if (status === 'active')
    return (
      <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-blue-200 flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>
    );
  return (
    <div className="w-5 h-5 rounded-full bg-gray-100 border-2 border-gray-200 flex-shrink-0" />
  );
}
type Props = {
  application: ApplicationDetailsDto | null;
  updateApplication: (application: ApplicationDetailsDto) => void;
};
function LeftContainer({ application, updateApplication }: Props) {
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector((state: StateType) => state.auth.user);
  if (!application) return null;

  const withDrawApplication = async () => {
    if (!application) return;
    try {
      const data = await applicationService.withdrawApplication(
        application.id,
        'withdrawn'
      );
      dispatch(
        updateUser({
          savedJobs: (user?.appliedJobs || []).filter(
            (id: string) => id !== application.id
          ),
        })
      );

      // const updatedTimeline = [
      //   ...application.timeline.filter(
      //     (t) => t.stage.toLowerCase() !== 'withdrawn'
      //   ),
      // ];
      // console.log('data',data);

      // const withdrawnStage = {
      //   stage: 'Withdrawn',
      //   date: new Date().toDateString(),
      //   status: 'active',
      // };
      // updatedTimeline.splice(1, 0, withdrawnStage);
      updateApplication({
        ...application,
        status: 'withdrawn',
        timeline: data.timeline,
      });
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

  console.log('applicaton', application);

  return (
    <div className="lg:col-span-2 flex flex-col gap-5">
      {/* Timeline */}
      <Card className="p-6">
        <SectionTitle>Application Progress</SectionTitle>
        <div className="flex flex-col">
          {application.timeline
            .filter(
              (item) =>
                application.status == 'withdrawn' ||
                item.stage.toLowerCase() !== 'withdrawn'
            )
            .map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <TimelineDot status={item.status} />
                  {i < application.timeline.length - 1 && (
                    <div
                      className={`w-0.5 flex-1 my-1 min-h-[28px] ${item.status === 'done' ? 'bg-emerald-200' : 'bg-gray-100'}`}
                    />
                  )}
                </div>
                <div className="pb-6 last:pb-0 pt-0.5">
                  <p
                    className={`text-sm font-medium ${item.status === 'pending' ? 'text-gray-300' : item.status === 'active' && application.status == 'withdrawn' ? 'text-red-700 font-semibold' : item.status === 'active' ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}
                  >
                    {item.stage}
                  </p>
                  {item.date && (
                    <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </Card>

      {/* Application Details */}
      <Card className="p-6">
        <SectionTitle>Application Details</SectionTitle>
        <InfoRow
          icon={<CalendarDays size={13} className="text-blue-500" />}
          label="Applied On"
          value={application.appliedAt}
        />

        <InfoRow
          icon={<DollarSign size={13} className="text-blue-500" />}
          label="Salary Expectation"
          value={formatSalary(
            application.job.min_salary,
            application.job.max_salary
          )}
        />
        <InfoRow
          icon={<CalendarDays size={13} className="text-blue-500" />}
          label="Job Posted"
          value={application.job.postedDate}
        />

        {/* Skills */}
        <div className="mt-5">
          <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
            Skills You Applied With
          </p>
          <div className="flex flex-wrap gap-2">
            {application.job.skills.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1 rounded-full bg-violet-50 text-violet-700 font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="mt-5">
          <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
            Resume
          </p>
          <div className="flex flex-col gap-2.5">
            {[application.resume].map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                  <FileText size={15} className="text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {doc.name}
                  </p>
                  <p className="text-xs text-gray-400">PDF</p>
                </div>
                <button
                  onClick={() =>
                    window.open(
                      `${import.meta.env.VITE_BACKEND_URL}${application.resume.url}`,
                      '_blank'
                    )
                  }
                  className="flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Eye size={11} /> View
                </button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex w-full items-center">
        {application.status === 'withdrawn' ? (
          <div className="ml-auto flex gap-3 items-center">
            <span className="px-4 py-2 text-sm font-medium text-red-500 bg-gray-100 rounded-lg">
              Application Withdrawn
            </span>

            {/* <button
        onClick={() => handleReapply(application.jobId)}
        className="py-2 px-4 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
      >
        Apply Again
      </button> */}
          </div>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="ml-auto py-3 px-6 rounded-xl text-sm font-medium border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          >
            Withdraw
          </button>
        )}
      </div>
      <ConfirmationModal
        item="Application"
        type="delete"
        action="Withdraw"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={withDrawApplication}
      />
    </div>
  );
}

export default LeftContainer;
