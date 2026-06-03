import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../components/common/Footer/Footer';
import Header from '../components/common/Header/Header';
import BreadcrumbsNav from '../components/common/BreadcrumbsNav/BreadcrumbsNav';
import { useAppContext } from '../context/AppContext';
import Admissions from '../pages/Admissions/Admissions';
import Careers from '../pages/Careers/Careers';
import ContactUs from '../pages/ContactUs/ContactUs';
import Dashboard from '../pages/Dashboard/Dashboard';
import GoverningCouncil from '../pages/GoverningCouncil/GoverningCouncil';
import InstitutionDetailsPage from '../pages/InstitutionDetails/InstitutionDetailsPage';
import Institutions from '../pages/Institutions/Institutions';
import NotFound from '../pages/NotFound/NotFound';
import { getAppTheme } from '../theme/muiTheme';

const AppRoutes = () => {
  const { darkMode } = useAppContext();
  const theme = getAppTheme(darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <BreadcrumbsNav />
          <Box component="main" role="main" sx={{ minHeight: '65vh' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/institutions" element={<Institutions />} />
              <Route path="/institutions/:institutionId" element={<InstitutionDetailsPage />} />
              <Route path="/governing-council" element={<GoverningCouncil />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          <Footer />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppRoutes;
