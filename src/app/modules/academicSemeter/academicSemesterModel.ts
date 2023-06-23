import { Schema, model } from 'mongoose';
import {
  IAcademicSemester,
  AcademicSemeterModel,
} from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterTitle,
  academicSemesterMonth,
} from './academicSemester.constsnt';
import status from 'http-status';
import ApiError from '../../../errors/ApiError';

const academicSemeterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
  },
  {
    timestamps: true,
  }
);

academicSemeterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic semester is alrady exist !');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemeterModel>(
  'AcademicSemester',
  academicSemeterSchema
);
