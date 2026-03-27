import { model, Types } from 'mongoose';
import {
  JobType,
  Experience_LEVELS,
  ExperienceType,
} from '../../../domain/types/jobTypes';
import mongoose, { Schema } from 'mongoose';
import { required } from 'zod/v4/core/util.cjs';
import { WorkMode } from '../../../domain/enums/WorkMode';
import { StatusEnum } from '../../../domain/enums/statusEnum';
import { Industry_Type } from '../../../domain/types/companyProfileTypes';

export interface IJobDocument {
  _id: Types.ObjectId;
  title: string;
  mode: WorkMode;
  companyId: Types.ObjectId;
  jobType: JobType;
  vacancyCount: number;
  experience: ExperienceType;
  state: string;
  country: string;
  min_salary: number;
  max_salary: number;
  lastDate: Date;
  languages?: string[] | [];
  education: string;
  responsibilities: string[] | [];
  skills: Types.ObjectId[] | [];
  description: string;
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJobDocument>(
  {
    title: { type: String, required: true },
    mode: { type: String, enum: Object.values(WorkMode) },
    jobType: { type: String, enum: Object.values(JobType) },

    vacancyCount: { type: Number },
    experience: { type: String, enum: Object.values(Experience_LEVELS) },
    state: String,
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.ACTIVE,
    },
    country: String,
    min_salary: Number,
    max_salary: Number,
    lastDate: Date,
    companyId: { type: Types.ObjectId, required: true },
    languages: { type: [String], default: [] },
    education: String,
    responsibilities: { type: [String], default: [] },
    skills: { type: [Types.ObjectId], ref: 'Skill', default: [] },
    description: String,
  },
  { timestamps: true }
);

export const jobModel = model<IJobDocument>('Job', JobSchema);
