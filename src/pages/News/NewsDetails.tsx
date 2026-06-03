import { Alert, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Loader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { latestNewsService } from '../../services/latestNewsService';
import type { NewsItem } from '../../types/NewsItem';

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const NewsDetails = () => {
  const { newsId = '' } = useParams();
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
        setError('Unable to load news details.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const item = useMemo(() => news.find((entry) => entry.id === newsId), [news, newsId]);

  if (loading) return <Loader label="Loading news details..." />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!item) return <EmptyState title="News item not found" description="This record may have been removed." />;

  return (
    <Stack spacing={2.5}>
      <Button component={RouterLink} to="/news" variant="outlined" sx={{ alignSelf: 'start' }}>
        Back to News
      </Button>
      <Card>
        {item.imageUrl ? <CardMedia component="img" image={item.imageUrl} alt={item.title} /> : null}
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {formatDate(item.date)}
          </Typography>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {item.title}
          </Typography>
          <Typography>{item.content}</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default NewsDetails;
