import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Stack,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { useAppContext } from '../../../context/AppContext';
import { MDES_MENU_LINKS, MDES_SITE_INFO } from '../../../utils/constants';

const isActiveLink = (pathname: string, to?: string) => (to ? pathname === to : false);

const Header = () => {
  const location = useLocation();
  const { globalSearch, setGlobalSearch, darkMode, toggleDarkMode } = useAppContext();
  const [mobileOpen, setMobileOpen] = useState(false);

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

      <Toolbar sx={{ gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="h6" sx={{ fontFamily: 'Fraunces, serif', mr: 1 }}>
          {MDES_SITE_INFO.name}
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.8, flexGrow: 1 }}>
          {MDES_MENU_LINKS.map((link) =>
            'to' in link ? (
              <Button
                key={link.label}
                color={isActiveLink(location.pathname, link.to) ? 'secondary' : 'inherit'}
                component={RouterLink}
                to={link.to}
              >
                {link.label}
              </Button>
            ) : (
              <Button
                key={link.label}
                color="inherit"
                component="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </Button>
            ),
          )}
        </Box>

        <Box sx={{ minWidth: { xs: '100%', md: 280 }, flexGrow: { xs: 1, md: 0 } }}>
          <SearchBar
            value={globalSearch}
            onChange={setGlobalSearch}
            label="Global search"
            placeholder="Search institutions by name, district, category"
          />
        </Box>

        <Stack direction="row" spacing={0.5}>
          <Button
            variant="contained"
            color="secondary"
            component="a"
            href={MDES_SITE_INFO.admissionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: { xs: 'none', md: 'inline-flex' } }}
          >
            ADMISSIONS OPEN Click Here
          </Button>
          <IconButton onClick={toggleDarkMode} color="inherit" aria-label="toggle dark mode">
            {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
          <IconButton
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
            color="inherit"
            aria-label="open menu"
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
      </Toolbar>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 260 }} role="navigation" aria-label="mobile navigation">
          <List>
            {MDES_MENU_LINKS.map((link) =>
              'to' in link ? (
                <ListItemButton
                  key={link.label}
                  component={RouterLink}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
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
                  onClick={() => setMobileOpen(false)}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              ),
            )}
            <ListItemButton
              component="a"
              href={MDES_SITE_INFO.admissionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText primary="ADMISSIONS OPEN Click Here" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
