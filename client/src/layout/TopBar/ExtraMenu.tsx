import { Popover } from '@mui/material';
import Box from '@mui/material/Box';
import { InstaBallotDivider } from '../../components/InstaBallotDivider';
import { FingerprintControl } from './FingerprintControl';
import { QrCodeControl } from './QrCodeControl';
import { ThemeControl } from './ThemeControl';

interface Props {
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

export const ExtraMenu = ({ anchorEl, setAnchorEl }: Props) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'extras-menu' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Box sx={{ padding: '16px', minWidth: '320px' }}>
        <FingerprintControl />
        <InstaBallotDivider />
        <ThemeControl />
        <InstaBallotDivider />
        <QrCodeControl />
      </Box>
    </Popover>
  );
};
