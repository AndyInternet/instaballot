import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { InstaBallotDivider } from '../../components/InstaBallotDivider';
import { Search } from '../../components/Search';
import { networkState } from '../../state/apiState';
import { questionsState } from '../../state/questionState';
import { BallotCard } from './BallotCard';

dayjs.extend(relativeTime);

export const Ballots = () => {
  const questions = useRecoilValue(questionsState);
  const network = useRecoilValue(networkState);

  const [search, setSearch] = useState('');

  const sortedQuestions = [...questions].sort((a, b) =>
    dayjs(a.expiresAt).isBefore(dayjs(b.expiresAt)) ? -1 : 1,
  );

  return (
    <Box>
      <Search search={search} setSearch={setSearch} fullWidth />
      <InstaBallotDivider />
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
