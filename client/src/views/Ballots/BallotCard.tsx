import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
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
          <InstaBallotDivider />
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
              <Typography variant='subtitle2'>
                Expires {dayjs(question.expiresAt).fromNow()}
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                variant='outlined'
                color='primary'
                avatar={<Avatar>{question.votes.length}</Avatar>}
                label='Votes'
              />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
