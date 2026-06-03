import { Box, CircularProgress, Typography } from '@mui/material';

type LoaderProps = {
  label?: string;
};

const Loader = ({ label = 'Loading data...' }: LoaderProps) => (
  <Box
    role="status"
    aria-live="polite"
    sx={{ display: 'grid', placeItems: 'center', py: 8, gap: 2 }}
  >
    <CircularProgress />
    <Typography color="text.secondary">{label}</Typography>
  </Box>
);

export default Loader;
