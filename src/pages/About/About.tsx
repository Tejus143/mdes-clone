import { Alert, Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader/Loader';
import { latestNewsService } from '../../services/latestNewsService';
import type { NewsItem } from '../../types/NewsItem';
import { DISTRICTS, MDES_SITE_INFO } from '../../utils/constants';

const guidingPrinciples = [
  'Service with a Smile',
  'Committment, Transparence and Accountability',
  'Every Child / Student needs to be respected, cared for and enabled to be a great person / leader.',
  'Well-to-do and rich to support the poor.',
];

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const About = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const items = await latestNewsService.getLatestNews();
        setLatestNews(items.slice(0, 2));
      } catch {
        setError('Unable to load latest news.');
      } finally {
        setLoading(false);
      }
    };

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

export default About;