import { NextFunction } from 'express';
import { CustomRequest as Request, CustomResponse as Response } from '../types';

export const fingerprint = async (req: Request, res: Response, next: NextFunction) => {
  const fingerprint = req.headers.fingerprint;
  if (!fingerprint || typeof fingerprint !== 'string') return res.status(403).json({ message: 'access denied' });
  req.fingerprint = fingerprint;
  next();
};
