import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import { fingerprint } from './middleware/fingerprint';
import { connectMongo } from './services/mongo';

/**
 * init
 */
export const init = () => {
  connectMongo();

  const app = express();

  // compress responses unless explicitly requested
  app.use(
    compression({
      filter: (req, res) => {
        if (req.headers['x-no-compression']) {
          return false;
        }
        return compression.filter(req, res);
      },
    }),
  );

  // allow JSON body in req
  app.use(urlencoded({ extended: false }));
  app.use(
    json({
      limit: '20mb',
    }),
  );

  // allow app to use CORS
  app.use(
    cors({
      origin: process.env.CLIENT_HOSTNAME || '',
      credentials: true,
    }),
  );

  // read cookies
  app.use(cookieParser());

  // header security
  app.use(helmet());

  // fingerprint users
  app.use(fingerprint);

  return app;
};
