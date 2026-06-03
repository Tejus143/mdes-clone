import { Box, Card, CardContent, Chip, Divider, Link, Stack, Typography } from '@mui/material';
import type { Admission } from '../../../types/Admission';
import type { Institution } from '../../../types/Institution';
import { formatBoolean, safeWebsite } from '../../../utils/formatters';

type InstitutionDetailsProps = {
  institution: Institution;
  admission?: Admission;
};

const InstitutionDetails = ({ institution, admission }: InstitutionDetailsProps) => {
  return (
    <Card>
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ justifyContent: 'space-between', gap: 1 }}
        >
          <Typography variant="h4">{institution.name}</Typography>
          <Chip label={institution.category} color="secondary" sx={{ alignSelf: 'start' }} />
        </Stack>
        <Typography color="text.secondary">{institution.district}</Typography>
        <Typography sx={{ mt: 1.5 }}>{institution.address}</Typography>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1}>
          <Typography>
            <strong>Contact Number:</strong> {institution.phone}
          </Typography>
          <Typography>
            <strong>Email:</strong> {institution.email}
          </Typography>
          <Typography>
            <strong>Website:</strong>{' '}
            <Link href={safeWebsite(institution.website)} target="_blank" rel="noopener noreferrer">
              {institution.website}
            </Link>
          </Typography>
          <Typography>
            <strong>Principal:</strong> {institution.principal}
          </Typography>
          <Typography>
            <strong>Admission Contact:</strong> {institution.admissionContact}
          </Typography>
        </Stack>

        {admission ? (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Admission Information</Typography>
            <Typography>
              <strong>Status:</strong> {formatBoolean(admission.admissionOpen)}
            </Typography>
            <Typography>
              <strong>Eligibility:</strong> {admission.eligibility}
            </Typography>
            <Typography>
              <strong>Courses:</strong> {admission.courses.join(', ')}
            </Typography>
          </Box>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default InstitutionDetails;
