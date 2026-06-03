import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

type Column<T> = {
  key: keyof T;
  label: string;
};

type DataTableProps<T extends Record<string, string>> = {
  columns: Column<T>[];
  rows: T[];
};

const DataTable = <T extends Record<string, string>>({ columns, rows }: DataTableProps<T>) => {
  if (!rows.length) {
    return <Typography color="text.secondary">No rows to display.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="data table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={String(column.key)}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`row-${index}`}>
              {columns.map((column) => (
                <TableCell key={String(column.key)}>{row[column.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
