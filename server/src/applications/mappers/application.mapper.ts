import { Application } from '../../domain/entities/application';
import { Company } from '../../domain/entities/company';
import { Job } from '../../domain/entities/Job';
import { Skill } from '../../domain/entities/skill';
import { User } from '../../domain/entities/User';
import { UserRole } from '../../domain/enums/userEnums';
import { IResume } from '../../domain/values/profileTypes';
import { ApplicationTimelineItemDTO } from '../Dtos/application.dto';
import { getMonthAndYear } from '../../shared/utils';
import {
  ApplicationDto,
  AggregatedApplication,
  ApplicationDetailsDto,
} from '../Dtos/application.dto';
import { buildApplicationTimeline } from '../utils/buildApplicationTimeline';

export class ApplicationMapper {
  static toApplicationDto(entity: AggregatedApplication): ApplicationDto {
    return {
      id: entity.id,
      jobTitle: entity.jobTitle,
      location: entity.state + ' ,' + entity.country,
      workMode: entity.mode,
      jobType: entity.type,
      category: entity.category,
      company: entity.company,
      logo: entity.logo,
      status: entity.status,
      appliedDate: new Date(entity.appliedAt).toDateString(),
    };
  }

  static toApplicationDetailDto(
  app: Application,
  job: Job,
  company: Company,
  candidate: User,
  skills: Skill[],
  resume: IResume
): ApplicationDetailsDto {
  return {
    id: app.id,
    status: app.status,
    resume: resume,

    appliedAt: new Date(app.appliedAt).toDateString(),

    reviewedAt: app.reviewedAt
      ? new Date(app.reviewedAt).toDateString()
      : undefined,

    shortlistedAt: app.shortlistedAt
      ? new Date(app.shortlistedAt).toDateString()
      : undefined,

    interviewAt: app.interviewSheduledAt
      ? new Date(app.interviewSheduledAt).toDateString()
      : undefined,

    offeredAt: app.offeredAt
      ? new Date(app.offeredAt).toDateString()
      : undefined,

    timeline: buildApplicationTimeline(app),

    candidate: {
      about:candidate.about??'',
      candidateName: candidate.name ?? "",
      role: candidate.title ?? "",
      email: candidate.email,
      phone: candidate.phone ?? "",
      profileImg: candidate.imageUrl,

      location: `${candidate.address?.place ?? ""}, 
                 ${candidate.address?.state ?? ""}, 
                 ${candidate.address?.country ?? ""}`,

      experience: candidate.experience.map((exp) => ({
        role: exp.title,
        company: exp.company,
        mode: exp.mode,
        isWorking: exp.isWorking,
        startYear: getMonthAndYear(exp.startDate.toString()),
        endYear: exp.endDate
          ? getMonthAndYear(exp.endDate.toString())
          : undefined,
      })),

      education: candidate.education.map((edu) => ({
        level: edu.level.toString(),
        institute: edu.institution,
        univercity: edu.university,
        status: edu.status,
        year: edu.completedYear ?? undefined,
      })),
    },

    job: {
      id: job.id,
      title: job.title,
      location: `${job.state}, ${job.country}`,
      jobType: job.jobType,
      mode: job.mode,
      experience: job.experience,
      skills: skills.map((sk) => sk.skillName),
      min_salary: job.min_salary,
      max_salary: job.max_salary,
      postedDate: job.createdAt
        ? new Date(job.createdAt).toDateString()
        : "",
    },

    company: {
      id: job.companyId,
      companyName: company.companyName,
      industry: company.industry,
      logoUrl: company.logoUrl,
      location: `${company.address.place}, 
                 ${company.address.state}, 
                 ${company.address.country}`,
      size: company.size,
    },
  };
}
  static getTimeline(app: Application): {
    timeline: ApplicationTimelineItemDTO[];
  } {
    return {
      timeline: buildApplicationTimeline(app),
    };
  }
}
