import StatusCards from '../../../admin/StatusCards';
import HeroSection from '../../../admin/HeroSection';
import { type StatusCardType } from '../../../../pages/admin/Companies';
import { skillService } from '../../../../../services/apiServices/skillServices';
import { useEffect, useState } from 'react';
import { useToast } from '../../../../../shared/toast/useToast';
import { type SkillType } from '../../../../../types/dtos/skillTypes';
import { type ColumnType } from '../../../admin/Candidates/ReusableTable';
import ReusableTable from '../../../admin/Candidates/ReusableTable';
import { statusStyles } from '../../../../pages/admin/Candidates';
import { useSelector } from 'react-redux';
import { Eye, Trash, SquarePenIcon } from 'lucide-react';

const tabs = ['All', 'Approved', 'Rejected', 'Removed', 'Pending'];

import { type SkillStatusType } from '../../../../../types/dtos/skillTypes';
import Pagination from '../../../common/Pagination';
import ViewSkillModal from '../../../admin/skills/ViewModal';
import ConfirmationModal from '../../../../modals/ConfirmationModal';

import SkillModal from '../../../admin/skills/SkillModal';
import { type SkillFilterType } from '../../../admin/skills/SkillsContainer';
import type { StateType } from '../../../../../constants/types/user';

const sortOption = {
  key: 'sortBy',
  label: 'Sort',
  options: ['Newest', 'Oldest', 'Count of Post', 'Count of Users'],
};
function SkillsContainer() {
  const { showToast } = useToast();
  const user = useSelector((state: StateType) => state.auth.user);
  if (user.role !== 'company') {
    showToast({
      msg: 'unautherised acess',
      type: 'error',
    });
  }

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
      key: 'createdAt',
      label: 'Requested On',
      render: (s: SkillType) => new Date(s.createdAt).toLocaleDateString(),
    },

    {
      key: 'reviewedAt',
      label: 'Reviewed On',
      render: (s: SkillType) =>
        s.reviewedAt ? new Date(s.reviewedAt).toLocaleDateString() : 'Pending',
    },

    {
      key: 'status',
      label: 'Status',
      render: (s: SkillType) => (
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[s.status!]}`}
        >
          {s.status}
        </span>
      ),
    },

    {
      key: 'reason',
      label: 'Reason',
      render: (s: SkillType) => {
        const reason =
          s.status === 'removed'
            ? s.reasonForRemove
            : s.status === 'rejected'
              ? s.reasonForReject
              : null;

        return reason ? (
          <span className="text-sm text-slate-600">{reason}</span>
        ) : null;
      },
    },

    {
      key: 'actions',
      label: 'Actions',
      render: (s: SkillType) => (
        <div className="flex items-center justify-center gap-3 w-full">
          {/* View */}
          <button
            onClick={() => {
              setSkill(s);
              setShowViewModal(true);
            }}
            className="text-indigo-600 hover:text-indigo-800"
            title="View"
          >
            <Eye size={18} />
          </button>

          {/* Edit only if pending */}
          {s.status === 'pending' && (
            <button
              onClick={() => {
                setSkill(s);
                setSkillName(s.skillName);
                setShowEditModal(true);
              }}
              title="Edit"
            >
              <SquarePenIcon size={16} className="text-amber-500" />
            </button>
          )}

          {/* Withdraw / Remove request */}
          {s.status === 'pending' && (
            <button
              onClick={() => {
                setSkill(s);
                setShowDeleteModal(true);
              }}
              title="Withdraw Request"
            >
              <Trash size={16} className="text-red-600" />
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
          label: 'Total Skill Requests',
          count: statusData.total || 0,
          icon: '🛠️',
        };
        const active: StatusCardType = {
          label: 'Approved',
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
        const resData = await skillService.getRequestedSkills(
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
          sk.id == skill.id ? { ...skill, skillName: skillName } : sk
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

    await updateStatus(status);
  };
  const updateStatus = async (status: SkillStatusType) => {
    if (!skill) return;

    try {
      const data = await skillService.updateStatus(skill.id, status);
      console.log('after updating skill status', data);

      setSkills((prev) =>
        prev.map((sk) => (sk.id !== skill.id ? sk : { ...skill, status }))
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
            filterOptions={[]}
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
    </div>
  );
}

export default SkillsContainer;
