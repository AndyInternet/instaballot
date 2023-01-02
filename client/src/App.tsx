import { Help } from '@mui/icons-material';
import { Container } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Init } from './helpers/Init';
import { IsMobile } from './helpers/IsMobile';
import { ThemeManager } from './helpers/ThemeManager';
import BottomBar from './layout/BottomBar';
import { TopBar } from './layout/TopBar';
import { Ballots } from './views/Ballots';
import { NewQuestion } from './views/NewQuestion';
import { NoMatch } from './views/NoMatch';

export const App = () => {
  return (
    <Router>
      <>
        <Init />
        <IsMobile />
        <ThemeManager>
          <Container>
            <TopBar />
            <Routes>
              <Route path='/' element={<Ballots />}>
                <Route index element={<Ballots />} />
                <Route path='new' element={<NewQuestion />} />
                <Route path='help' element={<Help />} />
                <Route path='*' element={<NoMatch />} />
              </Route>
            </Routes>
            <BottomBar />
          </Container>
        </ThemeManager>
      </>
    </Router>
  );
};
