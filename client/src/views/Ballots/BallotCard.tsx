import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { InstaBallotDivider } from '../../components/InstaBallotDivider';
import { Question } from '../../types/questionTypes';

interface Props {
  question: Question;
}

export const BallotCard = ({ question }: Props) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ marginBottom: '16px' }}
      onClick={() => navigate(`/ballot/${question._id}`)}
    >
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
          <InstaBallotDivider />
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
  );
};
