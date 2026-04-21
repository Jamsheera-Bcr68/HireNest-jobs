import { ApplicationCard } from './ApplicationCard';
import { type ApplicationDto } from '../../../../types/dtos/application.dto';

type Props = {
  applications: ApplicationDto[];
};
function ApplicationList({ applications }: Props) {
  return (
    <>
      {applications.length == 0 ? (
        <div className="text-center py-20 text-gray-400 text-sm">
          No applications found matching your filters.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </>
  );
}

export default ApplicationList;
