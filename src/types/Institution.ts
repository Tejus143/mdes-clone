export interface Institution {
  id: string;
  name: string;
  district: string;
  category: 'School' | 'College';
  address: string;
  phone: string;
  email: string;
  website: string;
  principal: string;
  admissionContact: string;
}
