import Box from '@mui/material/Box';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

interface Props extends CircularProgressProps {
  value: number;
  loading?: boolean;
}

export const CircularProgressWithLabel = (props: Props) => {
  const { value, loading } = props;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant={loading ? 'indeterminate' : 'determinate'}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          component='div'
          color='text.secondary'
          sx={{ fontSize: '10px' }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};
