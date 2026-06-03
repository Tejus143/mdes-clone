export const ROUTES = {
  dashboard: '/',
  institutions: '/institutions',
  institutionDetails: '/institutions/:institutionId',
  governingCouncil: '/governing-council',
  admissions: '/admissions',
  careers: '/careers',
  contactUs: '/contact-us',
} as const;

export const DISTRICTS = [
  'All Districts',
  'Mysuru',
  'Mandya',
  'Kodagu',
  'Chamarajanagar',
  'Hassan',
];

export const CATEGORIES = ['All Categories', 'School', 'College'];

export const PAGE_SIZE = 6;
