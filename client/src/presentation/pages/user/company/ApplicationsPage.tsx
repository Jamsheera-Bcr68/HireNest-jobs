import { useParams } from 'react-router-dom';
import ApplicationListingContainer from '../../../components/user/employer/application-listing/ApplicationListingContainer';

const ApplicationsPage = () => {
  const {jobId}=useParams<{jobId:string}>()
console.log('job id from applications page',jobId);


 
  return <ApplicationListingContainer jobId={jobId} role="company" />;
};

export default ApplicationsPage;
