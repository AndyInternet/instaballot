import { v4 } from 'uuid';
import { Question } from './models';
import {
  Answers,
  CreateQuestionRequest,
  CustomRequest as Request,
  CustomResponse as Response,
  EmptyRequest,
  Votes,
} from './types';

export const index = async (req: Request<EmptyRequest>, res: Response) => {
  const { fingerprint } = req;

  const questions = await Question.find({ access: fingerprint });

  return res.json(questions);
};

export const createQuestion = async (req: Request<CreateQuestionRequest>, res: Response) => {
  const { label, answers } = req.body;
  const { fingerprint } = req;

  const answerRecords: Answers = {};
  answers.forEach((answer) => {
    answerRecords[v4()] = answer;
  });

  const voteRecords: Votes = {};

  try {
    const question = new Question({
      label: label,
      answers: answerRecords,
      votes: voteRecords,
      access: [fingerprint],
    });
    await question.save();
    return res.json(question);
  } catch (error) {
    console.error(error);
  }
};
