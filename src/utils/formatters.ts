export const toTitleCase = (value: string) =>
  value
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

export const formatBoolean = (value: boolean) => (value ? 'Open' : 'Closed');

export const safeWebsite = (value: string) =>
  value.startsWith('http') ? value : `https://${value}`;
