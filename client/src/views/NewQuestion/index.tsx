import {
  Box,
  Button,
  Grid,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { createQuestionRequest } from '../../api';
import { InstaBallotDivider } from '../../components/InstaBallotDivider';
import { useAxios } from '../../hooks/useAxios';
import {
  activeQuestionIdState,
  questionsState,
} from '../../state/questionState';
import { CreateQuestionRequest, QuestionResponse } from '../../types/apiTypes';

export const NewQuestion = () => {
  const client = useAxios();
  const navigate = useNavigate();

  const [questions, setQuestions] = useRecoilState(questionsState);
  const setActiveQuestionId = useSetRecoilState(activeQuestionIdState);

  const [numberOfAnswers, setNumberOfAnswers] = useState<number>(2);
  const [question, setQuestion] = useState<string>('');
  const [expiresAt, setExpiresAt] = useState<Dayjs>(dayjs().add(1, 'day'));
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(''));
  const [visibleAnswers, setVisibleAnswers] = useState<string[]>([]);

  useEffect(() => {
    setVisibleAnswers(answers.slice(0, numberOfAnswers));
  }, [answers, numberOfAnswers]);

  const handleReset = () => {
    setQuestion('');
    setNumberOfAnswers(2);
    setExpiresAt(dayjs().add(1, 'day'));
    setAnswers(Array(10).fill(''));
    setVisibleAnswers([]);
  };

  const handleNumberOfAnswersChange = (
    event: Event,
    newValue: number | number[],
  ) => {
    setNumberOfAnswers(newValue as number);
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((answersValue) => {
      answersValue[index] = value;
      setVisibleAnswers(answersValue.slice(0, numberOfAnswers));
      return answersValue;
    });
  };

  const handleExpiresAtChange = (newValue: Dayjs | null) => {
    if (newValue) setExpiresAt(newValue);
  };

  const handleSubmit = async () => {
    const errors: string[] = [];
    if (question.length === 0) errors.push('Question required');
    if (!expiresAt) errors.push('Expires At required');
    if (expiresAt && dayjs(expiresAt).isBefore(dayjs()))
      errors.push('Expires At must be in future');
    visibleAnswers.forEach((answer, index) => {
      if (answer.length === 0) errors.push(`Answer ${index + 1} required`);
    });
    if (errors.length > 0) {
      errors.forEach((error) => toast(error, { type: 'error' }));
      return;
    }

    const request: CreateQuestionRequest = {
      answers: visibleAnswers,
      expiresAt: expiresAt.toISOString(),
      label: question,
    };

    const result = await client<CreateQuestionRequest, QuestionResponse>(
      createQuestionRequest(request),
    );
    if (result) {
      setQuestions([...questions, result]);
      setActiveQuestionId(result._id ?? null);
      navigate(result._id ? `/ballot/${result._id}` : '/');
    }
  };

  return (
    <Box>
      <TextField
        id='question-input'
        label='Question'
        multiline
        fullWidth
        maxRows={4}
        value={question}
        onChange={handleQuestionChange}
      />
      <InstaBallotDivider />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label='Voting Expires At'
          value={expiresAt}
          onChange={handleExpiresAtChange}
          minDateTime={dayjs()}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </LocalizationProvider>
      <InstaBallotDivider />
      <Typography variant='body2'>
        Number of Answers: {numberOfAnswers}
      </Typography>
      <Box sx={{ padding: '0 16px' }}>
        <Slider
          aria-label='Number of answers'
          value={numberOfAnswers}
          onChange={handleNumberOfAnswersChange}
          valueLabelDisplay='auto'
          step={1}
          marks
          min={2}
          max={10}
        />
      </Box>
      <InstaBallotDivider />
      {visibleAnswers.map((answer, index) => (
        <TextField
          id={`answer-input-${index}`}
          label={`Answer ${index + 1}`}
          fullWidth
          value={answer}
          onChange={(event) => handleAnswerChange(index, event.target.value)}
          sx={{ marginBottom: '16px' }}
          key={index}
        />
      ))}
      <InstaBallotDivider />
      <Grid container sx={{ marginTop: '16px' }}>
        <Grid item xs={6} sx={{ paddingRight: '8px' }}>
          <Button
            fullWidth
            variant='outlined'
            onClick={handleReset}
            sx={{ marginRight: '8px' }}
          >
            Reset
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ paddingLeft: '8px' }}>
          <Button fullWidth variant='contained' onClick={handleSubmit}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
