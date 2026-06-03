import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';
import type { CouncilMember } from '../../../types/CouncilMember';

type CouncilCardProps = {
  member: CouncilMember;
};

const CouncilCard = ({ member }: CouncilCardProps) => (
  <Card>
    <CardContent>
      <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center', mb: 0.5 }}>
        {member.photoUrl ? <Avatar src={member.photoUrl} alt={member.name} /> : null}
        <Typography variant="h6">{member.name}</Typography>
      </Stack>
      <Typography color="secondary.main" sx={{ mb: 1 }}>
        {member.designation}
      </Typography>
      <Stack spacing={0.4}>
        <Typography variant="body2">Phone: {member.phone}</Typography>
        <Typography variant="body2">Email: {member.email}</Typography>
      </Stack>
    </CardContent>
  </Card>
);

export default CouncilCard;
