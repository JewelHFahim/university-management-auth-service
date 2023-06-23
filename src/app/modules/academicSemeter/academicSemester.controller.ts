import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  );
  res.status(200).json({
    success: true,
    message: 'Academic Semester is created succesfully',
    data: result,
  });
});

export const academicSemesterController = { createSemester };