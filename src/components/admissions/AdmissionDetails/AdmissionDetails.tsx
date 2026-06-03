import { Box } from '@mui/material';
import type { Admission } from '../../../types/Admission';
import type { Institution } from '../../../types/Institution';
import AdmissionCard from '../AdmissionCard/AdmissionCard';

type AdmissionDetailsProps = {
  admissions: Admission[];
  institutions: Institution[];
};

const AdmissionDetails = ({ admissions, institutions }: AdmissionDetailsProps) => {
  const byInstitution = new Map(institutions.map((institution) => [institution.id, institution.name]));

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
      {admissions.map((admission) => (
        <AdmissionCard
          key={admission.id}
          admission={admission}
          title={byInstitution.get(admission.institutionId) ?? 'Institution'}
        />
      ))}
    </Box>
  );
};

export default AdmissionDetails;
