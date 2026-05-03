import {
  interviewDto,
  AggregatedInterviewDto,
  interviewDetailDto,
} from '../Dtos/interview.dto';
import { getTime, getDateAndTime } from '../../shared/utils';
import { Interview } from '../../domain/entities/interview.entity';
import { Job } from '../../domain/entities/Job';
import { User } from '../../domain/entities/User';
export class InterviewMapper {
  static toInterviewDto(data: AggregatedInterviewDto): interviewDto {
    return {
      id: data.id,
      name: data.name,
      mode: data.mode,
      jobTitle: data.jobTitle,
      result: data.result,
      createdAt: new Date(data.createdAt).toDateString(),
      status: data.status,
      scheduledAt: getDateAndTime(data.scheduledAt),
    };
  }

  static entityToInterviewDto(
    data: Interview,
    job: Job,
    candidate: User
  ): interviewDto {
    return {
      id: data.id,
      name: candidate.name ?? '',
      mode: data.mode,
      jobTitle: job.title,
      result: data.result,
      createdAt: new Date(data.createdAt).toDateString(),
      status: data.status,
      scheduledAt: getDateAndTime(data.scheduledAt),
    };
  }

  static toInterviewDetailDto(
    interview: Interview,
    job: Job,
    candidate: User
  ): interviewDetailDto {
    return {
      id: interview.id,
      name: candidate.name ?? '',
      jobTitle: job.title,
      date: new Date(interview.scheduledAt).toDateString(),
      time: getTime(interview.scheduledAt),
      mode: interview.mode,
      status: interview.status,
      meetLink: interview.meetLink,
      location: interview.location,
      duration: interview.duration,
      isConfirmed: interview.isConfirmed,
      isRescheduleRequested: interview.isRescheduleRequested,
      note: interview.notes,
      result: interview.result,
      feedback: interview.feedback,
    };
  }
}
