import { Vote } from '../types/questionTypes';

export const getVotePercentage = (
  votes: Vote[],
  answerId: string | undefined,
) => {
  const totalVotes = votes.length;
  const votesForAnswer = votes.filter(
    (vote) => vote.answerId === answerId,
  ).length;
  return (votesForAnswer / totalVotes) * 100;
};
