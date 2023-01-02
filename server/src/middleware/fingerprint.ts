import { NextFunction } from 'express';
import { v4 } from 'uuid';
import { CustomRequest as Request, CustomResponse as Response } from '../types';

export const fingerprint = async (req: Request, res: Response, next: NextFunction) => {
  const cookieFingerprint = req.cookies?.fingerprint;
  if (cookieFingerprint) {
    const fingerprint = JSON.parse(cookieFingerprint);
    req.fingerprint = fingerprint.fingerprint;
  } else {
    const cookieMaxAge = 7 * 24 * 60 * 60 * 1000;
    const fingerprint = v4();
    res.cookie('fingerprint', JSON.stringify({ fingerprint }), { httpOnly: true, maxAge: cookieMaxAge });
    req.fingerprint = fingerprint;
  }
  next();
};
