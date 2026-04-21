import { ApplicationDetailsDto, ApplicationTimelineItemDTO } from '../Dtos/application.dto';
import { Application } from '../../domain/entities/application';

export function buildApplicationTimeline(application: Application):ApplicationTimelineItemDTO[] {
  const stages = [
    {
      key: 'pending',
      label: 'Applied',
      date:application.appliedAt? new Date(application.appliedAt).toDateString():'',
    },
      {
      key: "withdrawn",
      label: "Withdrawn",
      date:new Date().toDateString()
    },
    
    {
      key: 'reviewing',
      label: 'Under Review',
    date:application.reviewedAt? new Date(application.reviewedAt).toDateString():'',
    },
    {
      key: 'shortlisted',
      label: 'Shortlisted',
      date:application.shortlistedAt? new Date(application.shortlistedAt).toDateString():'',
    },
    {
      key: 'interview',
      label: 'Interview',
      date:application.interviewSheduledAt? new Date(application.interviewSheduledAt).toDateString():'',
    },
    {
      key: 'offered',
      label: 'Offer',
      date:application.offeredAt? new Date(application.offeredAt).toDateString():'',
    },
  ];
  const currentStageIndex = stages.findIndex(
    (s) => s.key === application.status
  );

  return stages.map((stage, index) => ({
    stage: stage.label,
    date: stage.date,
    status:
      index < currentStageIndex
        ? 'done'
        : index === currentStageIndex
          ? 'active'
          : 'pending',
  }));
}
