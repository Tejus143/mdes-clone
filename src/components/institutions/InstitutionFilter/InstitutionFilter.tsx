import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import type { SortKey } from '../../../hooks/useInstitutions';
import { CATEGORIES } from '../../../utils/constants';
import { exportInstitutionsToCsv, exportInstitutionsToExcel } from '../../../utils/exportUtils';
import type { Institution } from '../../../types/Institution';
import SearchBar from '../../common/SearchBar/SearchBar';
import DistrictSelector from '../DistrictSelector/DistrictSelector';

type InstitutionFilterProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  districts: string[];
  district: string;
  onDistrictChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sortBy: SortKey;
  onSortByChange: (value: SortKey) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (value: 'grid' | 'list') => void;
  exportRows: Institution[];
};

const InstitutionFilter = ({
  searchTerm,
  onSearchChange,
  districts,
  district,
  onDistrictChange,
  category,
  onCategoryChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  exportRows,
}: InstitutionFilterProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(7, minmax(0,1fr))' },
        gap: 1.2,
      }}
    >
      <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          label="Search institutions"
          placeholder="Search by name, district, category"
        />
      </Box>

      <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
        <DistrictSelector districts={districts} value={district} onChange={onDistrictChange} />
      </Box>

      <FormControl size="small">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          label="Category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          {CATEGORIES.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          label="Sort By"
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value as SortKey)}
        >
          <MenuItem value="name">Institution Name</MenuItem>
          <MenuItem value="district">District</MenuItem>
          <MenuItem value="category">Category</MenuItem>
        </Select>
      </FormControl>

      <ToggleButtonGroup
        exclusive
        value={viewMode}
        onChange={(_, value) => {
          if (value) onViewModeChange(value);
        }}
        aria-label="grid list toggle"
      >
        <ToggleButton value="grid" aria-label="grid view">
          Grid
        </ToggleButton>
        <ToggleButton value="list" aria-label="list view">
          List
        </ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="outlined" onClick={() => exportInstitutionsToCsv(exportRows)}>
          Export CSV
        </Button>
        <Button variant="contained" onClick={() => exportInstitutionsToExcel(exportRows)}>
          Export Excel
        </Button>
      </Box>
    </Box>
  );
};

export default InstitutionFilter;
