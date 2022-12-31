import { NextFunction } from 'express';
import { CustomRequest as Request, CustomResponse as Response } from '../types';
import { v4 } from 'uuid';

export const fingerprint = async (req: Request, res: Response, next: NextFunction) => {
  let fingerprint = req.cookies?.fingerprint;
  if (!fingerprint) {
    const cookieMaxAge = 7 * 24 * 60 * 60 * 1000;
    fingerprint = v4();
    res.cookie('fingerprint', JSON.stringify({ fingerprint }), { httpOnly: false, maxAge: cookieMaxAge });
  }
  req.fingerprint = fingerprint;
  next();
};
