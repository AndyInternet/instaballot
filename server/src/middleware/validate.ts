import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import { NextFunction, Request, Response } from 'express';

const ajv = new Ajv();
addFormats(ajv);

export const validate =
  <T>(schema: JSONSchemaType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validate = ajv.compile(schema);
    if (!validate(req.body)) {
      return res.status(422).json({ validationErrors: validate.errors });
    } else {
      next();
    }
  };
