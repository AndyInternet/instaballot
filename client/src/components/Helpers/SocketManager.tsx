import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import io from 'socket.io-client';
import { fingerprintState } from '../../state/fingerprintState';
import { questionsState } from '../../state/questionState';
import { Question } from '../../types/questionTypes';

const baseUrl = import.meta.env.VITE_SERVER_URL || '';
const socket = io(baseUrl, {
  withCredentials: true,
  autoConnect: false,
});
export const SocketManager = () => {
  const setQuestions = useSetRecoilState(questionsState);
  const fingerprint = useRecoilValue(fingerprintState);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (fingerprint) {
      socket.connect();
      socket.on('connect', () => {
        setIsConnected(true);
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
      });

      socket.on('question', (question: Question) => {
        setQuestions((questions) => {
          const updatedQuestions = [...questions];
          const index = updatedQuestions.findIndex(
            (q) => q._id === question._id,
          );
          if (index >= 0) {
            updatedQuestions[index] = question;
          }
          return updatedQuestions;
        });
      });

      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('pong');
      };
    }
  }, [fingerprint]);

  return null;
};
