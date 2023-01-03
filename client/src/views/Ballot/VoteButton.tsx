import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  PanoramaFishEye as PanoramaFishEyeIcon,
} from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { toast } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { voteRequest } from '../../api';
import { useAxios } from '../../hooks/useAxios';
import {
  activeQuestionIdState,
  questionsState,
} from '../../state/questionState';
import { QuestionResponse, VoteRequest } from '../../types/apiTypes';
import { Answer, Vote } from '../../types/questionTypes';

interface Props {
  answer: Answer;
  activeVote: Vote | null;
}

export const VoteButton = ({ answer, activeVote }: Props) => {
  const client = useAxios();
  const activeQuestionId = useRecoilValue(activeQuestionIdState);
  const setQuestions = useSetRecoilState(questionsState);

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
      <ListItemText>{answer.label}</ListItemText>
    </ListItemButton>
  );
};
