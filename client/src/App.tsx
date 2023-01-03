import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataLoader } from './helpers/DataLoader';
import { IsMobile } from './helpers/IsMobile';
import { ThemeManager } from './helpers/ThemeManager';
import BottomBar from './layout/BottomBar';
import { TopBar } from './layout/TopBar';
import { Ballots } from './views/Ballots';
import { Help } from './views/Help';
import { NewQuestion } from './views/NewQuestion';
import { NoMatch } from './views/NoMatch';

export const App = () => {
  return (
    <Router>
      <DataLoader />
      <IsMobile />
      <ThemeManager>
        <Container sx={{ paddingTop: '64px', paddingBottom: '64px' }}>
          <TopBar />
          <Routes>
            <Route path='/' element={<Ballots />} />
            <Route path='new' element={<NewQuestion />} />
            <Route path='help' element={<Help />} />
            <Route path='*' element={<NoMatch />} />
          </Routes>
          <BottomBar />
        </Container>
      </ThemeManager>
    </Router>
  );
};
