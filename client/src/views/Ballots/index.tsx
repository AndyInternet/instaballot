import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRecoilValue } from 'recoil';
import { networkState } from '../../state/apiState';
import { questionsState } from '../../state/questionState';
import { BallotCard } from './BallotCard';

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
              <BallotCard question={question} key={question._id} />
            ))}
          </>
        )}
      </>
    </Box>
  );
};
