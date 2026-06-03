import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
};

const SearchBar = ({
  value,
  onChange,
  label = 'Search',
  placeholder = 'Search...',
  fullWidth = true,
}: SearchBarProps) => {
  return (
    <TextField
      value={value}
      onChange={(event) => onChange(event.target.value)}
      label={label}
      placeholder={placeholder}
      fullWidth={fullWidth}
      size="small"
      slotProps={{
        htmlInput: { 'aria-label': label },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon aria-hidden="true" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBar;
