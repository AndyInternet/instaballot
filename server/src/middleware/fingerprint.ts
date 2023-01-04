import dayjs from 'dayjs';
import { NextFunction } from 'express';
import { v4 } from 'uuid';
import { CustomRequest as Request, CustomResponse as Response } from '../types';

export const fingerprint = async (req: Request, res: Response, next: NextFunction) => {
  let fingerprint = req.cookies?.fingerprint;
  if (!fingerprint) fingerprint = v4();
  res.cookie('fingerprint', fingerprint, { secure: false, expires: dayjs().add(1, 'year').toDate() });
  req.fingerprint = fingerprint;
  next();
};
