import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { Box, Typography } from '@mui/material';

type EmptyStateProps = {
  title?: string;
  description?: string;
};

const EmptyState = ({
  title = 'No results found',
  description = 'Try updating your filters or search terms.',
}: EmptyStateProps) => {
  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{ textAlign: 'center', py: 10, color: 'text.secondary' }}
    >
      <InboxOutlinedIcon sx={{ fontSize: 56, mb: 1 }} aria-hidden="true" />
      <Typography variant="h6" color="text.primary">
        {title}
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
  );
};

export default EmptyState;
