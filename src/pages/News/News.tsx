import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Alert,
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
        <Stack spacing={2}>
          {news.map((item) => (
            <Card key={item.id}>
              {item.imageUrl ? (
                <CardMedia component="img" height="220" image={item.imageUrl} alt={item.title} />
              ) : null}
              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  {formatDate(item.date)}
                </Typography>
                <Typography variant="h6" sx={{ mb: 0.6 }}>
                  {item.title}
                </Typography>
                <Typography>{item.excerpt}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={RouterLink}
                  to={`/news/${item.id}`}
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      ) : (
        <EmptyState title="No news available" />
      )}
    </Stack>
  );
};

export default News;
