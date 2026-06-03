import { admissionsMock } from '../data/mockData';
import type { Admission } from '../types/Admission';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const admissionService = {
  async getAdmissions(): Promise<Admission[]> {
    await wait(250);
    return admissionsMock;
  },
  async getAdmissionByInstitutionId(institutionId: string): Promise<Admission | undefined> {
    await wait(150);
    return admissionsMock.find((admission) => admission.institutionId === institutionId);
  },
};
