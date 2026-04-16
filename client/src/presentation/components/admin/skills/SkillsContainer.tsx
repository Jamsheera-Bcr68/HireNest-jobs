import StatusCards from '../StatusCards';
import HeroSection from '../HeroSection';
import { type StatusCardType } from '../../../pages/admin/Companies';
import { skillService } from '../../../../services/apiServices/skillServices';
import { useEffect, useState } from 'react';
import { useToast } from '../../../../shared/toast/useToast';
import { type SkillType } from '../../../../types/dtos/skillTypes';
import { type ColumnType } from '../Candidates/ReusableTable';
import ReusableTable from '../Candidates/ReusableTable';
import { statusStyles } from '../../../pages/admin/Candidates';
import {
  Eye,
  Trash,
  ThumbsDownIcon,
  CheckCheck,
  SquarePenIcon,
} from 'lucide-react';
const tabs = ['All', 'Approved', 'Rejected', 'Removed', 'Pending'];

import { type SkillStatusType } from '../../../../types/dtos/skillTypes';
import Pagination from '../../common/Pagination';
import SkillModal from './SkillModal';
import ViewSkillModal from './ViewModal';
import ConfirmationModal from '../../../modals/ConfirmationModal';
import AddReasonModal from '../jobs/AddReasonModal';

export type SkillFilterType = {
  status?: SkillStatusType;
  createdBy?: 'admin' | 'company';
  search?: string;
};
const filterOptions = [
  {
    key: 'createdBy',
    label: 'Created By',
    options: ['admin', 'company'],
  },
];
const sortOption = {
  key: 'sortBy',
  label: 'Sort',
  options: ['Newest', 'Oldest', 'Count of Post', 'Count of Users'],
};
function SkillsContainer() {
  const { showToast } = useToast();
  const [stats, setStats] = useState<StatusCardType[]>([]);
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [filter, setFilter] = useState<SkillFilterType>({});
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false);
  const [showDeleteReasonModal, setShowDeleteReasonModal] =
    useState<boolean>(false);
  const [showRejectReasonModal, setShowRejectReasonModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [skillName, setSkillName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [skill, setSkill] = useState<SkillType | null>(null);

  const skillColumns = [
    {
      key: 'skillName',
      label: 'Skill',
      render: (s: SkillType) => (
        <div className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm inline-block">
          {s.skillName}
        </div>
      ),
    },
    {
      key: 'createdBy',
      label: 'Created By',
      render: (s: SkillType) => (
        <>
          {' '}
          <div
            className={`w-9 h-9 flex items-center justify-center font-bold text-xs flex-shrink-0`}
          >
            <span className="font-semibold text-slate-800">{s.createdBy}</span>
          </div>
        </>
      ),
    },
    {
      key: 'candidatesCount',
      label: 'Used Candidates',
      render: (s: SkillType) => (
        <>
          {' '}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-800">
              {s.usedCandidateCount}
            </span>
          </div>
        </>
      ),
    },
    {
      key: 'usedCount',
      label: 'Used Posts',
      render: (s: SkillType) => (
        <>
          {' '}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-800">{s.usedCount}</span>
          </div>
        </>
      ),
    },

    {
      key: 'createdAt',
      label: 'Created At',
      render: (s: SkillType) => new Date(s.createdAt).toLocaleDateString(),
    },
    {
      key: 'reviewedAt',
      label: 'Reviewed At',
      render: (s: SkillType) =>
        s.reviewedAt
          ? new Date(s.reviewedAt).toLocaleDateString()
          : s.createdBy == 'admin'
            ? null
            : 'pending',
    },

    {
      key: 'status',
      label: 'Status',
      render: (s: SkillType) => (
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full  ${statusStyles[s.status!]}`}
        >
          {s.status}
        </span>
      ),
    },

    {
      key: 'actions',
      label: 'Actions',
      render: (s: SkillType) => (
        <div className="flex items-center justify-center gap-3 w-full">
          <button
            onClick={() => {
              setSkill(s);
              setShowViewModal(true);
            }}
            className="text-indigo-600 hover:text_indigo-800 "
            title="view"
          >
            <Eye size={18} />
          </button>
          {['approved', 'pending'].includes(s.status!) && (
            <button
              onClick={() => {
                setSkillName(s.skillName);
                setSkill(s);

                setShowEditModal(true);
                console.log('skill on edit click', skill);
              }}
              className={`font-bold text-red-700 hover:text-red-800`}
              title="Edit"
            >
              <SquarePenIcon size={16} className="text-amber-500" />
            </button>
          )}
          {s.status !== 'removed' && (
            <button
              onClick={() => {
                setSkill(s);
                setShowDeleteModal(true);
              }}
              className={`font-semibold text-red-700 hover:text-indigo-800`}
              title="Remove"
            >
              <Trash size={16} />
            </button>
          )}
          {s.status == 'pending' && (
            <button
              onClick={() => {
                setSkill(s);
                setShowApproveModal(true);
              }}
              className={`font-semibold text-green-700 hover:text-indigo-800 hover:bg-gray-200 rounded-full p-1.5`}
              title="Approve"
            >
              <CheckCheck size={16} />
            </button>
          )}
          {s.status == 'pending' && (
            <button
              onClick={() => {
                setSkill(s);
                setShowRejectModal(true);
              }}
              className={`font-semibold text-red-700 hover:text-red-800 hover:bg-gray-200 rounded-full p-1.5`}
              title="Reject"
            >
              <ThumbsDownIcon size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await skillService.getSkillStatus();
        //console.log('data after skill status', data);
        const statusData = data.statusData;
        const total: StatusCardType = {
          label: 'Total Skills',
          count: statusData.total || 0,
          icon: '🛠️',
        };
        const active: StatusCardType = {
          label: 'Active Skills',
          count: statusData.active || 0,
          icon: '✅',
        };
        const pending: StatusCardType = {
          label: 'Approval Pending',
          count: statusData.pending || 0,
          icon: '⏳',
        };
        const rejected: StatusCardType = {
          label: 'Rejected Skills',
          count: statusData.rejected || 0,
          icon: '❌',
        };
        setStats([total, active, pending, rejected]);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    };
    getStats();
  }, [skills]);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const resData = await skillService.getSkills(
          filter,
          limit,
          page,
          sortBy
        );
        const data = resData.data;
        /// console.log('data after getting skills', data);
        setSkills(data.skills);
        setTotalDocs(data.totalDocs);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    };
    getSkills();
  }, [filter, page, sortBy]);

  const handleFilterChange = (data: Partial<SkillFilterType>) => {
    console.log('from handle filter change', data);

    setFilter((prev) => ({ ...prev, ...data }));
    setPage(1);
  };

  const addSkill = async () => {
    if (!skillName.trim()) {
      setError('Skill name cannot be empty');
      return;
    }
    if (skillName.length < 3) {
      setError('Skill name should have atleast 3 letters');
      return;
    }
    setError('');
    try {
      setLoading(true);
      const data = await skillService.addNewSkill(skillName);
      // console.log('after add skill', data);
      setSkills([
        { ...data.skill, usedCandidateCount: 0, usedCount: 0 },
        ...skills,
      ]);
      showToast({
        msg: data.message,
        type: 'success',
      });
      setSkillName('');
      setShowAddModal(false);
      setLoading(false);
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
      setLoading(false);
    }
  };

  const updateSkill = async () => {
    console.log('skill is');

    if (!skill) return;
    if (!skillName.trim()) {
      setError('Skill name cannot be empty');
      return;
    }
    if (skillName.length < 3) {
      setError('Skill name should have atleast 3 letters');
      return;
    }
    setError('');
    try {
      setLoading(true);
      const data = await skillService.updateSkill(skill!.id, skillName);
      console.log('after edit skill', data);
      setSkills((prev) =>
        prev.map((sk) =>
          sk.id == skill.id
            ? {
                ...skill,
                skillName: skillName,
                status: skill.status == 'pending' ? 'approved' : skill.status,
                reviewedAt:
                  skill.status == 'pending'
                    ? new Date().toDateString()
                    : skill.reviewedAt,
              }
            : sk
        )
      );

      showToast({
        msg: data.message,
        type: 'success',
      });
      setSkillName('');
      setShowEditModal(false);
      setLoading(false);
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (status: SkillStatusType) => {
    console.log('from skill update status', status);
    if (status == 'removed') {
      setShowDeleteReasonModal(true);
      return;
    }
    if (status == 'rejected') {
      setShowRejectReasonModal(true);
      return;
    }
    await updateStatus(status);
  };

  const updateStatus = async (status: SkillStatusType, reason?: string) => {
    if (!skill) return;
    console.log('reason', reason);
    try {
      const data = await skillService.updateStatus(skill.id, status, reason);
      console.log('after updating skill status', data);

      setSkills((prev) =>
        prev.map((sk) =>
          sk.id !== skill.id
            ? sk
            : {
                ...sk,
                status,
                reviewedAt:
                  status === 'approved' || status === 'rejected'
                    ? new Date().toISOString()
                    : sk.reviewedAt,
              }
        )
      );

      setShowDeleteReasonModal(false);
      setShowRejectReasonModal(false);
      showToast({
        msg: data.message,
        type: 'success',
      });
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
      setShowDeleteReasonModal(false);
      setShowRejectReasonModal(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection
          title="Skills Management"
          tagline=" Manage all Skills of your Platform"
        />
        <StatusCards stats={stats} />
        <div className="flex justify-end p-4">
          {' '}
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Skill
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {' '}
          <ReusableTable
            columns={skillColumns as ColumnType<SkillType>[]}
            tabs={tabs}
            updateFilter={handleFilterChange}
            entities={skills}
            filterOptions={filterOptions}
            totalDocs={totalDocs}
            sortOption={sortOption}
            setSortBy={setSortBy}
          />
          <Pagination
            onPageChange={setPage}
            totalPages={Math.ceil(totalDocs / limit)}
            count={skills.length}
            totalItem={totalDocs}
            item="Skills"
            currentPage={page}
          />
        </div>
      </div>
      <SkillModal
        skillName={skillName}
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setSkillName('');
        }}
        onChange={setSkillName}
        onSubmit={addSkill}
        error={error}
        loading={loading}
        mode="add"
      />
      <SkillModal
        skillName={skillName}
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSkillName('');
          setSkill(null);
        }}
        onChange={setSkillName}
        onSubmit={updateSkill}
        error={error}
        loading={loading}
        mode="edit"
      />
      <ViewSkillModal
        isOpen={showViewModal}
        skill={skill}
        onClose={() => {
          setShowViewModal(false);
          setSkill(null);
        }}
      />
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
        }}
        item="Skill"
        type="delete"
        action="Remove"
        onConfirm={() => handleUpdateStatus('removed')}
      />
      <AddReasonModal<SkillStatusType>
        isOpen={showDeleteReasonModal}
        onClose={() => {
          setSkill(null);
          setShowDeleteReasonModal(false);
        }}
        action="Remove"
        status="removed"
        item="Skill"
        onConfirm={updateStatus}
      />
      <AddReasonModal<SkillStatusType>
        isOpen={showRejectReasonModal}
        onClose={() => {
          setSkill(null);
          setShowRejectReasonModal(false);
        }}
        action="Reject"
        status="rejected"
        item="Skill"
        onConfirm={updateStatus}
      />
      <ConfirmationModal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
        }}
        item="Skill"
        type="delete"
        action="Reject"
        onConfirm={() => handleUpdateStatus('rejected')}
      />
      <ConfirmationModal
        isOpen={showApproveModal}
        onClose={() => {
          setSkill(null);
          setShowApproveModal(false);
        }}
        item="Skill"
        type="info"
        action="Approve"
        onConfirm={() => handleUpdateStatus('approved')}
      />
    </div>
  );
}

export default SkillsContainer;
