import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
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

const links = [
  { label: 'Dashboard', to: '/' },
  { label: 'Institutions', to: '/institutions' },
  { label: 'Council', to: '/governing-council' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact-us' },
];

const Header = () => {
  const location = useLocation();
  const { globalSearch, setGlobalSearch, darkMode, toggleDarkMode } = useAppContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AppBar position="sticky" elevation={0} sx={{ backdropFilter: 'blur(6px)' }}>
      <Toolbar sx={{ gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="h6" sx={{ fontFamily: 'Fraunces, serif', mr: 1 }}>
          MDES Directory
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.8, flexGrow: 1 }}>
          {links.map((link) => (
            <Button
              key={link.to}
              color={location.pathname === link.to ? 'secondary' : 'inherit'}
              component={RouterLink}
              to={link.to}
            >
              {link.label}
            </Button>
          ))}
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
            {links.map((link) => (
              <ListItemButton
                key={link.to}
                component={RouterLink}
                to={link.to}
                onClick={() => setMobileOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
