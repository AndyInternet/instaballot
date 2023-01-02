require('dotenv').config();
require('pretty-error').start();
import { HttpError } from 'http-errors';
import { createQuestion, index, vote } from './controllers';
import { init } from './init';
import { validate } from './middleware/validate';
import { CreateQuestionRequest, CustomRequest as Request, CustomResponse as Response, VoteRequest } from './types';
import { createQuestionRequestSchema, voteRequestSchema } from './validators';

// init express app and global middleware
const app = init();

// index
app.get('/', index);

// health check endpoint
app.get('/ping', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'service running' });
});

// create question
app.post('/question', validate<CreateQuestionRequest>(createQuestionRequestSchema), createQuestion);

// vote
app.post('/vote', validate<VoteRequest>(voteRequestSchema), vote);

// catch 404
app.use(function (req: Request, res: Response) {
  return res.status(404).json({ message: 'Invalid route (404)' });
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message || 'internal server error' });
});

export default app;
