import { Question } from './models';
import {
  Answer,
  CreateQuestionRequest,
  CustomRequest as Request,
  CustomResponse as Response,
  EmptyRequest,
  VoteRequest,
} from './types';

/**
 * index
 *
 * @param req
 * @param res
 * @returns
 */
export const index = async (req: Request<EmptyRequest>, res: Response) => {
  const { fingerprint } = req;

  try {
    const questions = await Question.find({ access: fingerprint });
    return res.json(questions);
  } catch (error) {
    console.error(error);
  }
};

/**
 * createQuestion
 *
 * @param req
 * @param res
 * @returns
 */
export const createQuestion = async (req: Request<CreateQuestionRequest>, res: Response) => {
  const { label, answers } = req.body;
  const { fingerprint } = req;

  const formattedAnswers: Answer[] = answers.map((label) => {
    return {
      label: label,
    };
  });

  try {
    const question = new Question({
      label: label,
      answers: formattedAnswers,
      votes: [],
      access: [fingerprint],
    });
    await question.save();
    return res.json(question);
  } catch (error) {
    console.error(error);
  }
};

/**
 * vote
 *
 * @param req
 * @param res
 * @returns
 */
export const vote = async (req: Request<VoteRequest>, res: Response) => {
  const { questionId, answerId } = req.body;
  const { fingerprint } = req;

  try {
    const question = await Question.findOne({ _id: questionId, 'answers._id': answerId });

    if (question && fingerprint) {
      // find existing vote for user
      const index = question.votes.findIndex((vote) => vote.fingerprint === fingerprint);
      if (index >= 0) {
        // update if exists
        question.votes[index].answerId === answerId;
      } else {
        // set if never voted
        question.votes.push({
          answerId: answerId,
          fingerprint: fingerprint,
        });
      }
      await question.save();
    }

    return res.json(question);
  } catch (error) {
    console.error(error);
  }
};