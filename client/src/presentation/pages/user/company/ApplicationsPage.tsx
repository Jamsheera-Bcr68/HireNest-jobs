import { useParams } from 'react-router-dom';
import ApplicationListingContainer from '../../../components/user/employer/application-listing/ApplicationListingContainer';

const ApplicationsPage = () => {
  const {jobId}=useParams<{jobId:string}>()



 
  return <ApplicationListingContainer jobId={jobId} role="company" />;
};

export default ApplicationsPage;
