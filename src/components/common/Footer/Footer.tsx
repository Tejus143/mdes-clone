import { Box, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ mt: 6, py: 4, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary">
        Mysore Diocesan Educational Society Institution Directory Portal
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Built for transparent access to schools, colleges, admissions, and contacts.
      </Typography>
      <Link href="https://mdes.org" underline="hover" sx={{ mt: 1, display: 'inline-block' }}>
        Official MDES Website
      </Link>
    </Box>
  );
};

export default Footer;
