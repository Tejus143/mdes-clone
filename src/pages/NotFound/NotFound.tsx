import { Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => (
  <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
    <Typography variant="h3">404</Typography>
    <Typography variant="h5">Page not found</Typography>
    <Typography color="text.secondary">
      The page you are looking for does not exist or has been moved.
    </Typography>
    <Button variant="contained" component={RouterLink} to="/">
      Back to Dashboard
    </Button>
  </Stack>
);

export default NotFound;
