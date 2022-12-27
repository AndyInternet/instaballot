import compression from "compression";
import cors from "cors";
import express, { json, urlencoded } from "express";
import helmet from "helmet";

export const init = () => {
  const app = express();

  // compress responses unless explicitly requested
  app.use(
    compression({
      filter: (req, res) => {
        if (req.headers["x-no-compression"]) {
          return false;
        }
        return compression.filter(req, res);
      },
    })
  );

  // allow JSON body in req
  app.use(urlencoded({ extended: false }));
  app.use(
    json({
      limit: "20mb",
    })
  );

  // allow app to use CORS
  app.use(cors());

  // header security
  app.use(helmet());

  return app;
};
