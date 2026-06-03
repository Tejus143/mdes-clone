import ViewListIcon from '@mui/icons-material/ViewList';
import { Box, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import type { Institution } from '../../../types/Institution';
import InstitutionCard from '../InstitutionCard/InstitutionCard';

type InstitutionGridProps = {
  institutions: Institution[];
  viewMode: 'grid' | 'list';
};

const InstitutionGrid = ({ institutions, viewMode }: InstitutionGridProps) => {
  if (viewMode === 'list') {
    return (
      <List>
        {institutions.map((institution) => (
          <ListItem key={institution.id} divider>
            <ListItemIcon>
              <ViewListIcon aria-hidden="true" />
            </ListItemIcon>
            <ListItemText
              primary={institution.name}
              secondary={`${institution.category} • ${institution.district} • ${institution.phone}`}
            />
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {institutions.map((institution) => (
          <Grid key={institution.id} size={{ xs: 12, md: 6, lg: 4 }}>
            <InstitutionCard institution={institution} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InstitutionGrid;
