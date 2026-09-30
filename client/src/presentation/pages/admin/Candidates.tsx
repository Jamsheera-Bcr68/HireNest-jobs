import { useEffect, useState } from 'react';
import StatusCards from '../../components/admin/StatusCards';
import { type StatusCardType } from './Companies';
import { adminService } from '../../../services/api-services/adminService';
import HeroSection from '../../components/admin/HeroSection';
import ReusableTable from '../../components/admin/Candidates/ReusableTable';
import { type ColumnType } from '../../components/admin/Candidates/ReusableTable';
import { type UserProfileType } from '../../../types/dtos/user.types';
import { EDUCATION_LEVELS } from '../../../types/dtos/profile-types/education.types';
import { useNavigate } from 'react-router-dom';
import { Eye, BanIcon, ThumbsUp } from 'lucide-react';
import Pagination from '../../components/common/Pagination';
import ConfirmationModal from '../../modals/ConfirmationModal';
import { useToast } from '../../../shared/toast/use-toast';
import { Avatar } from '../../components/common/Avatar';

const tabs = [
 
  { label: 'Active', value: 'active' },
   { label: 'All', value: '' },
  { label: 'Suspended', value: 'suspended' },
];
export type CandidateFilter = {
  search?: string;
  status?: string;
  education?: string;
};

export const statusStyles = {
  active: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  approved: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  suspended: 'bg-red-50 text-red-600 border border-red-200',
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  rejected: 'bg-red-50 text-red-600 border border-red-200',
  expired: 'bg-red-50 text-red-600 border border-red-200',
  removed: 'bg-red-50 text-red-600 border border-red-200',
  closed: 'bg-red-50 text-red-600 border border-red-200',
  paused: 'bg-amber-50 text-amber-700 border border-amber-200',
};


const eduLevels=EDUCATION_LEVELS.map(l=>({label:l,value:l}))
const filterOptions = [
  {
    key: 'education',
    label: 'Education',
    options: eduLevels,
  },
];
function Candidates() {
  const [limit] = useState(5);
  const [stats, setStats] = useState<StatusCardType[]>([]);
  const [filter, setFilter] = useState<Partial<CandidateFilter>>({});
  const [candidates, setCandidates] = useState<UserProfileType[]>([]);
  const [totalDocs, setTotalDocs] = useState(1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [activateModalOpen, setActivateModalOpen] = useState(false);
  const [id, setId] = useState('');


  const candidateColumns = [
    {
      key: 'imageUrl',
      label: 'Profile',
      mobile:"primary",
      render: (c: UserProfileType) => (
        <>
          {' '}
          <Avatar logoUrl={c.imageUrl} name={c.name??'Candidate'} item='candidate'  className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0`} />
          {/* <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0`}
          >
            <img
              className="rounded-full"
              src={`${baseUrl}${c.imageUrl}`}
              alt="PI"
            />
          </div> */}
        </>
      ),
    },
    {
      key: 'name',
      label: 'Name',
       mobile:"primary",
      render: (c: UserProfileType) => (
        <>
          {' '}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-800">{c.name}</span>
          </div>
          <p className="text-xs text-slate-400">{c.email}</p>
        </>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
     
      render: (c: UserProfileType) => c.phone,
    },
    {
      key: 'title',
      label: 'Role',
      render: (c: UserProfileType) => (c.title ? c.title : 'Not added'),
    },
    {
      key: 'joined',
    
      label: 'Joined',
      render: (c: UserProfileType) =>
        c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '---------',
    },
    {
      key: 'status',
       mobile:"status",
      label: 'Status',
      render: (c: UserProfileType) => (
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full  ${statusStyles[c.isBlocked ? 'suspended' : 'active']}`}
        >
          {c.isBlocked ? 'suspended' : 'active'}
        </span>
      ),
    },
   {
  key: 'actions',
  label: 'Actions',
  mobile: 'actions',

  // Desktop — unchanged, icon-only
  render: (c: UserProfileType) => (
    <div className="flex items-center  gap-1">
      <button
        onClick={() => navigate(`/admin/candidates/${c.id}`)}
        className="text-indigo-600 hover:text_indigo-800 "
        title="view"
      >
        <Eye size={18} />
      </button>
      {c.isBlocked ? (
        <button
          onClick={() => {
            setId(c.id);
            setActivateModalOpen(true);
          }}
          className="p-1.5 text-green-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
          title="UnBlock"
        >
          <ThumbsUp size={18} />{' '}
        </button>
      ) : (
        <button
          onClick={() => {
            console.log('candidateis', c.id);

            setId(c.id);
            setModalOpen(true);
          }}
          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          title="Block"
        >
          {' '}
          <BanIcon size={18} />{' '}
        </button>
      )}
    </div>
  ),

  // Mobile — text-labeled pill buttons
  mobileRender: (c: UserProfileType) => (
    <div
      className="flex items-center flex-wrap gap-2"
      onClick={(e) => e.stopPropagation()} // prevents the card from collapsing when a button inside it is tapped
    >
      <button
        onClick={() => navigate(`/admin/candidates/${c.id}`)}
        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 active:scale-95 border border-indigo-200 rounded-full transition-all"
      >
        <Eye size={14} />
        View
      </button>
      {c.isBlocked ? (
        <button
          onClick={() => {
            setId(c.id);
            setActivateModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-green-600 bg-green-50 hover:bg-green-100 active:scale-95 border border-green-200 rounded-full transition-all"
        >
          <ThumbsUp size={14} />
          Unblock
        </button>
      ) : (
        <button
          onClick={() => {
            console.log('candidateis', c.id);
            setId(c.id);
            setModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 active:scale-95 border border-red-200 rounded-full transition-all"
        >
          <BanIcon size={14} />
          Block
        </button>
      )}
    </div>
  ),
},
  ];

  const handleFilterChange = (newFilter: Partial<CandidateFilter>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
    setPage(1);
  };

  useEffect(() => {
    async function getCandidateStatusData() {
      const data = await adminService.getCandidateStatus();
      const statusData = data.status;
      const total: StatusCardType = {
        label: 'Total Candidates',
        count: statusData.totalCandidate || 0,
        icon: '🏢',
      };
      const active: StatusCardType = {
        label: 'Active Candidates',
        count: statusData.active || 0,
        icon: '✅',
      };
      const newDocs: StatusCardType = {
        label: 'New This Month',
        count: statusData.new || 0,
        icon: '🆕',
      };
      const suspended: StatusCardType = {
        label: 'Suspended',
        count: statusData.suspended || 0,
        icon: '🚫',
      };
      setStats([total, active, newDocs, suspended]);
    }
    getCandidateStatusData();
  }, [candidates]);

  useEffect(() => {
    async function getCandidates() {
      const data = await adminService.getCandidates(filter, page, limit);
      const candidates = data.candidates;
      console.log('data candidates', data);
      setCandidates(candidates);
      setTotalDocs(data.totalDocs);
    }
    getCandidates();
  }, [filter, page]);

  const handleSuspend = async () => {
    console.log('id', id);

    if (!id) return;
    console.log('from handle suspend,suspend id', id);
    try {
      const data = await adminService.updateCandidate(id, { isBlocked: true });
      const filtered = candidates.filter((c) => c.id !== id);
      setCandidates([...filtered, data.candidate]);
      setId('');
      showToast({ msg: data.message, type: 'success' });
      setModalOpen(false);
    } catch (error: any) {}
  };
  const handleActivate = async () => {
    if (!id) return;
    console.log('from handle activate, id', id);
    try {
      const data = await adminService.updateCandidate(id, { isBlocked: false });
      const filtered = candidates.filter((c) => c.id !== id);
      setCandidates([...filtered, data.candidate]);
      setId('');
      showToast({ msg: data.message, type: 'success' });
      setActivateModalOpen(false);
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
    }
  };
  const onResetFilter=()=>{
    setFilter({status:'active'

    })
  }
  return (
    <div>
      <div>
        <div className="min-h-screen w-full bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HeroSection
              title="Candidate Management"
              tagline=" Manage all registered Candidates on the platform"
            />
            <StatusCards stats={stats} />
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {' '}
              <ReusableTable
              filter={filter}
                totalDocs={totalDocs}
                columns={candidateColumns as ColumnType<UserProfileType>[]}
                tabs={tabs}
                updateFilter={handleFilterChange}
                entities={candidates}
                filterOptions={filterOptions}
                item='Candidates'
                onResetfilter={onResetFilter}
              />
              <Pagination
                onPageChange={setPage}
                totalPages={Math.ceil(totalDocs / limit)}
                count={candidates.length}
                totalItem={totalDocs}
                item="Candidates"
                currentPage={page}
              />
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        onClose={() => {
          setId('');
          setModalOpen(false);
        }}
        isOpen={modalOpen}
        onConfirm={handleSuspend}
        item="Candidate"
        type="delete"
        action="Suspend"
      />
      <ConfirmationModal
        onClose={() => setActivateModalOpen(false)}
        isOpen={activateModalOpen}
        onConfirm={handleActivate}
        item="Candidate"
        type="info"
        action="Activate"
      />
    </div>
  );
}

export default Candidates;
