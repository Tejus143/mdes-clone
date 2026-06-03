import * as XLSX from 'xlsx';
import type { Institution } from '../types/Institution';

const toExportRows = (institutions: Institution[]) =>
  institutions.map((institution) => ({
    Name: institution.name,
    District: institution.district,
    Category: institution.category,
    Address: institution.address,
    Phone: institution.phone,
    Email: institution.email,
    Website: institution.website,
  }));

export const exportInstitutionsToCsv = (institutions: Institution[]) => {
  const rows = toExportRows(institutions);
  const header = Object.keys(rows[0] ?? {}).join(',');
  const body = rows
    .map((row) =>
      Object.values(row)
        .map((item) => `"${String(item).replaceAll('"', '""')}"`)
        .join(','),
    )
    .join('\n');

  const blob = new Blob([`${header}\n${body}`], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'mdes-institutions.csv';
  link.click();
  URL.revokeObjectURL(link.href);
};

export const exportInstitutionsToExcel = (institutions: Institution[]) => {
  const worksheet = XLSX.utils.json_to_sheet(toExportRows(institutions));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Institutions');
  XLSX.writeFile(workbook, 'mdes-institutions.xlsx');
};
