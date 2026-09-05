import AdminJobDetailscontainer from '../../components/admin/job-details/AdminJobDetailscontainer';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function JobDetails() {
  const location=useLocation()
  const tab=location.state?.tab
  console.log('tab from details',tab);
  
  const {jobId}=useParams()
  if(!jobId)return null

  return <AdminJobDetailscontainer jobId={jobId} activeTab={tab} />;
}

export default JobDetails;
