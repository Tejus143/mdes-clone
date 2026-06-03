import { Alert, Box, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Loader from '../../components/common/Loader/Loader';
import Pagination from '../../components/common/Pagination/Pagination';
import InstitutionFilter from '../../components/institutions/InstitutionFilter/InstitutionFilter';
import InstitutionGrid from '../../components/institutions/InstitutionGrid/InstitutionGrid';
import { useInstitutions, type SortKey } from '../../hooks/useInstitutions';

const Institutions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [district, setDistrict] = useState('All Districts');
  const [category, setCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState<SortKey>('name');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { pagedInstitutions, filteredInstitutions, loading, error, totalPages, districts } = useInstitutions(
    searchTerm,
    district,
    category,
    sortBy,
    page,
  );

  const pageHeader = useMemo(
    () => `${filteredInstitutions.length} institutions found`,
    [filteredInstitutions.length],
  );

  if (loading) return <Loader label="Loading institutions..." />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Stack spacing={2.5}>
      <Typography variant="h4">Institutions Directory</Typography>
      <Typography color="text.secondary">{pageHeader}</Typography>

      <InstitutionFilter
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setPage(1);
        }}
        districts={districts}
        district={district}
        onDistrictChange={(value) => {
          setDistrict(value);
          setPage(1);
        }}
        category={category}
        onCategoryChange={(value) => {
          setCategory(value);
          setPage(1);
        }}
        sortBy={sortBy}
        onSortByChange={(value) => {
          setSortBy(value);
          setPage(1);
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        exportRows={filteredInstitutions}
      />

      {filteredInstitutions.length ? (
        <>
          <InstitutionGrid institutions={pagedInstitutions} viewMode={viewMode} />
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      ) : (
        <Box>
          <EmptyState
            title="No institutions match current filters"
            description="Try another district, category, or search keyword."
          />
        </Box>
      )}
    </Stack>
  );
};

export default Institutions;
