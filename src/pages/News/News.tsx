import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { latestNewsService } from '../../services/latestNewsService';
import type { NewsItem } from '../../types/NewsItem';

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await latestNewsService.getLatestNews();
        setNews(data);
      } catch {
        setError('Unable to load latest news.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  if (loading) return <Loader label="Loading news..." />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Stack spacing={2.5}>
      <Typography variant="h4">News All</Typography>
      <Typography color="text.secondary">Home / News</Typography>

      {news.length ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 2.5,
          }}
        >
          {news.map((item) => (
            <Card
              key={item.id}
              sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
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
                <Button
                  component={RouterLink}
                  to={`/news/${item.id}`}
                  variant="contained"
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      ) : (
        <EmptyState title="No news available" />
      )}
    </Stack>
  );
};

export default News;
