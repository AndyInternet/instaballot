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
import { questionsState } from '../../state/questionState';

dayjs.extend(relativeTime);

export const Ballots = () => {
  const questions = useRecoilValue(questionsState);

  return (
    <Box>
      {[...questions]
        .sort((a, b) =>
          dayjs(a.expiresAt).isBefore(dayjs(b.expiresAt)) ? -1 : 1,
        )
        .map((question) => (
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
                  <Typography variant='subtitle2' sx={{ textAlign: 'right' }}>
                    Created {dayjs(question.createdAt).fromNow()}
                  </Typography>
                  <Typography variant='subtitle2' sx={{ textAlign: 'right' }}>
                    Expires {dayjs(question.expiresAt).fromNow()}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </Box>
  );
};
