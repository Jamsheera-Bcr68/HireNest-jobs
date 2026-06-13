import AdminJobDetailscontainer from '../../components/admin/job-details/AdminJobDetailscontainer';
import { useParams } from 'react-router-dom';

function JobDetails() {
  const {jobId}=useParams()
  if(!jobId)return null

  return <AdminJobDetailscontainer jobId={jobId} />;
}

export default JobDetails;
