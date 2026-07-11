import { ApplicationStatusEnum } from "../../domain/enums/status.enum"

export type CandidateDashboardCardsDto=
    {
  totalApplications: number,
  applicationsThisMonth: number,

  underReview: number,
  shortListedApps: number,

  upcomingInterviews: number,
  nextInterviewDate: Date,

  savedJobs: number,
  savedJobsClosingSoon: number,

  profileCompletion: number,
  remainingProfileSections: number
  newNotificationCount:number
}

export type AppData={

  recentApps:{title:string,companyName:string,logoUrl:string,status:ApplicationStatusEnum,appliedAt:Date,id:string}[]
  appStatusData:{status:ApplicationStatusEnum,count:number}[]
}

export type DashboardUpcomingInterview={
  id:string
  company:string
  role:string
  date:string,
  time:string
  mode:string
  link?:string
}

export type DashboardProfileData={
  completion:number,
  missingFields:string[]
}
