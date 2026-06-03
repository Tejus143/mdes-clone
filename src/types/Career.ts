export interface Career {
  id: string;
  title: string;
  location: string;
  type: 'Full-Time' | 'Part-Time' | 'Contract';
  description: string;
  applyUrl: string;
}
