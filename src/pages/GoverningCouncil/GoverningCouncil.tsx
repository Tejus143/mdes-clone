import { Alert, Box, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Loader from '../../components/common/Loader/Loader';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import CouncilList from '../../components/governingCouncil/CouncilList/CouncilList';
import { useCouncil } from '../../hooks/useCouncil';

const GoverningCouncil = () => {
  const [search, setSearch] = useState('');
  const [designation, setDesignation] = useState('All Designations');
  const { members, loading, error, designations } = useCouncil(search);

  const filteredMembers = useMemo(
    () =>
      designation === 'All Designations'
        ? members
        : members.filter((member) => member.designation === designation),
    [designation, members],
  );

  if (loading) return <Loader label="Loading council members..." />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Stack spacing={2.5}>
      <Typography variant="h4">Governing Council</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 1.5 }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          label="Search council members"
          placeholder="Search by name, designation, email"
        />
        <Select
          size="small"
          aria-label="filter by designation"
          value={designation}
          onChange={(event) => setDesignation(event.target.value)}
        >
          {designations.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {filteredMembers.length ? <CouncilList members={filteredMembers} /> : <EmptyState />}
    </Stack>
  );
};

export default GoverningCouncil;
