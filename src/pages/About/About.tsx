import { Alert, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
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
            Service to all, irrespective of caste, creed or race with a special em.phasis on rural areas and most underprivileged of society.
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
        <Stack spacing={2}>
          {latestNews.map((item) => (
            <Card key={item.id}>
              {item.imageUrl ? (
                <CardMedia component="img" image={item.imageUrl} height="210" alt={item.title} />
              ) : null}
              <CardContent>
                <Typography variant="h6" sx={{ mb: 0.6 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ mb: 1.2 }}>{item.excerpt}</Typography>
                <Button component={RouterLink} to={`/news/${item.id}`} variant="contained">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
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
  );
};

export default About;
