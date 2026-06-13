import { useParams } from 'react-router-dom';
import ApplicationListingContainer from '../../components/user/employer/application-listing/ApplicationListingContainer';

function ApplicationsPage() {
  const {jobId}=useParams()
  return <ApplicationListingContainer role="admin" jobId={jobId} />;
}

export default ApplicationsPage;
