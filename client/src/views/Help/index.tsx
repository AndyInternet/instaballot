import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { InstaBallotDivider } from '../../components/InstaBallotDivider';

export const Help = () => {
  return (
    <Box>
      <Typography variant='h3'>How it works</Typography>
      <InstaBallotDivider />
      <Typography variant='body1'>
        InstaBallot helps you create and answer questions with the help of your
        social circle.
      </Typography>
      <Typography variant='body1'>
        Creating a new ballot is as easy as:
      </Typography>
      <ol>
        <li>
          Select{' '}
          <Link style={{ color: '#038C5A' }} to='/new'>
            New
          </Link>{' '}
          from the menu.
        </li>
        <li>Ask your ballot question.</li>
        <li>Create up to 10 answers.</li>
        <li>Share the link with anyone you want to vote.</li>
      </ol>
      <Typography variant='body1'>
        You can share the link with as many people as you like and anyone with
        the link can vote. Results happen in realtime on your screen.
      </Typography>
      <Box sx={{ margin: '32px' }} />
      <Typography variant='h3'>FAQ</Typography>
      <InstaBallotDivider />
      <Typography variant='body1'>
        <strong>Do I need an account?</strong>
        <br />
        There's no need to create an account, everything is anonymous and your
        browser will remember your ballots, choices and votes. Remember, if you
        clear your browser cache, your history will be lost.
      </Typography>
      <Box sx={{ margin: '16px' }} />
      <Typography variant='body1'>
        <strong>Why are there ballots on my list that I didn't post?</strong>
        <br />
        Your list is made up of any active ballots that you created or voted on.
      </Typography>
      <Box sx={{ margin: '16px' }} />
      <Typography variant='body1'>
        <strong>How long do ballots last?</strong>
        <br />
        Ballots are automatically removed from the system after they expire so
        grab screenshots if you want to keep your results.
      </Typography>
      <Box sx={{ margin: '16px' }} />
      <Typography variant='body1'>
        <strong>Is there a limit to how many people can vote?</strong>
        <br />
        No, you can send the link to anyone and they can vote as long as the
        ballot is active.
      </Typography>
    </Box>
  );
};
