import { Alert, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AdmissionDetails from '../../components/admissions/AdmissionDetails/AdmissionDetails';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Loader from '../../components/common/Loader/Loader';
import { admissionService } from '../../services/admissionService';
import { institutionService } from '../../services/institutionService';
import type { Admission } from '../../types/Admission';
import type { Institution } from '../../types/Institution';

const Admissions = () => {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [admissionsData, institutionsData] = await Promise.all([
          admissionService.getAdmissions(),
          institutionService.getInstitutions(),
        ]);
        setAdmissions(admissionsData);
        setInstitutions(institutionsData);
      } catch {
        setError('Unable to load admissions records.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  if (loading) return <Loader label="Loading admissions..." />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Stack spacing={2.5}>
      <Typography variant="h4">Admissions</Typography>
      <Typography color="text.secondary">
        Browse eligibility, courses offered, admission status, and contact points.
      </Typography>
      {admissions.length ? (
        <AdmissionDetails admissions={admissions} institutions={institutions} />
      ) : (
        <EmptyState title="No admissions data available" />
      )}
    </Stack>
  );
};

export default Admissions;
