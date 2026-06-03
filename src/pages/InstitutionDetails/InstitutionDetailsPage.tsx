import { Alert, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Loader from '../../components/common/Loader/Loader';
import InstitutionDetails from '../../components/institutions/InstitutionDetails/InstitutionDetails';
import InstitutionGrid from '../../components/institutions/InstitutionGrid/InstitutionGrid';
import { admissionService } from '../../services/admissionService';
import { institutionService } from '../../services/institutionService';
import type { Admission } from '../../types/Admission';
import type { Institution } from '../../types/Institution';

const InstitutionDetailsPage = () => {
  const { institutionId = '' } = useParams();

  const [institution, setInstitution] = useState<Institution | undefined>();
  const [admission, setAdmission] = useState<Admission | undefined>();
  const [related, setRelated] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [fetchedInstitution, fetchedAdmission, allInstitutions] = await Promise.all([
          institutionService.getInstitutionById(institutionId),
          admissionService.getAdmissionByInstitutionId(institutionId),
          institutionService.getInstitutions(),
        ]);

        setInstitution(fetchedInstitution);
        setAdmission(fetchedAdmission);

        if (fetchedInstitution) {
          setRelated(
            allInstitutions
              .filter(
                (item) =>
                  item.id !== fetchedInstitution.id &&
                  (item.district === fetchedInstitution.district ||
                    item.category === fetchedInstitution.category),
              )
              .slice(0, 3),
          );
        }
      } catch {
        setError('Unable to load institution details.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [institutionId]);

  if (loading) return <Loader label="Loading institution details..." />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!institution) return <EmptyState title="Institution not found" description="This record may have been removed." />;

  return (
    <Stack spacing={3}>
      <InstitutionDetails institution={institution} admission={admission} />
      <Typography variant="h5">Related Institutions</Typography>
      {related.length ? (
        <InstitutionGrid institutions={related} viewMode="grid" />
      ) : (
        <EmptyState title="No related institutions available" />
      )}
    </Stack>
  );
};

export default InstitutionDetailsPage;
