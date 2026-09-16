import type { JobCardDto } from "../../../../types/dtos/job.dto"
import { useNavigate } from "react-router-dom"
import JobCard from "../Cards"
import { JobCardSkeleton } from "./Common"
import { Sparkles } from "lucide-react"
1

type Props = {
  jobs: JobCardDto[];
  handleApplyClick: (jobId: string) => Promise<void>;
  saveJobHandle: (jobId: string) => Promise<void>;
  unSaveJobHandle: (jobId: string) => Promise<void>;
  isLoading:boolean
};
function RecomentedJobs({jobs,handleApplyClick,saveJobHandle,unSaveJobHandle,isLoading}:Props) {
    const navigate=useNavigate()
    if (isLoading) {
  return <JobCardSkeleton count={3} />;
}
  return (
    <div>
       <div className="bg-white rounded-2xl p-4 sm:p-5 mt-10 ring-1 ring-slate-900/5">
        <div className="rise mt-6" style={{ animationDelay: '240ms' }}>
          <div className="flex flex-wrap justify-between items-center gap-2 mb-5">
            <div>
              <h3 className="font-display text-[15px] font-semibold text-slate-900 mb-3">
                Recomented Jobs
              </h3>
              <p className="text-sm text-slate-500">Based on your skills</p>
            </div>

            <button onClick={()=>navigate('/jobs')} className="text-sm text-emerald-600 font-medium hover:text-emerald-700 transition">
              View all
            </button>
          </div>
         {jobs.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    {jobs.map((j) => (
      <JobCard
        handleSave={saveJobHandle}
        handleUnSave={unSaveJobHandle}
        key={j.id}
        job={j}
      />
    ))}
  </div>
) : (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-fuchsia-200 bg-fuchsia-50/50 px-6 py-12 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-fuchsia-100">
      <Sparkles className="h-7 w-7 text-fuchsia-600" />
    </div>

    <h3 className="text-lg font-semibold text-gray-900">
      Get personalized job recommendations
    </h3>

    <p className="mt-2 max-w-md text-sm text-gray-500">
      Add your skills and job title to help us find jobs that match
      your profile.
    </p>

    <button
      onClick={() => navigate('/candidate/profile')}
      className="mt-5 rounded-lg bg-fuchsia-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-fuchsia-600"
    >
      Add Skills & Job role
    </button>
  </div>
)}
        </div>
      </div>
     
    </div>
   
  )
}

export default RecomentedJobs
