export interface Admission {
  id: string;
  institutionId: string;
  eligibility: string;
  courses: string[];
  admissionOpen: boolean;
  contact: string;
}
