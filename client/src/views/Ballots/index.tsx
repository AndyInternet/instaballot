import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRecoilValue } from 'recoil';
import { questionsState } from '../../state/questionState';

dayjs.extend(relativeTime);

export const Ballots = () => {
  const questions = useRecoilValue(questionsState);

  return (
    <Box>
      {questions.map((question) => (
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography variant='h5' component='div'>
                {question.label}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                <ul>
                  {question.answers.map((answer) => (
                    <li>{answer.label}</li>
                  ))}
                </ul>
              </Typography>
              <Typography variant='subtitle2' sx={{ textAlign: 'right' }}>
                Expires {dayjs(question.expiresAt).fromNow()}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};
