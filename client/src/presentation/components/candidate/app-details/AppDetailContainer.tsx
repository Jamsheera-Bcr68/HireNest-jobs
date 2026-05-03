import { useParams } from 'react-router-dom';
import { BackButton } from '../ReusableComponents';
import { useNavigate } from 'react-router-dom';
import HeroHeader from './HeroHeader';
import { useEffect, useState } from 'react';
import { useToast } from '../../../../shared/toast/useToast';
import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';
import { type ApplicationDetailsDto } from '../../../../types/dtos/application.dto';
import { applicationService } from '../../../../services/apiServices/application.service';

function AppDetailContainer() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [application, setApplication] = useState<ApplicationDetailsDto | null>(
    null
  );
  if (!id) return null;
  useEffect(() => {
    const getAppDetails = async () => {
      try {
        const data = await applicationService.getApplicationDetails(id);
        console.log('after fetching appdetails', data);

        setApplication(data.application);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    };
    getAppDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <BackButton
          text=" Back to My Applications"
          onClick={() => navigate(-1)}
        />
        <HeroHeader application={application} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <LeftContainer
            updateApplication={setApplication}
            application={application}
          />
          <RightContainer application={application} />
        </div>
      </div>
    </div>
  );
}

export default AppDetailContainer;
