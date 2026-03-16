import { adminService } from '../../../../services/apiServices/adminService';
import type { CompanyProfileType } from '../../../../types/dtos/profileTypes/userTypes';
import { useToast } from '../../../../shared/toast/useToast';
import ConfirmationModal from '../../../modals/ConfirmationModal';
import { useState } from 'react';

const statusStyles = {
  active: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  suspended: 'bg-red-50 text-red-600 border border-red-200',
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  rejected: 'bg-red-50 text-red-600 border border-red-200',
};

function LogoAndName({
  company,
  onUpdate,
}: {
  company: CompanyProfileType | null;
  onUpdate: (updated: CompanyProfileType) => void;
}) {
  if (!company) return null;

  const [open, setOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [reactivateOpen, setReactivateOpen] = useState(false);

  const { showToast } = useToast();
  console.log(statusStyles[company.status]);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  console.log('logo url', `${baseUrl}${company.logoUrl}`);
  const approveCompany = async () => {
    console.log('approve company');
    try {
      const data = await adminService.updateCompany(company.id, {
        isVerified: true,
        status: 'active',
      });
      const approved = data.company;
      console.log('approved', approved);

      onUpdate(approved);
      setOpen(false);
      showToast({ msg: 'Company approved successfully', type: 'success' });
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  const rejectCompany = async () => {
    console.log('reject company');
    try {
      const data = await adminService.updateCompany(company.id, {
        isVerified: false,
        status: 'rejected',
      });
      const rejected = data.company;
      console.log('after rejecting', data);

      onUpdate(rejected);
      setRejectOpen(false);
      showToast({ msg: data.message, type: 'success' });
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };

  const suspendCompany = async () => {
    console.log('suspend company');
    try {
      const data = await adminService.updateCompany(company.id, {
        isVerified: true,
        status: 'suspended',
      });
      const suspended = data.company;
      console.log('after suspending', data);

      onUpdate(suspended);
      setSuspendOpen(false);
      showToast({ msg: data.message, type: 'success' });
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };

  const reactivateCompany = async () => {
    console.log('reactivate company');
    try {
      const data = await adminService.updateCompany(company.id, {
        isVerified: true,
        status: 'active',
      });
      const activated = data.company;
      console.log('after activated', data);

      onUpdate(activated);
      setReactivateOpen(false);
      showToast({ msg: data.message, type: 'success' });
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  const modalConfig = {
    approve: { action: 'Approve', type: 'info', function: approveCompany },
    reject: { action: 'Reject', type: 'delete', function: rejectCompany },
    suspend: { action: 'Suspend', type: 'delete', function: suspendCompany },
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="w-16 h-16  rounded-lg flex items-center justify-center">
          <img
            className="w-full h-full border rounded-full object-contain"
            src={`${baseUrl}${company.logoUrl}`}
            alt="Company logo"
          />
        </div>

        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-800">
            {company?.companyName}
          </h1>
          <p className="text-sm text-slate-500">{company?.industry}</p>

          <span
            className={`inline-block mt-2 px-3 py-1 text-xs font-medium  rounded-full ${statusStyles[company.status]}`}
          >
            {company?.isVerified && company.status === 'active'
              ? ' Verified Company'
              : company.status === 'pending'
                ? 'Verificaton Pending'
                : company.status === 'rejected'
                  ? 'company rejected'
                  : company.status == 'suspended'
                    ? 'company suspended'
                    : ''}
          </span>
        </div>
      </div>

      {/* Action Buttons */}

      {company.isVerified && company.status == 'active' && (
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
            View Jobs
          </button>

          <button
            onClick={() => setSuspendOpen(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
          >
            Suspend
          </button>
        </div>
      )}
      {company.status == 'pending' && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
          >
            Approve
          </button>

          <button
            onClick={() => setRejectOpen(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      )}
      {company.status == 'suspended' && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setReactivateOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
          >
            Reactivate
          </button>
        </div>
      )}
      <ConfirmationModal
        action="Approve"
        type="info"
        onClose={() => setOpen(false)}
        isOpen={open}
        item="company"
        onConfirm={approveCompany}
      />
      <ConfirmationModal
        action="Reject"
        type="delete"
        onClose={() => setRejectOpen(false)}
        isOpen={rejectOpen}
        item="company"
        onConfirm={rejectCompany}
      />
      <ConfirmationModal
        action="Suspend"
        type="delete"
        onClose={() => setSuspendOpen(false)}
        isOpen={suspendOpen}
        item="company"
        onConfirm={suspendCompany}
      />
      <ConfirmationModal
        action="Reactivate"
        type="info"
        onClose={() => setReactivateOpen(false)}
        isOpen={reactivateOpen}
        item="company"
        onConfirm={reactivateCompany}
      />
    </div>
  );
}

export default LogoAndName;
