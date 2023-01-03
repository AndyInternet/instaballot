import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRecoilValue } from 'recoil';
import { networkState } from '../../state/apiState';
import { questionsState } from '../../state/questionState';

dayjs.extend(relativeTime);

export const Ballots = () => {
  const questions = useRecoilValue(questionsState);
  const network = useRecoilValue(networkState);

  const sortedQuestions = [...questions].sort((a, b) =>
    dayjs(a.expiresAt).isBefore(dayjs(b.expiresAt)) ? -1 : 1,
  );

  return (
    <Box>
      <>
        {questions.length === 0 ? (
          <>
            {network === 'active' ? (
              <Typography>Loading ...</Typography>
            ) : (
              <Typography>No active ballots</Typography>
            )}
          </>
        ) : (
          <>
            {sortedQuestions.map((question) => (
              <Card sx={{ marginBottom: '16px' }} key={question._id}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant='h5' component='div'>
                      {question.label}
                    </Typography>
                    {question.answers.map((answer) => (
                      <Typography variant='body2' key={answer._id}>
                        {answer.label}
                      </Typography>
                    ))}
                    <Divider sx={{ margin: '16px auto' }} />
                    <Box display='flex' justifyContent='space-between'>
                      <Typography
                        variant='subtitle2'
                        sx={{ textAlign: 'right' }}
                      >
                        Created {dayjs(question.createdAt).fromNow()}
                      </Typography>
                      <Typography
                        variant='subtitle2'
                        sx={{ textAlign: 'right' }}
                      >
                        Expires {dayjs(question.expiresAt).fromNow()}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </>
        )}
      </>
    </Box>
  );
};
