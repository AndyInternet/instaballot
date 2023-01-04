import { Vote } from '../types/questionTypes';

export const getVotePercentage = (
  votes: Vote[],
  answerId: string | undefined,
) => {
  const totalVotes = votes.length;

  if (totalVotes === 0) return 0;

  const votesForAnswer = votes.filter(
    (vote) => vote.answerId === answerId,
  ).length;

  return (votesForAnswer / totalVotes) * 100;
};
