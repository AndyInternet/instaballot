import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Help = () => {
  return (
    <Box>
      <Typography variant='h2'>How it works</Typography>
      <Typography variant='body1'>
        InstaBallot helps you create and answer questions with the help of your
        social circle.
      </Typography>
      <Typography variant='body1'>
        Creating a new ballot is as easy as:
      </Typography>
      <ol>
        <li>
          select <Link to='/new'>New Ballot</Link> from the menu or the top of
          the home page
        </li>
        <li>Ask your ballot question.</li>
        <li>Create as many answers as you like.</li>
        <li>Share the link with anyone you want to add choices or vote.</li>
      </ol>
      <Typography variant='body1'>
        You can share the link with as many people as you like. Any open choices
        will be filled by the first to respond and anyone with a link can vote.
        Results happen in realtime on your screen.
      </Typography>
      <Typography variant='h2'>FAQ</Typography>
      <Typography variant='body1'>
        <strong>Do I need an account?</strong>
        <br />
        There's no need to create an account, everything is anonymous and your
        browser will remember your ballots, choices and votes. Remember, if you
        clear your browser cache, your history will be lost.
      </Typography>
      <Typography variant='body1'>
        <strong>Why are there ballots on my list that I didn't post?</strong>
        <br />
        Your list is made up of any active ballots that you created, wrote in a
        choice or voted on.
      </Typography>
      <Typography variant='body1'>
        <strong>How long do ballots last?</strong>
        <br />
        Ballots are automatically removed from the system after 24 hours so grab
        screenshots if you want to keep your results.
      </Typography>
      <Typography variant='body1'>
        <strong>Is there a limit to how many people can vote?</strong>
        <br />
        No, you can send the link to anyone and they can vote as long as the
        ballot is active.
      </Typography>
    </Box>
  );
};
