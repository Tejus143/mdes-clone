import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Card,
  CardContent,
  CardActions,
  Chip,
  Link,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Institution } from '../../../types/Institution';
import { safeWebsite } from '../../../utils/formatters';

type InstitutionCardProps = {
  institution: Institution;
};

const InstitutionCard = ({ institution }: InstitutionCardProps) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" sx={{ mb: 1, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{institution.name}</Typography>
          <Chip size="small" label={institution.category} color="secondary" />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {institution.district}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {institution.address}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 0.5, alignItems: 'center' }}>
          <PhoneIcon fontSize="small" aria-hidden="true" />
          <Typography variant="body2">{institution.phone}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <LanguageIcon fontSize="small" aria-hidden="true" />
          <Link href={safeWebsite(institution.website)} target="_blank" rel="noopener noreferrer">
            {institution.website}
          </Link>
        </Stack>
      </CardContent>
      <CardActions>
        <Button component={RouterLink} to={`/institutions/${institution.id}`} variant="outlined" fullWidth>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default InstitutionCard;
