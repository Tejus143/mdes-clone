import { Box } from '@mui/material';
import type { CouncilMember } from '../../../types/CouncilMember';
import CouncilCard from '../CouncilCard/CouncilCard';

type CouncilListProps = {
  members: CouncilMember[];
};

const CouncilList = ({ members }: CouncilListProps) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 2 }}>
      {members.map((member) => (
        <CouncilCard key={member.id} member={member} />
      ))}
    </Box>
  );
};

export default CouncilList;
