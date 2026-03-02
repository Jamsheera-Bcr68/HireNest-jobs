import mongoose, { Schema, model, Types, Document } from 'mongoose';
import { WorkMode } from '../../../../domain/enums/WorkMode';

export interface IExperienceDocument extends Document {
  userId: Types.ObjectId;
  title: string;
  company: string;
  mode: WorkMode;
  startDate: Date;
  endDate?: Date;
  location?: string;
  description?: string;
  isWorking: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new Schema<IExperienceDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      enum: Object.values(WorkMode),
      default: WorkMode.ONSITE,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    location: {
      type: String,
    },

    description: {
      type: String,
    },

    isWorking: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ExperienceModel = model<IExperienceDocument>(
  'Experience',
  experienceSchema
);
