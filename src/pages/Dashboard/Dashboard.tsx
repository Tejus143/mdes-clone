import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import { Alert, Box, Button, Card, CardContent, Container, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import stJosephImage from '../../assets/st-joseph-child-jesus.png';
import Loader from '../../components/common/Loader/Loader';
import { institutionService } from '../../services/institutionService';
import { latestNewsService } from '../../services/latestNewsService';
import { officialMdesService } from '../../services/officialMdesService';
import type { Institution } from '../../types/Institution';
import type { NewsItem } from '../../types/NewsItem';
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
];

const Dashboard = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [bannerUrl, setBannerUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [data, resolvedBannerUrl, newsItems] = await Promise.all([
          institutionService.getInstitutions(),
          officialMdesService.getPrimaryBannerUrl(),
          latestNewsService.getLatestNews(),
        ]);
        setInstitutions(data);
        setBannerUrl(resolvedBannerUrl);
        setNews(newsItems.slice(0, 3));
      } catch {
        setError('Unable to load homepage information.');
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

  if (loading) return <Box sx={{ py: 10 }}><Loader label="Loading MDES homepage..." /></Box>;
  if (error) return <Container sx={{ py: 6 }}><Alert severity="error">{error}</Alert></Container>;

  return (
    <Box>
      <Box
        sx={{
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
          </Stack>
        </Box>
      </Box>

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
  );
};

export default Dashboard;
