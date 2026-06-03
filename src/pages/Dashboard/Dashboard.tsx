import DomainIcon from '@mui/icons-material/Domain';
import SchoolIcon from '@mui/icons-material/School';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MapIcon from '@mui/icons-material/Map';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Loader from '../../components/common/Loader/Loader';
import { institutionService } from '../../services/institutionService';
import { officialMdesService } from '../../services/officialMdesService';
import type { Institution } from '../../types/Institution';

const Dashboard = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [bannerUrl, setBannerUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [data, resolvedBannerUrl] = await Promise.all([
          institutionService.getInstitutions(),
          officialMdesService.getPrimaryBannerUrl(),
        ]);
        setInstitutions(data);
        setBannerUrl(resolvedBannerUrl);
      } catch {
        setError('Unable to load dashboard statistics.');
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

  const cards = [
    { title: 'Total Institutions', value: stats.total, icon: <DomainIcon /> },
    { title: 'Total Schools', value: stats.schools, icon: <SchoolIcon /> },
    { title: 'Total Colleges', value: stats.colleges, icon: <ApartmentIcon /> },
    { title: 'Total Districts', value: stats.districts, icon: <MapIcon /> },
  ];

  if (loading) return <Loader label="Loading dashboard metrics..." />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Stack spacing={3}>
      <Typography variant="h4">MDES Institution Dashboard</Typography>
      <Typography color="text.secondary">
        Overview of all diocesan institutions with quick operational insights.
      </Typography>

      {bannerUrl ? (
        <Card sx={{ overflow: 'hidden' }}>
          <Box
            component="img"
            src={bannerUrl}
            alt="MDES official banner"
            sx={{ width: '100%', display: 'block', maxHeight: { xs: 180, md: 260 }, objectFit: 'cover' }}
          />
        </Card>
      ) : null}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 2,
        }}
      >
        {cards.map((card) => (
          <Card key={card.title}>
            <CardContent>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1">{card.title}</Typography>
                {card.icon}
              </Stack>
              <Typography variant="h4" sx={{ mt: 1 }}>
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Recent Updates
          </Typography>
          <Stack spacing={1}>
            {institutions.slice(0, 5).map((institution) => (
              <Typography key={institution.id} variant="body2">
                {institution.name} in {institution.district} updated admission support desk.
              </Typography>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Dashboard;
