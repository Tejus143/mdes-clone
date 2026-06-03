import CloseIcon from '@mui/icons-material/Close';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import { MDES_MENU_LINKS, MDES_SITE_INFO } from '../../../utils/constants';

type HeaderProps = {
  onInquiryClick: () => void;
};

const isActiveLink = (pathname: string, to?: string) => (to ? pathname === to : false);

const Header = ({ onInquiryClick }: HeaderProps) => {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickAccessOpen, setQuickAccessOpen] = useState(false);

  const phoneHref = `tel:+918212415333`;
  const mailHref = `mailto:${MDES_SITE_INFO.email}`;
  const whatsappHref = 'https://wa.me/918212415333';

  return (
    <AppBar position="sticky" elevation={0} sx={{ backdropFilter: 'blur(6px)' }}>
      <Toolbar
        variant="dense"
        sx={{
          justifyContent: 'space-between',
          bgcolor: 'primary.dark',
          minHeight: '42px',
          px: { xs: 1, md: 2 },
          flexWrap: 'wrap',
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <Button component="a" href={phoneHref} sx={{ color: 'common.white', typography: 'caption', px: 0 }}>
            <PhoneOutlinedIcon sx={{ fontSize: 16, mr: 0.5 }} />
            {MDES_SITE_INFO.phone}
          </Button>
          <Button component="a" href={mailHref} sx={{ color: 'common.white', typography: 'caption', px: 0, display: { xs: 'none', sm: 'inline-flex' } }}>
            <EmailOutlinedIcon sx={{ fontSize: 16, mr: 0.5 }} />
            {MDES_SITE_INFO.email}
          </Button>
          <Button component="a" href={whatsappHref} target="_blank" rel="noopener noreferrer" sx={{ color: 'common.white', typography: 'caption', px: 0 }}>
            <WhatsAppIcon sx={{ fontSize: 16, mr: 0.5 }} />
            WhatsApp
          </Button>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" color="inherit" aria-label="Facebook" sx={{ color: 'common.white' }}>
            <FacebookIcon sx={{ fontSize: 18 }} />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" color="inherit" aria-label="Instagram" sx={{ color: 'common.white' }}>
            <InstagramIcon sx={{ fontSize: 18 }} />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" color="inherit" aria-label="LinkedIn" sx={{ color: 'common.white' }}>
            <LinkedInIcon sx={{ fontSize: 18 }} />
          </Link>
          <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" color="inherit" aria-label="YouTube" sx={{ color: 'common.white' }}>
            <YouTubeIcon sx={{ fontSize: 18 }} />
          </Link>
        </Stack>
      </Toolbar>

      <Toolbar
        sx={{
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 0.75,
          px: { xs: 1.5, md: 2.5 },
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
          flexWrap: 'wrap',
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            textDecoration: 'none',
            color: 'inherit',
            minWidth: 0,
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src="https://mdes.in/wp-content/themes/MDES/images/logo.png"
            alt="MDES Logo"
            sx={{ height: { xs: 46, md: 58 }, width: 'auto', flexShrink: 0 }}
          />
        </Box>

        <Stack
          direction="row"
          spacing={{ xs: 0.5, md: 1.5 }}
          sx={{
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            flex: 1,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          {MDES_MENU_LINKS.map((link) =>
            'to' in link ? (
              <Button
                key={link.label}
                component={RouterLink}
                to={link.to}
                color={isActiveLink(location.pathname, link.to) ? 'secondary' : 'inherit'}
                sx={{ fontWeight: 700, px: 1.2, minWidth: 'auto' }}
              >
                {link.label}
              </Button>
            ) : (
              <Button
                key={link.label}
                component="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                sx={{ fontWeight: 700, px: 1.2, minWidth: 'auto' }}
              >
                {link.label}
              </Button>
            ),
          )}
        </Stack>

        <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="secondary"
            component="a"
            href={MDES_SITE_INFO.admissionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              borderRadius: 999,
              px: 2.2,
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            Apply Now
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={onInquiryClick}
            sx={{ borderRadius: 999, px: 2.2, fontWeight: 700, whiteSpace: 'nowrap' }}
          >
            Quick Inquiry
          </Button>
          <IconButton onClick={toggleDarkMode} color="inherit" aria-label="toggle dark mode" sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
            {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open menu"
            aria-expanded={menuOpen}
            aria-controls="header-menu-panel"
            onClick={() => setMenuOpen((prev) => !prev)}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
      </Toolbar>

      <Collapse in={menuOpen} timeout="auto" unmountOnExit>
        <Paper
          id="header-menu-panel"
          square
          elevation={3}
          sx={{
            mx: { xs: 1, md: 2 },
            mb: 1,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1.25 }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton color="inherit" aria-label="close menu" onClick={() => setMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
          <List sx={{ py: 0 }}>
            {MDES_MENU_LINKS.map((link) =>
              'to' in link ? (
                <ListItemButton
                  key={link.label}
                  component={RouterLink}
                  selected={isActiveLink(location.pathname, link.to)}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              ) : (
                <ListItemButton
                  key={link.label}
                  component="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              ),
            )}
            <ListItemButton
              onClick={() => {
                setMenuOpen(false);
                setQuickAccessOpen(true);
              }}
            >
              <ListItemText primary="Open Quick Access" />
            </ListItemButton>
            <ListItemButton
              component="a"
              href={MDES_SITE_INFO.admissionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <ListItemText primary="Admissions Open" />
            </ListItemButton>
          </List>
        </Paper>
      </Collapse>

      <Dialog open={quickAccessOpen} onClose={() => setQuickAccessOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Quick Access</DialogTitle>
        <DialogContent>
          <Stack spacing={1.2} sx={{ mt: 0.5 }}>
            <Button component={RouterLink} to="/about" onClick={() => setQuickAccessOpen(false)}>
              About MDES
            </Button>
            <Button component={RouterLink} to="/institutions" onClick={() => setQuickAccessOpen(false)}>
              Institutions
            </Button>
            <Button component={RouterLink} to="/news" onClick={() => setQuickAccessOpen(false)}>
              Latest News
            </Button>
            <Button component={RouterLink} to="/contact" onClick={() => setQuickAccessOpen(false)}>
              Contact
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuickAccessOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
