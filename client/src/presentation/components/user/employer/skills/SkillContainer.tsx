import StatusCards from '../../../admin/StatusCards';
import HeroSection from '../../../admin/HeroSection';
import { type StatusCardType } from '../../../../pages/admin/Companies';
import { skillService } from '../../../../../services/api-services/skillServices';
import { useEffect, useState } from 'react';
import { useToast } from '../../../../../shared/toast/use-toast';
import { type SkillType } from '../../../../../types/dtos/skill.types';
import { type ColumnType } from '../../../admin/Candidates/ReusableTable';
import ReusableTable from '../../../admin/Candidates/ReusableTable';
import { statusStyles } from '../../../../pages/admin/Candidates';
import { useSelector } from 'react-redux';
import { Eye, Trash, SquarePenIcon, Info } from 'lucide-react';

const tabs = [
  { label: 'Approved', value: 'approved' },
  { label: 'All', value: '' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Removed', value: 'removed' },
  { label: 'Pending', value: 'pending' },
];

import { type SkillStatusType } from '../../../../../types/dtos/skill.types';
import Pagination from '../../../common/Pagination';
import ViewSkillModal from '../../../admin/skills/ViewModal';
import ConfirmationModal from '../../../../modals/ConfirmationModal';

import SkillModal from '../../../admin/skills/SkillModal';
import { type SkillFilterType } from '../../../admin/skills/SkillsContainer';
import type { StateType } from '../../../../../constants/types/user';

const sortOption = {
  key: 'sortBy',
  label: 'Sort',
  options: [
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Count of Post', value: 'countOfPost' },
    { label: 'Count of Users', value: 'countOfUsers' },
  ],
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

  const skillColumns: ColumnType<SkillType>[] = [
    {
      key: 'skillName',
      label: 'Skill',
      mobile: 'primary',
      width: '22%',
      render: (s: SkillType) => (
        <div
          className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm inline-block max-w-[180px] truncate whitespace-nowrap overflow-hidden"
          title={s.skillName}
        >
          {s.skillName}
        </div>
      ),
      mobileRender: (s: SkillType) => (
        <div className="min-w-0 w-full">
          <p className="font-semibold text-slate-800 truncate">{s.skillName}</p>
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Requested On',
      width: '15%',
      render: (s: SkillType) => (
        <span className="text-slate-700 whitespace-nowrap">
          {new Date(s.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'reviewedAt',
      label: 'Reviewed On',
      width: '15%',
      render: (s: SkillType) => (
        <span className="text-slate-700 whitespace-nowrap">
          {s.reviewedAt
            ? new Date(s.reviewedAt).toLocaleDateString()
            : 'Pending'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      mobile: 'status',
      width: '12%',
      render: (s: SkillType) => (
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles[s.status!]}`}
        >
          {s.status}
        </span>
      ),
    },
    {
      key: 'reason',
      label: 'Reason',
      width: '6%',
      render: (s: SkillType) => {
        const reason =
          s.status === 'removed'
            ? s.reasonForRemove
            : s.status === 'rejected'
              ? s.reasonForReject
              : null;

        if (!reason) return <span className="text-slate-300">—</span>;

        return (
          <div className="group relative inline-flex items-center justify-center">
            <Info
              size={16}
              className="text-slate-400 cursor-pointer hover:text-slate-600"
            />
            <div className="invisible group-hover:visible absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 rounded-lg bg-slate-800 text-white text-xs px-3 py-2 shadow-lg">
              {reason}
            </div>
          </div>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      mobile: 'actions',
      width: '14%',
      render: (s: SkillType) => (
        <div className="flex items-center justify-center gap-3 w-full whitespace-nowrap">
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
      mobileRender: (s: SkillType) => (
        <div
          className="flex items-center flex-wrap gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              setSkill(s);
              setShowViewModal(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 active:scale-95 border border-indigo-200 rounded-full transition-all"
          >
            <Eye size={14} />
            View
          </button>

          {s.status === 'pending' && (
            <button
              onClick={() => {
                setSkill(s);
                setSkillName(s.skillName);
                setShowEditModal(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-600 bg-amber-50 hover:bg-amber-100 active:scale-95 border border-amber-200 rounded-full transition-all"
            >
              <SquarePenIcon size={14} />
              Edit
            </button>
          )}

          {s.status === 'pending' && (
            <button
              onClick={() => {
                setSkill(s);
                setShowDeleteModal(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 active:scale-95 border border-red-200 rounded-full transition-all"
            >
              <Trash size={14} />
              Withdraw
            </button>
          )}
        </div>
      ),
    },
  ];
  // total width: 22+15+15+12+6+14 = 84%

  // const skillColumns = [
  //   {
  //     key: 'skillName',
  //     label: 'Skill',
  //     render: (s: SkillType) => (
  //       <div className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm inline-block">
  //         {s.skillName}
  //       </div>
  //     ),
  //   },

  //   {
  //     key: 'createdAt',
  //     label: 'Requested On',
  //     render: (s: SkillType) => new Date(s.createdAt).toLocaleDateString(),
  //   },

  //   {
  //     key: 'reviewedAt',
  //     label: 'Reviewed On',
  //     render: (s: SkillType) =>
  //       s.reviewedAt ? new Date(s.reviewedAt).toLocaleDateString() : 'Pending',
  //   },

  //   {
  //     key: 'status',
  //     label: 'Status',
  //     render: (s: SkillType) => (
  //       <span
  //         className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[s.status!]}`}
  //       >
  //         {s.status}
  //       </span>
  //     ),
  //   },

  //   {
  //     key: 'reason',
  //     label: 'Reason',
  //     render: (s: SkillType) => {
  //       const reason =
  //         s.status === 'removed'
  //           ? s.reasonForRemove
  //           : s.status === 'rejected'
  //             ? s.reasonForReject
  //             : null;

  //       return reason ? (
  //         <span className="text-sm text-slate-600">{reason}</span>
  //       ) : null;
  //     },
  //   },

  //   {
  //     key: 'actions',
  //     label: 'Actions',
  //     render: (s: SkillType) => (
  //       <div className="flex items-center justify-center gap-3 w-full">
  //         {/* View */}
  //         <button
  //           onClick={() => {
  //             setSkill(s);
  //             setShowViewModal(true);
  //           }}
  //           className="text-indigo-600 hover:text-indigo-800"
  //           title="View"
  //         >
  //           <Eye size={18} />
  //         </button>

  //         {/* Edit only if pending */}
  //         {s.status === 'pending' && (
  //           <button
  //             onClick={() => {
  //               setSkill(s);
  //               setSkillName(s.skillName);
  //               setShowEditModal(true);
  //             }}
  //             title="Edit"
  //           >
  //             <SquarePenIcon size={16} className="text-amber-500" />
  //           </button>
  //         )}

  //         {/* Withdraw / Remove request */}
  //         {s.status === 'pending' && (
  //           <button
  //             onClick={() => {
  //               setSkill(s);
  //               setShowDeleteModal(true);
  //             }}
  //             title="Withdraw Request"
  //           >
  //             <Trash size={16} className="text-red-600" />
  //           </button>
  //         )}
  //       </div>
  //     ),
  //   },
  // ];

  // const skillColumns: ColumnType<SkillType>[] = [
  //   {
  //     key: 'skillName',
  //     label: 'Skill',
  //     mobile: 'primary',
  //     width: '16%',
  //     render: (s: SkillType) => (
  //       <div
  //         className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm inline-block max-w-[160px] truncate whitespace-nowrap overflow-hidden"
  //         title={s.skillName}
  //       >
  //         {s.skillName}
  //       </div>
  //     ),
  //     mobileRender: (s: SkillType) => (
  //       <div className="min-w-0 w-full">
  //         <p className="font-semibold text-slate-800 truncate">{s.skillName}</p>
  //       </div>
  //     ),
  //   },
  //   {
  //     key: 'createdAt',
  //     label: 'Requested On',
  //     width: '13%',
  //     render: (s: SkillType) => (
  //       <span className="text-slate-700 whitespace-nowrap">
  //         {new Date(s.createdAt).toLocaleDateString()}
  //       </span>
  //     ),
  //   },
  //   {
  //     key: 'reviewedAt',
  //     label: 'Reviewed On',
  //     width: '13%',
  //     render: (s: SkillType) => (
  //       <span className="text-slate-700 whitespace-nowrap">
  //         {s.reviewedAt ? new Date(s.reviewedAt).toLocaleDateString() : 'Pending'}
  //       </span>
  //     ),
  //   },
  //   {
  //     key: 'status',
  //     label: 'Status',
  //     mobile: 'status',
  //     width: '10%',
  //     render: (s: SkillType) => (
  //       <span
  //         className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles[s.status!]}`}
  //       >
  //         {s.status}
  //       </span>
  //     ),
  //   },
  //   {
  //     key: 'reason',
  //     label: 'Reason',
  //     width: '30%',
  //     render: (s: SkillType) => {
  //       const reason =
  //         s.status === 'removed'
  //           ? s.reasonForRemove
  //           : s.status === 'rejected'
  //             ? s.reasonForReject
  //             : null;

  //       return reason ? (
  //         <span className="text-sm text-slate-600 line-clamp-2 break-words" title={reason}>
  //           {reason}
  //         </span>
  //       ) : (
  //         <span className="text-sm text-slate-300">—</span>
  //       );
  //     },
  //   },
  //   {
  //     key: 'actions',
  //     label: 'Actions',
  //     mobile: 'actions',
  //     width: '12%',
  //     render: (s: SkillType) => (
  //       <div className="flex items-center justify-center gap-3 w-full whitespace-nowrap">
  //         <button
  //           onClick={() => {
  //             setSkill(s);
  //             setShowViewModal(true);
  //           }}
  //           className="text-indigo-600 hover:text-indigo-800"
  //           title="View"
  //         >
  //           <Eye size={18} />
  //         </button>

  //         {s.status === 'pending' && (
  //           <button
  //             onClick={() => {
  //               setSkill(s);
  //               setSkillName(s.skillName);
  //               setShowEditModal(true);
  //             }}
  //             title="Edit"
  //           >
  //             <SquarePenIcon size={16} className="text-amber-500" />
  //           </button>
  //         )}

  //         {s.status === 'pending' && (
  //           <button
  //             onClick={() => {
  //               setSkill(s);
  //               setShowDeleteModal(true);
  //             }}
  //             title="Withdraw Request"
  //           >
  //             <Trash size={16} className="text-red-600" />
  //           </button>
  //         )}
  //       </div>
  //     ),
  //     mobileRender: (s: SkillType) => (
  //       <div className="flex items-center flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
  //         <button
  //           onClick={() => {
  //             setSkill(s);
  //             setShowViewModal(true);
  //           }}
  //           className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 active:scale-95 border border-indigo-200 rounded-full transition-all"
  //         >
  //           <Eye size={14} />
  //           View
  //         </button>

  //         {s.status === 'pending' && (
  //           <button
  //             onClick={() => {
  //               setSkill(s);
  //               setSkillName(s.skillName);
  //               setShowEditModal(true);
  //             }}
  //             className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-600 bg-amber-50 hover:bg-amber-100 active:scale-95 border border-amber-200 rounded-full transition-all"
  //           >
  //             <SquarePenIcon size={14} />
  //             Edit
  //           </button>
  //         )}

  //         {s.status === 'pending' && (
  //           <button
  //             onClick={() => {
  //               setSkill(s);
  //               setShowDeleteModal(true);
  //             }}
  //             className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 active:scale-95 border border-red-200 rounded-full transition-all"
  //           >
  //             <Trash size={14} />
  //             Withdraw
  //           </button>
  //         )}
  //       </div>
  //     ),
  //   },
  // ];
  // total width: 16+13+13+10+30+12 = 94%
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
            filter={filter}
            columns={skillColumns as ColumnType<SkillType>[]}
            tabs={tabs}
            updateFilter={handleFilterChange}
            entities={skills}
            filterOptions={[]}
            item="Skills"
            onResetfilter={() => {
              setFilter({ status: 'approved' });
            }}
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
