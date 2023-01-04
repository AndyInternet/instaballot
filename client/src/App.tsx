import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Helpers } from './components/Helpers';
import { ThemeManager } from './components/Helpers/ThemeManager';
import BottomBar from './layout/BottomBar';
import { TopBar } from './layout/TopBar';
import { Ballot } from './views/Ballot';
import { Ballots } from './views/Ballots';
import { Help } from './views/Help';
import { NewQuestion } from './views/NewQuestion';
import { NoMatch } from './views/NoMatch';

export const App = () => {
  return (
    <Router>
      <Helpers />
      <ThemeManager>
        <Container
          maxWidth='md'
          sx={{ paddingTop: '80px', paddingBottom: '80px' }}
        >
          <TopBar />
          <Routes>
            <Route index path='/' element={<Ballots />} />
            <Route path='new' element={<NewQuestion />} />
            <Route path='help' element={<Help />} />
            <Route path='/ballot/:id' element={<Ballot />} />
            <Route path='*' element={<NoMatch />} />
          </Routes>
          <BottomBar />
        </Container>
      </ThemeManager>
    </Router>
  );
};
