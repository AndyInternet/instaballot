import { Share as ShareIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Chip,
  Grid,
  IconButton,
  List,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { readQuestion } from '../../api';
import { InstaBallotDivider } from '../../components/InstaBallotDivider';
import { useAxios } from '../../hooks/useAxios';
import { useShare } from '../../hooks/useShare';
import { networkState } from '../../state/apiState';
import { fingerprintState } from '../../state/fingerprintState';
import {
  activeQuestionIdState,
  questionsState,
  selectActiveQuestion,
} from '../../state/questionState';
import {
  isMobileState,
  uiQrCodeSizeState,
  uiQrCodeState,
} from '../../state/uiState';
import { EmptyRequest, QuestionResponse } from '../../types/apiTypes';
import { MoreMenu } from './MoreMenu';
import { QrCode } from './QrCode';
import { VoteButton } from './VoteButton';

export const Ballot = () => {
  const { id } = useParams();
  const client = useAxios();
  const share = useShare();
  const isMobile = useRecoilValue(isMobileState);
  const setQuestions = useSetRecoilState(questionsState);
  const setActiveQuestionId = useSetRecoilState(activeQuestionIdState);
  const qrCodeEnabled = useRecoilValue(uiQrCodeState);
  const qrCodeSize = useRecoilValue(uiQrCodeSizeState);
  const network = useRecoilValue(networkState);
  const activeQuestion = useRecoilValue(selectActiveQuestion);
  const fingerprint = useRecoilValue(fingerprintState);
  const activeVote =
    activeQuestion?.votes.find((vote) => vote.fingerprint === fingerprint) ??
    null;

  useEffect(() => {
    const fetch = async () => {
      if (!activeQuestion && id) {
        const result = await client<EmptyRequest, QuestionResponse>(
          readQuestion(id),
        );
        if (result) {
          setQuestions((questions) => {
            const updatedQuestions = [...questions];
            const index = updatedQuestions.findIndex(
              (q) => q._id === result._id,
            );
            if (index >= 0) {
              updatedQuestions[index] = result;
            } else {
              updatedQuestions.push(result);
            }
            return updatedQuestions;
          });
        }
      }
    };
    fetch();
  }, [activeQuestion, id]);

  useLayoutEffect(() => {
    if (id) setActiveQuestionId(id);
  }, [id, setActiveQuestionId]);

  return (
    <>
      {activeQuestion ? (
        <>
          <Box>
            <Typography variant='h5'>{activeQuestion.label}</Typography>
            <InstaBallotDivider />
            <Grid container justifyContent='space-between' alignItems='center'>
              <Grid item>
                <Typography variant='subtitle2'>
                  Expires {dayjs(activeQuestion.expiresAt).fromNow()}
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  variant='outlined'
                  color='primary'
                  avatar={<Avatar>{activeQuestion.votes.length}</Avatar>}
                  label='Votes'
                />
                <IconButton onClick={() => share(activeQuestion.label)}>
                  <ShareIcon color='primary' />
                </IconButton>
                <MoreMenu />
              </Grid>
            </Grid>
            <InstaBallotDivider />
            <Box display='flex' justifyContent='space-between'>
              <List sx={{ flex: 1 }}>
                {activeQuestion.answers.map((answer) => (
                  <VoteButton
                    answer={answer}
                    activeVote={activeVote}
                    votes={activeQuestion.votes}
                    key={answer._id}
                  />
                ))}
              </List>
              {!isMobile && qrCodeEnabled && (
                <>
                  <Box sx={{ marginLeft: '16px' }} />
                  <Box sx={{ minWidth: `${qrCodeSize}px` }}>
                    <QrCode />
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </>
      ) : (
        <>
          {network === 'active' ? (
            <Typography>Loading...</Typography>
          ) : (
            <Typography>Invalid Link</Typography>
          )}
        </>
      )}
    </>
  );
};
