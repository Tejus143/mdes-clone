import { Box, Pagination as MuiPagination } from '@mui/material';

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
      <MuiPagination
        page={page}
        count={totalPages}
        color="primary"
        onChange={(_, value) => onChange(value)}
        aria-label="institutions pagination"
      />
    </Box>
  );
};

export default Pagination;
