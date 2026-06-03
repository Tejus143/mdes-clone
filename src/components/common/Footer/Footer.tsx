import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Button, Divider, IconButton, Link, Stack, TextField, Typography } from '@mui/material';
import { MDES_SITE_INFO } from '../../../utils/constants';

const Footer = () => {
  return (
    <Box component="footer" sx={{ mt: 8, py: 6, px: { xs: 3, md: 6 }, bgcolor: 'background.paper', color: 'text.primary' }}>
      <Stack spacing={4}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={4}>
          <Box sx={{ maxWidth: 360 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 800 }}>
              {MDES_SITE_INFO.name}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Empowering students across Karnataka with faith-based higher education, career pathways, and campus success.
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOnOutlinedIcon fontSize="small" />
                <Typography variant="body2">{MDES_SITE_INFO.quickContactAddress}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PhoneOutlinedIcon fontSize="small" />
                <Link href={`tel:${MDES_SITE_INFO.phone.replace(/\s+/g, '')}`} color="inherit" underline="hover">
                  {MDES_SITE_INFO.phone}
                </Link>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <EmailOutlinedIcon fontSize="small" />
                <Link href={`mailto:${MDES_SITE_INFO.email}`} color="inherit" underline="hover">
                  {MDES_SITE_INFO.email}
                </Link>
              </Stack>
            </Stack>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} sx={{ flex: 1, justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Link href="/" color="inherit" underline="hover">
                  Home
                </Link>
                <Link href="/institutions" color="inherit" underline="hover">
                  Institutions
                </Link>
                <Link href="/admissions" color="inherit" underline="hover">
                  Admissions
                </Link>
                <Link href="/news" color="inherit" underline="hover">
                  News & Events
                </Link>
                <Link href="/contact" color="inherit" underline="hover">
                  Contact Us
                </Link>
              </Stack>
            </Box>

            <Box sx={{ maxWidth: 340 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
                Newsletter
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Get monthly updates on programs, admissions, and campus initiatives.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} component="form" noValidate>
                <TextField placeholder="Enter your email" size="small" fullWidth sx={{ bgcolor: 'background.default', borderRadius: 2 }} />
                <Button variant="contained" color="secondary" sx={{ whiteSpace: 'nowrap' }}>
                  Subscribe
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Stack>

        <Box sx={{ width: '100%', borderRadius: 3, overflow: 'hidden', minHeight: 210, boxShadow: '0 24px 64px rgba(16, 50, 106, 0.12)' }}>
          <iframe
            title="MDES Mysuru campus location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.28040227506!2d76.61465007535622!3d12.307448191145574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7b36bbc9b0a3%3A0x76788fc99759fa12!2sMysuru%20Diocese!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="220"
            style={{ border: 0 }}
            loading="lazy"
            aria-hidden="false"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>

        <Divider sx={{ borderColor: 'divider' }} />

        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="caption" color="text.secondary">
            {MDES_SITE_INFO.copyright}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton component="a" href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </IconButton>
            <IconButton component="a" href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton component="a" href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </IconButton>
            <IconButton component="a" href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <YouTubeIcon />
            </IconButton>
            <IconButton component="a" href="https://wa.me/918212415333" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <WhatsAppIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
