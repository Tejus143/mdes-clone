<<<<<<< HEAD
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import { Alert, Box, Button, Card, CardContent, Container, MenuItem, Stack, TextField, Typography } from '@mui/material';
=======
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DomainIcon from '@mui/icons-material/Domain';
import EventIcon from '@mui/icons-material/Event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
>>>>>>> origin/main
import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import stJosephImage from '../../assets/st-joseph-child-jesus.png';
import Loader from '../../components/common/Loader/Loader';
import { institutionService } from '../../services/institutionService';
import { latestNewsService } from '../../services/latestNewsService';
import { officialMdesService } from '../../services/officialMdesService';
import type { Institution } from '../../types/Institution';
import type { NewsItem } from '../../types/NewsItem';
<<<<<<< HEAD
import { DISTRICTS } from '../../utils/constants';

const programmeImages = [
  'https://mdes.in/wp-content/uploads/2022/12/gall4.jpg',
  'https://mdes.in/wp-content/uploads/2022/12/gall1.jpg',
  'https://mdes.in/wp-content/uploads/2022/12/gall3.jpg',
];

const programmes = [
  ['Schools', 'Strong foundations for curious, confident, and compassionate young learners.'],
  ['Colleges', 'Purposeful higher education that prepares students for work, leadership, and life.'],
  ['Beyond Academics', 'Opportunities in service, culture, sport, and leadership that shape the whole person.'],
];

const admissionSteps = [
  ['Initial enquiry', 'Tell us what you are looking for and our team will help you identify the right institution.'],
  ['Meet the institution', 'Connect directly with the institution to understand programmes, eligibility, and campus life.'],
  ['Complete application', 'Submit the required details and begin your journey as part of the MDES community.'],
=======

const timelineSteps = [
  { label: 'Enquire', description: 'Start with a personal inquiry and receive counselling.' },
  { label: 'Apply', description: 'Fill your admission form with clear guidance.' },
  { label: 'Interview', description: 'Attend a quick assessment and campus tour.' },
  { label: 'Enroll', description: 'Secure your seat and download all documents.' },
];

const achievements = [
  { title: '94% Student Success Rate', description: 'Consistent academic excellence across institutions.' },
  { title: '120+ Campus Awards', description: 'Recognized for culture, sports and community impact.' },
  { title: '1200+ Placements', description: 'Strong campus recruitment and employer connections.' },
  { title: '60+ Years of Legacy', description: 'A trusted education network rooted in faith and values.' },
];

const testimonials = [
  {
    quote: 'MDES shaped my career with exceptional mentorship and campus opportunities.',
    author: 'Asha R., Alumni',
  },
  {
    quote: 'The learning environment is modern, supportive, and deeply inspiring.',
    author: 'Rohit K., Current Student',
  },
  {
    quote: 'Placements were seamless and the campus life felt welcoming from day one.',
    author: 'Leena S., Graduate',
  },
];

const eventHighlights = [
  { title: 'Innovation Summit', date: 'June 2026', caption: 'Celebrating student-led projects and real-world research.' },
  { title: 'Heritage Week', date: 'July 2026', caption: 'Cultural exchange, arts showcases, and community service.' },
  { title: 'Career Connect', date: 'August 2026', caption: 'Employer outreach, workshops, and placement readiness.' },
];

const partnerLogos = ['IIM', 'NEP', 'AICTE', 'UGC', 'Karnataka Govt', 'Industry Connect'];

const galleryItems = [
  'Campus life under the banyan tree',
  'Science labs and research hubs',
  'Sports and wellness center',
  'Community leadership workshops',
>>>>>>> origin/main
];

const Dashboard = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [bannerUrl, setBannerUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animatedCounts, setAnimatedCounts] = useState({ total: 0, schools: 0, colleges: 0, districts: 0 });

  useEffect(() => {
    const load = async () => {
      try {
<<<<<<< HEAD
        const [data, resolvedBannerUrl, newsItems] = await Promise.all([
=======
        setLoading(true);
        const [data, resolvedBannerUrl, latestNews] = await Promise.all([
>>>>>>> origin/main
          institutionService.getInstitutions(),
          officialMdesService.getPrimaryBannerUrl(),
          latestNewsService.getLatestNews(),
        ]);
        setInstitutions(data);
        setBannerUrl(resolvedBannerUrl);
<<<<<<< HEAD
        setNews(newsItems.slice(0, 3));
      } catch {
        setError('Unable to load homepage information.');
=======
        setNews(latestNews);
      } catch {
        setError('Unable to load enhanced homepage data.');
>>>>>>> origin/main
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const stats = useMemo(() => ({
    institutions: institutions.length,
    schools: institutions.filter((item) => item.category === 'School').length,
    colleges: institutions.filter((item) => item.category === 'College').length,
    districts: DISTRICTS.length - 1,
  }), [institutions]);

<<<<<<< HEAD
  if (loading) return <Box sx={{ py: 10 }}><Loader label="Loading MDES homepage..." /></Box>;
  if (error) return <Container sx={{ py: 6 }}><Alert severity="error">{error}</Alert></Container>;

  return (
    <Box>
=======
  useEffect(() => {
    if (loading) return;
    let animationFrame: number;
    const start = performance.now();
    const duration = 900;

    const animate = (timestamp: number) => {
      const progress = Math.min(1, (timestamp - start) / duration);
      setAnimatedCounts({
        total: Math.round(stats.total * progress),
        schools: Math.round(stats.schools * progress),
        colleges: Math.round(stats.colleges * progress),
        districts: Math.round(stats.districts * progress),
      });

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [loading, stats]);

  if (loading) return <Loader label="Preparing a premium admissions experience..." />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Stack spacing={6}>
>>>>>>> origin/main
      <Box
        component="section"
        sx={{
<<<<<<< HEAD
          minHeight: { xs: 660, md: 720 },
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          color: 'common.white',
          backgroundImage: `linear-gradient(90deg, rgba(3,18,37,.9) 0%, rgba(3,18,37,.62) 50%, rgba(3,18,37,.2) 100%), url("${bannerUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ maxWidth: 760, pb: { xs: 16, md: 4 } }}>
            <Typography variant="overline" sx={{ color: 'secondary.light', letterSpacing: 3 }}>Mysore Diocesan Educational Society</Typography>
            <Typography variant="h1" sx={{ mt: 1, fontSize: { xs: '3.5rem', md: '6.5rem' } }}>
              Beyond learning,<br />towards purpose.
            </Typography>
            <Typography sx={{ mt: 2.5, maxWidth: 590, color: 'rgba(255,255,255,.76)', fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8 }}>
              We nurture knowledge, character, courage, and service so every learner can shape a meaningful future.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4, alignItems: { xs: 'stretch', sm: 'center' } }}>
              <Button component={RouterLink} to="/institutions" variant="contained" color="secondary" endIcon={<ArrowForwardIcon />}>Discover MDES</Button>
              <Button component={RouterLink} to="/about" variant="outlined" sx={{ color: 'common.white', borderColor: 'rgba(255,255,255,.6)' }}>Our legacy</Button>
            </Stack>
          </Box>
        </Container>
        <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: { xs: '100%', md: 420 }, bgcolor: 'secondary.main', color: '#071f3d', p: { xs: 2.5, md: 4 } }}>
          <Typography variant="overline" sx={{ letterSpacing: 2, fontWeight: 700 }}>Admissions Open</Typography>
          <Typography variant="h4" sx={{ mt: .5 }}>Find your institution</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <TextField select fullWidth size="small" defaultValue="" label="Choose institution" sx={{ bgcolor: 'common.white' }}>
              {institutions.slice(0, 8).map((institution) => <MenuItem key={institution.id} value={institution.id}>{institution.name}</MenuItem>)}
            </TextField>
            <Button component={RouterLink} to="/admissions" variant="contained" sx={{ bgcolor: '#071f3d', color: 'common.white', '&:hover': { bgcolor: '#0d315c' } }}>Apply</Button>
=======
          position: 'relative',
          pt: { xs: 6, md: 10 },
          pb: { xs: 6, md: 8 },
          minHeight: { xs: '70vh', md: '78vh' },
          overflow: 'hidden',
          borderRadius: 4,
          backgroundImage: bannerUrl
            ? `linear-gradient(180deg, rgba(7, 23, 53, 0.72) 0%, rgba(7, 23, 53, 0.6) 55%), url(${bannerUrl})`
            : 'linear-gradient(135deg, rgba(5, 71, 122, 0.9), rgba(41, 113, 178, 0.75))',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          color: 'common.white',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(255,255,255,0.12), transparent 24%)', opacity: 0.9 }} />
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: { xs: '100%', md: '62%' }, px: { xs: 3, md: 6 } }}>
          <Chip label="Admissions 2026" color="secondary" sx={{ mb: 3, fontWeight: 700 }} />
          <Typography variant="h2" component="h1" sx={{ fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, mb: 3 }}>
            Discover inspiring programs, campus life, and modern learning at MDES.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 620, color: 'rgba(255,255,255,0.84)' }}>
            Explore best-in-class programs, campus life, strategic employer ties, and global accreditation across the MDES education network.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button variant="contained" color="secondary" size="large" href="https://mdesinstitutions.com/preadmission_Online/" target="_blank" rel="noopener noreferrer">
              Apply Now
            </Button>
            <Button variant="outlined" color="inherit" size="large" onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
              Explore Programs
            </Button>
>>>>>>> origin/main
          </Stack>
        </Box>
      </Box>

<<<<<<< HEAD
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 13 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 5, md: 10 }, alignItems: 'center' }}>
          <Box sx={{ position: 'relative', pr: { md: 5 }, pb: { md: 5 } }}>
            <Box component="img" src={stJosephImage} alt="Saint Joseph holding the child Jesus" sx={{ width: '100%', height: { xs: 340, md: 560 }, objectFit: 'contain', bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0d2138' : '#fffaf3', display: 'block' }} />
            <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', right: 0, bottom: 0, bgcolor: 'secondary.main', color: '#071f3d', p: 3.5, width: 200 }}>
              <Typography variant="h3">Values</Typography>
              <Typography variant="overline" sx={{ letterSpacing: 2 }}>at our core</Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: 3 }}>History & Legacy</Typography>
            <Typography variant="h2" sx={{ mt: 1, fontSize: { xs: '3rem', md: '4.6rem' } }}>Education that forms the whole person.</Typography>
            <Typography color="text.secondary" sx={{ mt: 2.5, lineHeight: 1.9 }}>
              MDES brings together a family of institutions committed to inclusive, value-based quality education. Our learners are encouraged to pursue academic excellence while growing in empathy, confidence, and responsibility.
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2, lineHeight: 1.9 }}>
              Rooted in service and open to innovation, we create environments where every learner is respected, cared for, and enabled to lead.
            </Typography>
            <Button component={RouterLink} to="/about" endIcon={<ArrowForwardIcon />} sx={{ mt: 3, px: 0 }}>Read our story</Button>
          </Box>
        </Box>
      </Container>

      <Box sx={{ bgcolor: '#071f3d', color: 'common.white', py: { xs: 7, md: 9 } }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
            {[
              ['Institutions', stats.institutions],
              ['Schools', stats.schools],
              ['Colleges', stats.colleges],
              ['Districts', stats.districts],
            ].map(([label, value]) => (
              <Box key={label} sx={{ textAlign: 'center', py: 2, borderRight: { md: '1px solid rgba(255,255,255,.14)' } }}>
                <Typography variant="h2" sx={{ color: 'secondary.main', fontSize: { xs: '3rem', md: '4.5rem' } }}>{value}</Typography>
                <Typography variant="overline" sx={{ letterSpacing: 2, color: 'rgba(255,255,255,.62)' }}>{label}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 13 } }}>
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: 6 }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: 3 }}>Discover Our Community</Typography>
          <Typography variant="h2" sx={{ mt: 1, fontSize: { xs: '3rem', md: '4.5rem' } }}>A place to learn, grow, and contribute.</Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
          {programmes.map(([title, description], index) => (
            <Card key={title} sx={{ position: 'relative', height: 500, color: 'common.white', overflow: 'hidden', border: 0 }}>
              <Box component="img" src={programmeImages[index]} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s ease', '.MuiCard-root:hover &': { transform: 'scale(1.04)' } }} />
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(3,18,37,.94), rgba(3,18,37,.05) 70%)' }} />
              <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, p: 3.5 }}>
                <Typography variant="h3">{title}</Typography>
                <Typography sx={{ mt: 1, color: 'rgba(255,255,255,.7)', lineHeight: 1.7 }}>{description}</Typography>
                <Button component={RouterLink} to={index === 2 ? '/photos' : '/institutions'} sx={{ mt: 2, px: 0, color: 'secondary.light' }} endIcon={<ArrowForwardIcon />}>Explore</Button>
              </Box>
            </Card>
          ))}
        </Box>
      </Container>

      <Box sx={{ bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0a1b2f' : '#f1ede4', color: 'text.primary', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '.8fr 1.2fr' }, gap: { xs: 5, md: 10 } }}>
            <Box>
              <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: 3 }}>How To Apply</Typography>
              <Typography variant="h2" sx={{ mt: 1, fontSize: { xs: '3rem', md: '4.5rem' } }}>A clear path to your next chapter.</Typography>
              <Button
                component={RouterLink}
                to="/admissions"
                variant="contained"
                sx={{
                  mt: 3,
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'secondary.main' : 'primary.main',
                  color: (theme) => theme.palette.mode === 'dark' ? '#071f3d' : 'common.white',
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Admission details
              </Button>
            </Box>
            <Stack>
              {admissionSteps.map(([title, description], index) => (
                <Box key={title} sx={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 2, py: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="h3" color="secondary.main">0{index + 1}</Typography>
                  <Box><Typography variant="h5">{title}</Typography><Typography color="text.secondary" sx={{ mt: .7, lineHeight: 1.7 }}>{description}</Typography></Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'end' }} spacing={2} sx={{ mb: 4 }}>
          <Box><Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: 3 }}>Latest From MDES</Typography><Typography variant="h2" sx={{ fontSize: { xs: '3rem', md: '4rem' } }}>News & notices</Typography></Box>
          <Button component={RouterLink} to="/news" endIcon={<ArrowForwardIcon />}>View all</Button>
        </Stack>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
          {news.map((item, index) => (
            <Card key={item.id}>
              {item.imageUrl ? <Box component="img" src={item.imageUrl} alt={item.title} sx={{ width: '100%', height: 230, objectFit: 'cover' }} /> : null}
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center" color="secondary.main"><CampaignOutlinedIcon fontSize="small" /><Typography variant="overline">{index === 0 ? 'Latest update' : new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</Typography></Stack>
                <Typography variant="h4" sx={{ mt: 1 }}>{item.title}</Typography>
                <Button component={RouterLink} to={`/news/${item.id}`} sx={{ mt: 2, px: 0 }} endIcon={<ArrowForwardIcon />}>Read more</Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
=======
      <Box component="section" sx={{ py: 1 }}>
        <Grid container spacing={2}>
          {[
            { label: 'Institutions', value: animatedCounts.total, icon: <DomainIcon />, highlight: 'network' },
            { label: 'Schools', value: animatedCounts.schools, icon: <SchoolIcon />, highlight: 'campuses' },
            { label: 'Colleges', value: animatedCounts.colleges, icon: <BusinessCenterIcon />, highlight: 'departments' },
            { label: 'Districts', value: animatedCounts.districts, icon: <EventIcon />, highlight: 'regions' },
          ].map((item) => (
            <Grid key={item.label} item xs={12} sm={6} md={3}>
              <Card sx={{ minHeight: 180, px: 2, py: 3, overflow: 'hidden' }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {item.label}
                    </Typography>
                    <Box sx={{ color: 'secondary.main' }}>{item.icon}</Box>
                  </Stack>
                  <Typography variant="h3" sx={{ lineHeight: 1 }}>
                    {item.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {item.highlight} powering campus excellence.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={12} lg={7}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" sx={{ mb: 1, fontWeight: 800 }}>
                Campus achievements and success stories
              </Typography>
              <Typography color="text.secondary">
                Discover how MDES institutions drive student results with modern curriculum, holistic support, and industry partnerships.
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {achievements.map((achievement) => (
                <Grid item xs={12} sm={6} key={achievement.title}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                        {achievement.title}
                      </Typography>
                      <Typography color="text.secondary">{achievement.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3, background: 'linear-gradient(135deg, rgba(21,101,192,0.96), rgba(85,90,250,0.95))', color: 'common.white' }}>
            <Box>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 800 }}>
                Student & alumni highlights
              </Typography>
              <Typography sx={{ mb: 3, color: 'rgba(255,255,255,0.84)' }}>
                Real student journeys, placement wins, and campus stories that show why MDES is a premier choice for modern education.
              </Typography>
              <Stack spacing={2}>
                {testimonials.slice(0, 2).map((testimonial) => (
                  <Box key={testimonial.author}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                      “{testimonial.quote}”
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.72)">
                      {testimonial.author}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Box>
              <Button component={Link} href="/contact" variant="outlined" color="inherit" sx={{ borderColor: 'rgba(255,255,255,0.7)', color: 'common.white' }}>
                Connect with campus advisors
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Box component="section">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 800 }}>
          Latest news & event highlights
        </Typography>
        <Grid container spacing={3}>
          {news.slice(0, 3).map((article) => (
            <Grid item xs={12} md={4} key={article.id}>
              <Card sx={{ minHeight: 240, display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    {new Date(article.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                    {article.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {article.excerpt}
                  </Typography>
                </CardContent>
                <Box sx={{ px: 3, pb: 3 }}>
                  <Button component="a" href={article.sourceUrl} target="_blank" rel="noreferrer" endIcon={<ChevronRightIcon />}>
                    Read More
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>
              Admission process timeline
            </Typography>
            <Stack spacing={2}>
              {timelineSteps.map((step, index) => (
                <Box key={step.label} sx={{ p: 3, borderRadius: 3, border: 1, borderColor: 'divider', backgroundColor: 'background.default' }}>
                  <Typography variant="subtitle2" color="secondary" sx={{ mb: 1, fontWeight: 700 }}>
                    Step {index + 1}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                    {step.label}
                  </Typography>
                  <Typography color="text.secondary">{step.description}</Typography>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>
              Campus gallery & virtual tour
            </Typography>
            <Grid container spacing={2}>
              {galleryItems.map((item) => (
                <Grid item xs={12} sm={6} key={item}>
                  <Box sx={{ borderRadius: 3, p: 3, minHeight: 140, display: 'flex', alignItems: 'flex-end', color: 'common.white', backgroundImage: 'linear-gradient(180deg, rgba(16, 85, 184, 0.28), rgba(5, 17, 44, 0.94)), linear-gradient(135deg, rgba(248, 201, 91, 0.18), rgba(79, 70, 229, 0.18))', backgroundBlendMode: 'screen', backgroundColor: 'primary.main' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {item}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>
            Why families choose MDES
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <EmojiEventsIcon color="secondary" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Premium outcomes
                </Typography>
              </Box>
              <Typography color="text.secondary">
                Strong placement support, accreditation, and a track record of student success.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <SportsEsportsIcon color="secondary" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Campus life
                </Typography>
              </Box>
              <Typography color="text.secondary">
                Clubs, sports, events, and modern learning environments for every student.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <BusinessCenterIcon color="secondary" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Career focus
                </Typography>
              </Box>
              <Typography color="text.secondary">
                Industry partnerships and skill development designed for long-term success.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
>>>>>>> origin/main
  );
};

export default Dashboard;
