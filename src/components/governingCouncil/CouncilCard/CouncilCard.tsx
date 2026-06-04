import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import type { CouncilMember } from '../../../types/CouncilMember';

type CouncilCardProps = {
  member: CouncilMember;
  showContacts?: boolean;
};

const CouncilCard = ({ member, showContacts = true }: CouncilCardProps) => (
  <Card
    sx={{
      height: '100%',
      overflow: 'hidden',
      borderRadius: 4,
      boxShadow: '0 18px 40px rgba(15, 35, 67, 0.16)',
      bgcolor: 'background.paper',
    }}
  >
    {member.photoUrl ? (
      <CardMedia
        component="img"
        image={member.photoUrl}
        alt={member.name}
        sx={{
          width: '100%',
          aspectRatio: '1 / 1.05',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    ) : null}
    <CardContent sx={{ px: 2.5, pt: 2.25, pb: 2.5, textAlign: 'center' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
        {member.name}
      </Typography>
      <Typography sx={{ color: 'text.primary', lineHeight: 1.4 }}>{member.designation}</Typography>
      {showContacts ? (
        <Stack spacing={0.4} sx={{ mt: 1.5 }}>
          <Typography variant="body2" color="text.secondary">
            {member.phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {member.email}
          </Typography>
        </Stack>
      ) : null}
    </CardContent>
  </Card>
);

export default CouncilCard;
