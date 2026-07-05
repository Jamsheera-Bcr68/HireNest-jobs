

import { useNavigate } from 'react-router-dom';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import type { DashboardCompany } from './DashbordContainer';

const pendingCompanies = [
  { id: "c1", name: "Northwind Analytics", industry: "Data & AI", location: "Bengaluru, IN", submitted: "2 hours ago", contact: "priya.rao@northwind.io", size: "51-200", logo: "NA" },
  { id: "c2", name: "Solstice Robotics", industry: "Manufacturing", location: "Austin, TX", submitted: "5 hours ago", contact: "hr@solsticerobotics.com", size: "11-50", logo: "SR" },
  { id: "c3", name: "Bluepeak Health", industry: "Healthcare", location: "Toronto, CA", submitted: "1 day ago", contact: "careers@bluepeak.ca", size: "201-500", logo: "BH" },
  { id: "c4", name: "Verdant Foods Co.", industry: "FMCG", location: "Kochi, IN", submitted: "1 day ago", contact: "talent@verdantfoods.in", size: "51-200", logo: "VF" },
  { id: "c5", name: "Ashcroft Legal Partners", industry: "Legal Services", location: "London, UK", submitted: "2 days ago", contact: "recruit@ashcroftlaw.co.uk", size: "11-50", logo: "AL" },
];

function Avatar({ name, className = "" }:{name:string,className:string}) {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className={`flex items-center justify-center rounded-full bg-slate-900 text-white font-body font-semibold ${className}`}>
      {initials}
    </div>
  );
}

export function EmptyState({ label }:{label:string}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <CheckCircle2 className="h-6 w-6 text-slate-400" />
      </div>
      <p className="font-body font-semibold text-slate-700">All caught up</p>
      <p className="font-body text-sm text-slate-400 mt-1">No pending {label} right now.</p>
    </div>
  );
}


type PendingProps={
  companies:DashboardCompany[]
}

const baseUrl=import.meta.env.VITE_BACKEND_URL
function PendingCompany({companies}:PendingProps) {
  const navigate=useNavigate()
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-slate-900">
          Pending company registrations
        </h3>
        <button
         onClick={()=>navigate('/admin/companies',{state:{status:'pending'}})}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          View all <ExternalLink className="h-3 w-3" />
        </button>
      </div>
      <div className="space-y-3">
        {companies.slice(0, 3).map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
          >
           {c.logoUrl? <div  className="h-10 w-10 text-xs shrink-0" >
              <img className='rounded-full' src={`${baseUrl}${c.logoUrl}`} alt="" />
            </div>: <Avatar name={c.name} className="h-10 w-10 text-xs shrink-0" />}
           
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {c.name}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {c.industry} · {c.location}
              </p>
            </div>
            <button
              onClick={() => navigate(`/admin/companies/${c.id}`)}
              className="h-8 w-12 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center shrink-0"
            >
              <p className="h-4 mb-1" >View</p>
            </button>
        
          </div>
        ))}
        {pendingCompanies.length === 0 && <EmptyState label="companies" />}
      </div>
    </div>
  );
}

export default PendingCompany;
