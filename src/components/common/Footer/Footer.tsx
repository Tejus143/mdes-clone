import { Box, Link, Typography } from '@mui/material';
import { MDES_SITE_INFO } from '../../../utils/constants';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 4,
        px: 2,
        textAlign: 'center',
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: '0 12px 28px rgba(11, 25, 47, 0.12)',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {MDES_SITE_INFO.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {MDES_SITE_INFO.phone} | {MDES_SITE_INFO.email} | {MDES_SITE_INFO.location}
      </Typography>
      <Link href={MDES_SITE_INFO.website} underline="hover" sx={{ mt: 1, display: 'inline-block' }}>
        Official MDES Website
      </Link>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
        {MDES_SITE_INFO.copyright}
      </Typography>
    </Box>
  );
};

export default Footer;
