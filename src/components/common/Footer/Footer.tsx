import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Box, Button, Container, Divider, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { MDES_MENU_LINKS, MDES_SITE_INFO } from '../../../utils/constants';

const Footer = () => (
  <Box component="footer" sx={{ mt: 10, bgcolor: '#071f3d', color: 'common.white' }}>
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 9 } }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.5fr .8fr 1fr' }, gap: { xs: 5, md: 8 } }}>
        <Box>
          <Box
            component="img"
            src="https://mdes.in/wp-content/themes/MDES/images/logo.png"
            alt="Mysore Diocesan Educational Society logo"
            sx={{ height: { xs: 64, md: 76 }, maxWidth: '100%', objectFit: 'contain', objectPosition: 'left', mb: 2 }}
          />
          <Typography variant="h4" sx={{ maxWidth: 480 }}>Education rooted in values, shaped for tomorrow.</Typography>
          <Typography sx={{ mt: 2, maxWidth: 520, color: 'rgba(255,255,255,.62)', lineHeight: 1.8 }}>
            Mysore Diocesan Educational Society nurtures excellence, character, and service across its family of institutions.
          </Typography>
          <Button component={RouterLink} to="/admissions" variant="contained" color="secondary" endIcon={<ArrowForwardIcon />} sx={{ mt: 3 }}>Begin admission</Button>
        </Box>
        <Box>
          <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: 2 }}>Quick Links</Typography>
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {MDES_MENU_LINKS.slice(0, 6).map((link) => 'to' in link ? (
              <Link key={link.label} component={RouterLink} to={link.to} color="inherit" underline="none">{link.label}</Link>
            ) : null)}
          </Stack>
        </Box>
        <Box>
          <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: 2 }}>Get In Touch</Typography>
          <Stack spacing={2} sx={{ mt: 2, color: 'rgba(255,255,255,.72)' }}>
            <Stack direction="row" spacing={1.2}><PhoneOutlinedIcon color="secondary" /><Typography>{MDES_SITE_INFO.phone}</Typography></Stack>
            <Stack direction="row" spacing={1.2}><EmailOutlinedIcon color="secondary" /><Typography>{MDES_SITE_INFO.email}</Typography></Stack>
            <Stack direction="row" spacing={1.2}><LocationOnOutlinedIcon color="secondary" /><Typography>{MDES_SITE_INFO.quickContactAddress}</Typography></Stack>
          </Stack>
        </Box>
      </Box>
      <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,.12)' }} />
      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,.48)' }}>{MDES_SITE_INFO.copyright}. All rights reserved.</Typography>
    </Container>
  </Box>
);

export default Footer;
