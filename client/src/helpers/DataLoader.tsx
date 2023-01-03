import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { fetchAll } from '../api';
import { useAxios } from '../hooks/useAxios';
import { questionsState } from '../state/questionState';
import { EmptyRequest, QuestionsResponse } from '../types/apiTypes';

export const DataLoader = () => {
  const client = useAxios();
  const setQuestions = useSetRecoilState(questionsState);
  const location = useLocation();

  useEffect(() => {
    const load = async () => {
      const result = await client<EmptyRequest, QuestionsResponse>(fetchAll);
      if (result) setQuestions(result);
    };
    load();
  }, [client, location.pathname]);
  return null;
};
