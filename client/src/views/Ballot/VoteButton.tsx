import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  PanoramaFishEye as PanoramaFishEyeIcon,
} from '@mui/icons-material';
import {
  Box,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { voteRequest } from '../../api';
import { CircularProgressWithLabel } from '../../components/CircularProgressWithLabel';
import { useAxios } from '../../hooks/useAxios';
import {
  activeQuestionIdState,
  questionsState,
} from '../../state/questionState';
import { QuestionResponse, VoteRequest } from '../../types/apiTypes';
import { Answer, Vote } from '../../types/questionTypes';
import { getVotePercentage } from '../../utils/getVotePercentage';

interface Props {
  activeVote: Vote | null;
  answer: Answer;
  votes: Vote[];
}

export const VoteButton = ({ activeVote, answer, votes }: Props) => {
  const client = useAxios();
  const activeQuestionId = useRecoilValue(activeQuestionIdState);
  const setQuestions = useSetRecoilState(questionsState);
  const [percentage, setPercentage] = useState(
    getVotePercentage(votes, answer._id),
  );

  useEffect(() => {
    setPercentage(getVotePercentage(votes, answer._id));
  }, [votes]);

  const handleVote = async () => {
    if (!activeQuestionId) {
      toast('ballot id invalid', { type: 'error' });
      return;
    }
    if (!answer._id) {
      toast('answer id invalid', { type: 'error' });
      return;
    }
    const result = await client<VoteRequest, QuestionResponse>(
      voteRequest({
        answerId: answer._id,
        questionId: activeQuestionId,
      }),
    );
    if (result) {
      setQuestions((questions) => {
        const updatedQuestions = [...questions];
        const index = updatedQuestions.findIndex(
          (question) => question._id === activeQuestionId,
        );
        if (index >= 0) {
          updatedQuestions[index] = result;
        }
        return updatedQuestions;
      });
    }
  };

  return (
    <ListItemButton
      key={answer._id}
      selected={activeVote?.answerId === answer._id}
      onClick={handleVote}
    >
      <ListItemIcon>
        {activeVote?.answerId === answer._id ? (
          <CheckCircleOutlineIcon />
        ) : (
          <PanoramaFishEyeIcon />
        )}
      </ListItemIcon>
      <ListItemText>
        <Box sx={{ paddingRight: '40px' }}>{answer.label}</Box>
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CircularProgressWithLabel value={percentage} />
        </Box>
      </ListItemText>
    </ListItemButton>
  );
};
