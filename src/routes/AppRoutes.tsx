<<<<<<< HEAD
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
=======
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Container, CssBaseline, Fab, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
>>>>>>> origin/main
import Footer from '../components/common/Footer/Footer';
import Header from '../components/common/Header/Header';
import BreadcrumbsNav from '../components/common/BreadcrumbsNav/BreadcrumbsNav';
import QuickInquiryDialog from '../components/common/QuickInquiryDialog/QuickInquiryDialog';
import { useAppContext } from '../context/AppContext';
import Admissions from '../pages/Admissions/Admissions';
import About from '../pages/About/About';
import Careers from '../pages/Careers/Careers';
import ContactUs from '../pages/ContactUs/ContactUs';
import Dashboard from '../pages/Dashboard/Dashboard';
import GoverningCouncil from '../pages/GoverningCouncil/GoverningCouncil';
import InstitutionDetailsPage from '../pages/InstitutionDetails/InstitutionDetailsPage';
import Institutions from '../pages/Institutions/Institutions';
import News from '../pages/News/News';
import NewsDetails from '../pages/News/NewsDetails';
import NotFound from '../pages/NotFound/NotFound';
import Photos from '../pages/Photos/Photos';
import Videos from '../pages/Videos/Videos';
import { getAppTheme } from '../theme/muiTheme';

<<<<<<< HEAD
const SiteContent = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <>
      <Header />
      <Box component="main" role="main" sx={{ minHeight: '65vh' }}>
        {isHome ? (
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        ) : (
          <Container maxWidth="xl" sx={{ py: { xs: 3, md: 6 } }}>
            <BreadcrumbsNav />
=======
const AppRoutes = () => {
  const { darkMode } = useAppContext();
  const theme = getAppTheme(darkMode);
  const [openInquiry, setOpenInquiry] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const phoneLink = 'tel:+918212415333';
  const whatsAppLink = 'https://wa.me/918212415333';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box className="scroll-progress-shell">
          <Box className="scroll-progress-bar" sx={{ width: `${progress}%` }} aria-hidden="true" />
        </Box>
        <Header onInquiryClick={() => setOpenInquiry(true)} />
        <Container maxWidth="xl" sx={{ py: 3, position: 'relative' }}>
          <BreadcrumbsNav />
          <Box component="main" role="main" sx={{ minHeight: '65vh' }}>
>>>>>>> origin/main
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:newsId" element={<NewsDetails />} />
              <Route path="/institutions" element={<Institutions />} />
              <Route path="/institutions/:institutionId" element={<InstitutionDetailsPage />} />
              <Route path="/photos" element={<Photos />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/governing-council" element={<GoverningCouncil />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
<<<<<<< HEAD
          </Container>
        )}
      </Box>
      <Footer />
    </>
  );
};

const AppRoutes = () => {
  const { darkMode } = useAppContext();
  const theme = getAppTheme(darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <SiteContent />
=======
          </Box>
          <Footer />
        </Container>
        <QuickInquiryDialog open={openInquiry} onClose={() => setOpenInquiry(false)} />
        <Box component="a" href={whatsAppLink} target="_blank" rel="noreferrer" className="floating-action floating-whatsapp" aria-label="Chat on WhatsApp">
          <WhatsAppIcon fontSize="medium" />
        </Box>
        <Box component="a" href={phoneLink} className="floating-action floating-call" aria-label="Call now" sx={{ display: { xs: 'flex', md: 'none' } }}>
          <PhoneAndroidIcon />
        </Box>
        <Fab className="floating-action back-to-top" color="secondary" size="small" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <KeyboardArrowUpIcon />
        </Fab>
>>>>>>> origin/main
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppRoutes;
