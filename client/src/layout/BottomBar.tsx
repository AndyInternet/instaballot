import {
  AddCircleOutline as AddCircleOutlineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  HelpOutline as HelpOutlineIcon,
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isMobileState } from '../state/uiState';

const getRouteValue = (routeKey: string) => {
  const validKeys = ['/', '/new', '/help'];
  if (validKeys.includes(routeKey)) {
    return routeKey;
  }
  return validKeys[0];
};

export default function SimpleBottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useRecoilValue(isMobileState);

  const value = getRouteValue(location.pathname);

  if (!isMobile) return null;

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          const validatedNewValue = getRouteValue(newValue);
          navigate(validatedNewValue);
        }}
      >
        <BottomNavigationAction
          value='/'
          label='Ballots'
          icon={<CheckCircleOutlineIcon />}
        />
        <BottomNavigationAction
          value='/new'
          label='New'
          icon={<AddCircleOutlineIcon />}
        />
        <BottomNavigationAction
          value='/help'
          label='Help'
          icon={<HelpOutlineIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
