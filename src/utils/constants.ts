export const ROUTES = {
  dashboard: '/',
  about: '/about',
  news: '/news',
  newsDetails: '/news/:newsId',
  institutions: '/institutions',
  institutionDetails: '/institutions/:institutionId',
  photos: '/photos',
  videos: '/videos',
  governingCouncil: '/governing-council',
  admissions: '/admissions',
  careers: '/careers',
  contact: '/contact',
  contactUs: '/contact-us',
} as const;

export const MDES_SITE_INFO = {
  name: 'Mysore Diocesan Educational Society (MDES)',
  phone: '+91 821 2415333',
  email: 'info@mdes.co.in',
  location: 'Mysuru, India',
  quickContactAddress:
    "St. Joseph's Educational Complex, Jayalakshmipuram, Mysuru 570 012, Karnataka, India",
  website: 'https://mdes.in',
  admissionsUrl: 'https://mdesinstitutions.com/preadmission_Online/',
  copyright: 'Copyright @ 2023 Mysore Diocesan Educational Society',
} as const;

export const MDES_MENU_LINKS = [
  { label: 'Home', to: ROUTES.dashboard },
  { label: 'About', to: ROUTES.about },
  { label: 'Institutions', to: ROUTES.institutions },
  { label: 'News', to: ROUTES.news },
  { label: 'Photos', to: ROUTES.photos },
  { label: 'Videos', to: ROUTES.videos },
  { label: 'Contact', to: ROUTES.contact },
] as const;

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
