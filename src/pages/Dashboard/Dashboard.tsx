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
  CardMedia,
  Chip,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import CouncilCard from '../../components/governingCouncil/CouncilCard/CouncilCard';
import Loader from '../../components/common/Loader/Loader';
import { institutionService } from '../../services/institutionService';
import { latestNewsService } from '../../services/latestNewsService';
import type { Institution } from '../../types/Institution';
import type { NewsItem } from '../../types/NewsItem';

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
];

const leadershipShowcase = [
  {
    name: 'Rev. Dr. Bernard Moras',
    title: 'The Apostolic administrator & President of MDES',
    imageUrl: '/mdes-assets/President.jpg',
  },
  {
    name: 'Rev. Msgr. Alfred John Mendonca',
    title: 'Vice President of MDES',
    imageUrl: '/mdes-assets/Vice_President.jpg',
  },
  {
    name: 'Rev. Fr. Edward William Saldanha',
    title: 'The secretary of MDES',
    imageUrl: '/mdes-assets/Secretary.jpg',
  },
  {
    name: 'Rev. Fr. Naveen Kumar',
    title: 'The Correspondent and The Treasurer MDES',
    imageUrl: '/mdes-assets/treasurer.jpg',
  },
] as const;

const Dashboard = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animatedCounts, setAnimatedCounts] = useState({ total: 0, schools: 0, colleges: 0, districts: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [data, latestNews] = await Promise.all([
          institutionService.getInstitutions(),
          latestNewsService.getLatestNews(),
        ]);
        setInstitutions(data);
        setNews(latestNews);
      } catch {
        setError('Unable to load enhanced homepage data.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const stats = useMemo(() => {
    const total = institutions.length;
    const schools = institutions.filter((item) => item.category === 'School').length;
    const colleges = institutions.filter((item) => item.category === 'College').length;
    const districts = new Set(institutions.map((item) => item.district)).size;
    return { total, schools, colleges, districts };
  }, [institutions]);

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

  const featuredInstitutions = institutions.slice(0, 6);

  return (
    <Stack spacing={6}>
      <Box
        component="section"
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 1600,
          mx: 'auto',
          borderRadius: 4,
          overflow: 'hidden',
          minHeight: { xs: '82vh', md: '92vh' },
          background: 'linear-gradient(135deg, #071a35 0%, #0b2a57 58%, #123d78 100%)',
          color: 'common.white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          px: { xs: 2.5, md: 6 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: { xs: '100%', md: '62%' } }}>
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
          </Stack>
        </Box>

        <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1, mt: { xs: 4, md: 8 }, alignItems: 'stretch' }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 18px 40px rgba(15, 35, 67, 0.14)',
                bgcolor: 'background.paper',
              }}
            >
              <Box
                component="img"
                src="/mdes-assets/banner.jpg"
                alt="Who we are visual"
                sx={{ width: '100%', height: { xs: 220, md: 320 }, objectFit: 'cover', display: 'block' }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ pr: { md: 3 } }}>
              <Typography variant="overline" sx={{ color: 'common.white', fontWeight: 800, letterSpacing: 1.2 }}>
                Who we are
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  mt: 1,
                  mb: 2,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'secondary.main',
                  lineHeight: 1.1,
                }}
              >
                Value based quality education for all
              </Typography>
              <Box sx={{ width: 78, height: 3, bgcolor: 'secondary.main', mb: 2.5 }} />
              <Typography color="rgba(255,255,255,0.92)" sx={{ mb: 1.5, lineHeight: 1.85 }}>
                Mysore Diocesan Educational Society (MDES) is a Registered Society, constituted to administer,
                manage and co-ordinate effective, efficient and smooth functioning of institutions started in the
                Catholic Diocese of Mysore.
              </Typography>
              <Typography color="rgba(255,255,255,0.92)" sx={{ mb: 1.5, lineHeight: 1.85 }}>
                It is one of the best known Catholic Educational Societies promoting the cause of Educational Ministry
                even in the remote villages of Karnataka.
              </Typography>
              <Typography color="rgba(255,255,255,0.92)" sx={{ mb: 3, lineHeight: 1.85 }}>
                Even prior to 1966 and the registration of the Mysore Diocesan Educational Society, many institutions
                were started and administered by our diocese directly.
              </Typography>
              <Button component={Link} href="/about" variant="outlined" sx={{ px: 3, py: 1.3, color: 'common.white', borderColor: 'rgba(255,255,255,0.8)' }}>
                ABOUT US
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1, mt: { xs: 4, md: 6 }, alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ pr: { md: 3 } }}>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 800, textTransform: 'uppercase', color: 'secondary.main' }}>
                Message from the Secretary
              </Typography>
              <Typography color="rgba(255,255,255,0.92)" sx={{ mb: 2, lineHeight: 1.8, maxWidth: 720 }}>
                Welcome to the official website of Mysore Diocesan Educational Society (MDES), a unified network of
                153 schools and colleges dedicated to redefining the future of education. At MDES, we believe that
                education is a process of excavation of the possibilities in a person for the betterment of the
                society.
              </Typography>
              <Button component={Link} href="/about" variant="outlined" sx={{ px: 3, py: 1.3, mb: 2, color: 'common.white', borderColor: 'rgba(255,255,255,0.8)' }}>
                READ MORE
              </Button>
              <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
                Warm regards,
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                Rev. Fr. Edward William Saldanha - Secretary, MDES
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                width: '100%',
                maxWidth: 320,
                mx: { xs: 'auto', md: 'auto' },
                boxShadow: '0 14px 28px rgba(15, 35, 67, 0.18)',
              }}
            >
              <Box
                component="img"
                src="/mdes-assets/Secretary.jpg"
                alt="Secretary of MDES"
                sx={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box component="section" sx={{ width: '100%', maxWidth: 1400, mx: 'auto' }}>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Chip label="Important people" color="secondary" sx={{ width: 'fit-content', fontWeight: 700 }} />
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Our leadership team
          </Typography>
        </Stack>
        <Grid container spacing={2.5} sx={{ justifyContent: { xs: 'center', lg: 'flex-start' }, alignItems: 'stretch' }}>
          {leadershipShowcase.map((member) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={member.name} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 281,
                  height: '100%',
                  overflow: 'hidden',
                  borderRadius: '7%',
                  boxShadow: '0 1px 9px 1px rgba(0, 0, 0, 0.52)',
                  bgcolor: 'background.paper',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  component="img"
                  src={member.imageUrl}
                  alt={member.name}
                  sx={{
                    width: '100%',
                    height: { xs: 150, sm: 276 },
                    objectFit: 'cover',
                    display: 'block',
                    flexShrink: 0,
                    borderTopLeftRadius: '7%',
                    borderTopRightRadius: '7%',
                  }}
                />
                <CardContent
                  sx={{
                    px: 1.75,
                    pt: 1.5,
                    pb: 2,
                    textAlign: 'center',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: { xs: 92, sm: 108 },
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'primary.main', mb: 0.75, fontSize: '0.9rem', lineHeight: 1.2 }}>
                    {member.name}
                  </Typography>
                  <Typography sx={{ color: 'text.primary', lineHeight: 1.35, minHeight: 44, fontSize: '0.82rem' }}>
                    {member.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box component="section">
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 800 }}>
          Our Institutions
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Schools and colleges across Mysuru, Mandya, Kodagu, Chamarajanagar, and Hassan.
        </Typography>
        <Grid container spacing={2}>
          {featuredInstitutions.map((institution) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={institution.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    {institution.category} • {institution.district}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                    {institution.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {institution.address}
                  </Typography>
                  <Button component={Link} href={institution.website} target="_blank" rel="noopener noreferrer" size="small">
                    Visit site
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box component="section" sx={{ py: 1 }}>
        <Grid container spacing={2}>
          {[
            { label: 'Institutions', value: animatedCounts.total, icon: <DomainIcon />, highlight: 'network' },
            { label: 'Schools', value: animatedCounts.schools, icon: <SchoolIcon />, highlight: 'campuses' },
            { label: 'Colleges', value: animatedCounts.colleges, icon: <BusinessCenterIcon />, highlight: 'departments' },
            { label: 'Districts', value: animatedCounts.districts, icon: <EventIcon />, highlight: 'regions' },
          ].map((item) => (
            <Grid key={item.label} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ minHeight: 180, px: 2, py: 3, overflow: 'hidden' }}>
                <CardContent>
                  <Stack direction="row" sx={{ mb: 2, alignItems: 'center', justifyContent: 'space-between' }}>
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

      <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
        <Grid size={{ xs: 12, lg: 7 }}>
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
                <Grid key={achievement.title} size={{ xs: 12, sm: 6 }}>
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
        <Grid size={{ xs: 12, lg: 5 }}>
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
          Events and partnerships
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Grid container spacing={2}>
              {eventHighlights.map((event) => (
                <Grid key={event.title} size={{ xs: 12, sm: 4 }}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="subtitle2" color="secondary.main" sx={{ mb: 1, fontWeight: 700 }}>
                        {event.date}
                      </Typography>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.caption}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
                  Recognitions and partners
                </Typography>
                <Grid container spacing={1.5}>
                  {partnerLogos.map((partner) => (
                    <Grid key={partner} size={{ xs: 6, sm: 4, md: 6 }}>
                      <Box
                        sx={{
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 2,
                          p: 1.5,
                          textAlign: 'center',
                          fontWeight: 700,
                          bgcolor: 'background.default',
                        }}
                      >
                        {partner}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box component="section">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 800 }}>
          Latest news & event highlights
        </Typography>
        <Grid container spacing={3}>
          {news.slice(0, 3).map((article) => (
            <Grid key={article.id} size={{ xs: 12, md: 4 }}>
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
        <Grid size={{ xs: 12, lg: 6 }}>
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
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>
              Campus gallery & virtual tour
            </Typography>
            <Grid container spacing={2}>
              {galleryItems.map((item) => (
                <Grid key={item} size={{ xs: 12, sm: 6 }}>
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
            <Grid size={{ xs: 12, md: 4 }}>
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
            <Grid size={{ xs: 12, md: 4 }}>
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
            <Grid size={{ xs: 12, md: 4 }}>
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
  );
};

export default Dashboard;
