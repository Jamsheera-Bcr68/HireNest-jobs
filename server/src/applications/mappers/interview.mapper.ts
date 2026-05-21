import {
  interviewDto,
  AggregatedInterviewDto,
  interviewDetailDto,
} from '../dtos/interview.dto';
import { getTime, getDateAndTime } from '../../shared/utils';
import { Interview } from '../../domain/entities/interview.entity';
import { Job } from '../../domain/entities/job.entity';
import { User } from '../../domain/entities/user.entity';
import { Company } from '../../domain/entities/company.entity';
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
      company: data.company,
      isRescheduleRequested: data.isRescheduleRequested,
      companyLogo: data.companyLogo,
      isConfirmed: data.isConfirmed,
      scheduledAt: getDateAndTime(data.scheduledAt),
    };
  }

  static entityToInterviewDto(
    data: Interview,
    job: Job,
    candidate: User,
    company: Company
  ): interviewDto {
    return {
      id: data.id,
      name: candidate.name ?? '',
      mode: data.mode,
      jobTitle: job.title,
      company: company.companyName,
      companyLogo: company.logoUrl,
      result: data.result,
      createdAt: new Date(data.createdAt).toDateString(),
      status: data.status,
      isConfirmed: data.isConfirmed,
      isRescheduleRequested: data.isRescheduleRequested,
      scheduledAt: getDateAndTime(data.scheduledAt),
    };
  }

  static toInterviewDetailDto(
    interview: Interview,
    job: Job,
    candidate: User,
    company: Company
  ): interviewDetailDto {
    return {
      id: interview.id,
      name: candidate.name ?? '',
      jobTitle: job.title,
      date: new Date(interview.scheduledAt).toDateString(),
      time: getTime(interview.scheduledAt),
      mode: interview.mode,
      status: interview.status,
      reasonForRescheduleRequest: interview.reasonForRescheduleRequest,
      meetLink: interview.meetLink,
      location: interview.location,
      duration: interview.duration,
      isConfirmed: interview.isConfirmed,
      isRescheduleRequested: interview.isRescheduleRequested,
      note: interview.notes,
      result: interview.result,
      feedback: interview.feedback,
      companyLogo: company.logoUrl,
      companyName: company.companyName,
      cancelledBy: interview.cancelledBy,
    };
  }
}
