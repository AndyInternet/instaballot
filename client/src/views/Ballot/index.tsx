import { Box, Divider, List, Typography } from '@mui/material';
import { useLayoutEffect } from 'react';
import { useParams } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { InstaBallotDivider } from '../../components/InstaBallotDivider';
import {
  activeQuestionIdState,
  selectActiveQuestion,
} from '../../state/questionState';
import { getFingerprint } from '../../utils/getFingerprint';
import { VoteButton } from './VoteButton';

export const Ballot = () => {
  const { id } = useParams();
  const setActiveQuestionId = useSetRecoilState(activeQuestionIdState);
  const activeQuestion = useRecoilValue(selectActiveQuestion);
  const fingerprint = getFingerprint();
  const activeVote =
    activeQuestion?.votes.find((vote) => vote.fingerprint === fingerprint) ??
    null;

  useLayoutEffect(() => {
    if (id) setActiveQuestionId(id);
  }, [id, setActiveQuestionId]);

  if (!activeQuestion) return null;

  return (
    <Box>
      <Typography variant='h5'>{activeQuestion.label}</Typography>
      <InstaBallotDivider />
      <InstaBallotDivider />
      <List>
        {activeQuestion.answers.map((answer) => (
          <VoteButton
            answer={answer}
            activeVote={activeVote}
            votes={activeQuestion.votes}
            key={answer._id}
          />
        ))}
      </List>
    </Box>
  );
};
