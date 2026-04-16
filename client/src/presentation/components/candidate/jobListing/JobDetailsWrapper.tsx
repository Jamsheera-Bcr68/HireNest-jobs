import { useEffect, useState } from 'react';
import JobDetails from './JobDetails';
import { jobService } from '../../../../services/apiServices/jobService';
import { type JobDetailsDto } from '../../../../types/dtos/jobDto';
import Header from '../../common/Header';
import { useLocation, useParams } from 'react-router-dom';

export default function JobDetailsPage() {
  const { id } = useParams();
  const location = useLocation();

  const passedJob = location.state?.job;
  const [job, setJob] = useState<JobDetailsDto | null>(
    passedJob ? passedJob : null
  );
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await jobService.getDetails(id!);
        setJob(data);
      } catch {
        setError('Failed to load job');
      }
    };

    fetchJob();
  }, [id]);

  return (
    <div>
      <Header />
      {!job ? (
        <div>Loading...</div>
      ) : (
        <></>
        // <JobDetails
        //   activeJob={job}
        //   //   viewMode="page"
        //   //   error={error}
        //   //   handleSave={() => {}}
        //   //   handleUnSave={() => {}}
        //   handleChange={() => {}}
        //   onReportSumbit={() => {}}
        // //  reportForm={{}}
        // />
      )}
    </div>
  );
}
