import { useParams } from 'react-router-dom';
import MeetContainer from '../../components/common/meet/MeetContainer';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';

function MeetPage() {
  const { meetId } = useParams();

  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#111214]">
      <MeetContainer meetId={meetId} role={user.role} />
    </div>
  );
}

export default MeetPage;
