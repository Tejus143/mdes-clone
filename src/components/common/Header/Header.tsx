import CloseIcon from '@mui/icons-material/Close';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import { MDES_MENU_LINKS, MDES_SITE_INFO } from '../../../utils/constants';

const isActiveLink = (pathname: string, to?: string) => (to ? pathname === to : false);

const Header = () => {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickAccessOpen, setQuickAccessOpen] = useState(false);

  return (
    <AppBar position="sticky" elevation={0} sx={{ backdropFilter: 'blur(6px)' }}>
      <Toolbar
        variant="dense"
        sx={{
          justifyContent: 'space-between',
          bgcolor: 'primary.dark',
          minHeight: '36px',
          px: { xs: 1, md: 2 },
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <PhoneOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">{MDES_SITE_INFO.phone}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
            <EmailOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">{MDES_SITE_INFO.email}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption">{MDES_SITE_INFO.location}</Typography>
        </Stack>
      </Toolbar>

      <Toolbar sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between', py: 0.5 }}>
        <Typography
          variant="h6"
          noWrap
          sx={{
            maxWidth: { xs: '58vw', md: '70ch' },
            fontFamily: 'Bitter, serif',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            pr: 1,
          }}
        >
          {MDES_SITE_INFO.name}
        </Typography>

        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => setQuickAccessOpen(true)}
            sx={{ display: { xs: 'none', md: 'inline-flex' } }}
          >
            Quick Access
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component="a"
            href={MDES_SITE_INFO.admissionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: { xs: 'none', md: 'inline-flex' } }}
          >
            Admissions Open
          </Button>
          <IconButton onClick={toggleDarkMode} color="inherit" aria-label="toggle dark mode">
            {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
          <IconButton color="inherit" aria-label="open menu" onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Stack>
      </Toolbar>

      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ width: { xs: 280, sm: 320 }, p: 1.5 }} role="navigation" aria-label="site navigation">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 1, pb: 1 }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton color="inherit" aria-label="close menu" onClick={() => setMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <List>
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
        </Box>
      </Drawer>

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
