import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type DistrictSelectorProps = {
  districts: string[];
  value: string;
  onChange: (value: string) => void;
};

const DistrictSelector = ({ districts, value, onChange }: DistrictSelectorProps) => {
  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="district-label">District</InputLabel>
      <Select
        labelId="district-label"
        label="District"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {districts.map((district) => (
          <MenuItem key={district} value={district}>
            {district}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DistrictSelector;
