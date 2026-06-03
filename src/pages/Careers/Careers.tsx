import LaunchIcon from '@mui/icons-material/Launch';
import { Alert, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Loader from '../../components/common/Loader/Loader';
import { careerService } from '../../services/careerService';
import type { Career } from '../../types/Career';

const Careers = () => {
  const [jobs, setJobs] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await careerService.getCareers();
        setJobs(data);
      } catch {
        setError('Unable to load careers.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  if (loading) return <Loader label="Loading careers..." />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Stack spacing={2.5}>
      <Typography variant="h4">Careers</Typography>
      <Typography color="text.secondary">Explore open positions across MDES institutions.</Typography>
      {jobs.length ? (
        <Stack spacing={2}>
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography color="text.secondary">
                  {job.location} • {job.type}
                </Typography>
                <Typography sx={{ my: 1 }}>{job.description}</Typography>
                <Button variant="contained" endIcon={<LaunchIcon />} href={job.applyUrl}>
                  Apply
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <EmptyState title="No open positions at the moment" />
      )}
    </Stack>
  );
};

export default Careers;
