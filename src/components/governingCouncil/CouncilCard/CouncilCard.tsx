import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';
import type { CouncilMember } from '../../../types/CouncilMember';

type CouncilCardProps = {
  member: CouncilMember;
};

const CouncilCard = ({ member }: CouncilCardProps) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ textAlign: 'center', p: 3 }}>
      <Stack spacing={1.2} sx={{ alignItems: 'center', mb: 1.5 }}>
        <Avatar src={member.photoUrl} alt={member.name} sx={{ width: 104, height: 104, bgcolor: 'primary.main', fontSize: '2rem' }}>
          {member.name.charAt(0)}
        </Avatar>
        <Typography variant="h6">{member.name}</Typography>
      </Stack>
      <Typography color="secondary.main" fontWeight={800} sx={{ mb: 1.5 }}>
        {member.designation}
      </Typography>
      <Stack spacing={0.7} color="text.secondary">
        <Stack direction="row" spacing={.75} justifyContent="center" alignItems="center"><PhoneOutlinedIcon fontSize="small" /><Typography variant="body2">{member.phone}</Typography></Stack>
        <Stack direction="row" spacing={.75} justifyContent="center" alignItems="center"><EmailOutlinedIcon fontSize="small" /><Typography variant="body2">{member.email}</Typography></Stack>
      </Stack>
    </CardContent>
  </Card>
);

export default CouncilCard;
