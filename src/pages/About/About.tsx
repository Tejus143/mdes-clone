<<<<<<< HEAD
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
=======
import { Alert, Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader/Loader';
import { latestNewsService } from '../../services/latestNewsService';
import type { NewsItem } from '../../types/NewsItem';
import { DISTRICTS, MDES_SITE_INFO } from '../../utils/constants';
>>>>>>> origin/main

const milestones = [
  ['Our foundation', 'A shared commitment to make quality, value-based education accessible to every learner.'],
  ['Growing our reach', 'Schools and colleges expanded across districts while remaining rooted in their communities.'],
  ['Education with purpose', 'Academic excellence grew alongside character, compassion, leadership, and service.'],
  ['The journey ahead', 'MDES continues to equip young people for a changing world without losing sight of enduring values.'],
];

<<<<<<< HEAD
const principles = [
  ['Excellence', 'Enable every learner to discover their ability and pursue meaningful achievement.', <SchoolOutlinedIcon />],
  ['Dignity', 'Respect, care for, and support every student as a person and future leader.', <GroupsOutlinedIcon />],
  ['Service', 'Serve all communities, with special attention to rural and underprivileged learners.', <VolunteerActivismOutlinedIcon />],
  ['Values', 'Build education on commitment, transparency, accountability, and compassion.', <AutoStoriesOutlinedIcon />],
];
=======
const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const About = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
>>>>>>> origin/main

const About = () => (
  <Stack spacing={5}>
    <Box sx={{ textAlign: 'center', maxWidth: 850, mx: 'auto' }}>
      <Typography color="secondary.main" fontWeight={800}>WHO WE ARE</Typography>
      <Typography variant="h3">Inspiring excellence through value-based quality education</Typography>
      <Typography color="text.secondary" sx={{ mt: 1.5, fontSize: '1.08rem' }}>
        MDES empowers learners to become capable, compassionate, and responsible people who contribute to a sustainable and healthy nation.
      </Typography>
    </Box>

<<<<<<< HEAD
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2.5 }}>
      <Card sx={{ bgcolor: '#071f3d', color: 'common.white' }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography color="secondary.light" fontWeight={800}>OUR VISION</Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>An enlightened, sustainable, and healthy nation shaped through education and empowerment.</Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography color="secondary.main" fontWeight={800}>OUR MISSION</Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>To provide inclusive quality education that inspires excellence, nurtures values, and serves society.</Typography>
        </CardContent>
      </Card>
    </Box>

    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>What guides us</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2 }}>
        {principles.map(([title, description, icon]) => (
          <Card key={title as string}>
            <CardContent>
              <Box sx={{ color: 'secondary.main', mb: 1 }}>{icon}</Box>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: .75 }}>{description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>

    <Box>
      <Typography color="secondary.main" fontWeight={800}>OUR JOURNEY</Typography>
      <Typography variant="h4" sx={{ mb: 2 }}>A legacy that keeps moving forward</Typography>
      <Stack spacing={0}>
        {milestones.map(([title, description], index) => (
          <Box key={title} sx={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 2 }}>
            <Stack alignItems="center">
              <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: 'secondary.main', border: '4px solid', borderColor: 'background.paper' }} />
              {index < milestones.length - 1 ? <Box sx={{ width: 2, flex: 1, minHeight: 70, bgcolor: 'divider' }} /> : null}
            </Stack>
            <Box sx={{ pb: 3 }}>
              <Typography variant="h6">{title}</Typography>
              <Typography color="text.secondary">{description}</Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  </Stack>
);
=======
    void load();
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto' }}>
      <Stack spacing={2.5}>
        <Typography variant="h4">About Us</Typography>
        <Typography color="text.secondary">Home / Who we are</Typography>

        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Vision and Mission
            </Typography>
            <Typography>
              Value based quality education for empowerment leading to enlightened, sustainable and healthy nation.
            </Typography>

            <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
              Motto
            </Typography>
            <Typography>Inspiring Excellence through Value Based Quality Education.</Typography>

            <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
              Focus
            </Typography>
            <Typography>
              Service to all, irrespective of caste, creed or race with a special emphasis on rural areas and most
              underprivileged of society.
            </Typography>

            <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
              Guiding Principles
            </Typography>
            <Stack component="ul" spacing={0.5} sx={{ pl: 2, m: 0 }}>
              {guidingPrinciples.map((item) => (
                <Typography component="li" key={item}>
                  {item}
                </Typography>
              ))}
            </Stack>

            <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
              MDES is working in four districts
            </Typography>
            <Stack component="ul" spacing={0.5} sx={{ pl: 2, m: 0 }}>
              {DISTRICTS.filter((district) => district !== 'All Districts' && district !== 'Hassan').map((district) => (
                <Typography component="li" key={district}>
                  {district}
                </Typography>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Typography variant="h5">Latest News</Typography>
        {loading ? <Loader label="Loading latest news..." /> : null}
        {error ? <Alert severity="error">{error}</Alert> : null}

        {!loading && !error ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
              },
              gap: 2.5,
            }}
          >
            {latestNews.map((item) => (
              <Card key={item.id} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {item.imageUrl ? (
                  <CardMedia
                    component="img"
                    image={item.imageUrl}
                    alt={item.title}
                    sx={{
                      width: '100%',
                      height: 180,
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                ) : null}
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {formatDate(item.date)}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 0.6, fontSize: '1rem' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2">{item.excerpt}</Typography>
                </CardContent>
                <CardActions>
                  <Button component={RouterLink} to={`/news/${item.id}`} variant="contained" size="small">
                    Read More
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        ) : null}

        <Card>
          <CardContent>
            <Typography variant="h6">Quick Contact</Typography>
            <Typography sx={{ mt: 0.8 }}>{MDES_SITE_INFO.quickContactAddress}</Typography>
            <Typography sx={{ mt: 1 }}>{MDES_SITE_INFO.phone}</Typography>
            <Typography>{MDES_SITE_INFO.email}</Typography>
            <Button component={RouterLink} to="/contact" sx={{ mt: 1.2 }} variant="outlined">
              Leave us a message
            </Button>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};
>>>>>>> origin/main

export default About;