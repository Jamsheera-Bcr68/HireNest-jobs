import { model, Model, Schema, Types, Document } from 'mongoose';
import {
  EducationLevel,
  EducationStatus,
} from '../../../../domain/enums/EducationEnum';

export interface IEducationDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  level: EducationLevel;
  institution: string;
  location: string;
  university: string;
  status: EducationStatus;
  cgpa: number;
  startYear: number;
  completedYear: number;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema = new Schema<IEducationDocument>(
  {
    userId: { type: Types.ObjectId },
    level: {
      type: String,
      enum: Object.values(EducationLevel),
      required: true,
    },
    institution: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(EducationStatus),
      required: true,
    },
    university: { type: String, required: true },
    location: { type: String, required: true },
    startYear: { type: Number, required: true },
    completedYear: { type: Number, required: true },
    cgpa: { type: Number, required: true },
  },
  { timestamps: true }
);

export const educationModel = model<IEducationDocument>(
  'Education',
  EducationSchema
);
