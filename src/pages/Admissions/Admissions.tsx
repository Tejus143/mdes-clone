import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { Alert, Box, Button, Card, CardContent, MenuItem, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import AdmissionDetails from '../../components/admissions/AdmissionDetails/AdmissionDetails';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Loader from '../../components/common/Loader/Loader';
import { admissionService } from '../../services/admissionService';
import { institutionService } from '../../services/institutionService';
import type { Admission } from '../../types/Admission';
import type { Institution } from '../../types/Institution';

const steps = [
  ['Explore', 'Find the institution and programme that fits your goals.'],
  ['Enquire', 'Share a few details so our team can guide you.'],
  ['Connect', 'An admissions counsellor will explain eligibility and documents.'],
  ['Apply', 'Complete the official application with confidence.'],
];

const Admissions = () => {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setSubmitted(true);
  };

  if (loading) return <Loader label="Loading admissions..." />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Stack spacing={4}>
      <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        <Typography color="secondary.main" fontWeight={800}>ADMISSIONS</Typography>
        <Typography variant="h3">A simpler path to the right institution</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>Tell us what you are looking for. Our admissions team will help with programmes, eligibility, and next steps.</Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.1fr .9fr' }, gap: 3, alignItems: 'start' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
          {steps.map(([title, description], index) => (
            <Card key={title} sx={{ borderTop: '3px solid', borderColor: 'secondary.main' }}>
              <CardContent>
                <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
                  <CheckCircleOutlinedIcon color="secondary" />
                  <Typography variant="h6">{index + 1}. {title}</Typography>
                </Stack>
                <Typography color="text.secondary">{description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Card>
          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Typography variant="h5">Request admission guidance</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: .5, mb: 2.5 }}>Only the essentials for now. Our team will collect detailed information later.</Typography>
            <Stack component="form" spacing={2} onSubmit={handleSubmit}>
              <TextField required label="Student / parent name" name="name" />
              <TextField required label="Phone number" name="phone" type="tel" />
              <TextField required select label="Preferred institution" name="institution" defaultValue="">
                {institutions.map((institution) => <MenuItem key={institution.id} value={institution.id}>{institution.name}</MenuItem>)}
              </TextField>
              <TextField label="What would you like help with?" name="message" multiline minRows={3} />
              <Button type="submit" variant="contained" color="secondary" size="large">Send enquiry</Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Box>
        <Typography variant="h4" sx={{ mb: .75 }}>Open admissions by institution</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>Compare eligibility, courses, and direct admission contact points.</Typography>
        {admissions.length ? <AdmissionDetails admissions={admissions} institutions={institutions} /> : <EmptyState title="No admissions data available" />}
      </Box>

      <Snackbar open={submitted} autoHideDuration={5000} onClose={() => setSubmitted(false)} message="Thank you. Your admission enquiry has been recorded." />
    </Stack>
  );
};

export default Admissions;
