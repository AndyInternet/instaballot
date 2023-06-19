import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { InstaBallotDivider } from '../../components/InstaBallotDivider';
import { Search } from '../../components/Search';
import { networkState } from '../../state/apiState';
import { questionsState } from '../../state/questionState';
import { BallotCard } from './BallotCard';
import BallotBox from '../../assets/ballot-box.svg';
import { useNavigate } from 'react-router';

dayjs.extend(relativeTime);

export const Ballots = () => {
  const navigate = useNavigate();

  const questions = useRecoilValue(questionsState);
  const network = useRecoilValue(networkState);

  const [search, setSearch] = useState('');

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
              <Box
                sx={{
                  width: '100%',
                  height: 'calc(100vh - 160px)',
                }}
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
              >
                <img
                  src={BallotBox}
                  style={{
                    color: '#fff',
                    filter: 'invert(50%)',
                    width: '32px',
                  }}
                />
                <Typography
                  variant='body1'
                  sx={{ margin: '16px auto', opacity: '0.5' }}
                >
                  No Active Ballots
                </Typography>
                <Button
                  onClick={() => navigate('/new')}
                  color='primary'
                  variant='outlined'
                >
                  New Ballot
                </Button>
              </Box>
            )}
          </>
        ) : (
          <>
            <Search search={search} setSearch={setSearch} fullWidth />
            <InstaBallotDivider />
            {sortedQuestions
              .filter((question) => {
                if (search.length === 0) return true;
                return question.label
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((question) => (
                <BallotCard question={question} key={question._id} />
              ))}
          </>
        )}
      </>
    </Box>
  );
};
