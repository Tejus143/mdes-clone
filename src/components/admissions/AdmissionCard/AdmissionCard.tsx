import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import type { Admission } from '../../../types/Admission';
import { formatBoolean } from '../../../utils/formatters';

type AdmissionCardProps = {
  title: string;
  admission: Admission;
};

const AdmissionCard = ({ title, admission }: AdmissionCardProps) => {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" sx={{ mb: 1, justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6">{title}</Typography>
          <Chip label={formatBoolean(admission.admissionOpen)} color={admission.admissionOpen ? 'success' : 'default'} />
        </Stack>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Eligibility:</strong> {admission.eligibility}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Courses:</strong> {admission.courses.join(', ')}
        </Typography>
        <Typography variant="body2">
          <strong>Contact:</strong> {admission.contact}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AdmissionCard;
