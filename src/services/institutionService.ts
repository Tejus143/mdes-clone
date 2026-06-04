import { institutionsMock } from '../data/mockData';
import type { Institution } from '../types/Institution';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const institutionService = {
  async getInstitutions(): Promise<Institution[]> {
    await wait(200);
    return institutionsMock;
  },

  async getInstitutionById(id: string): Promise<Institution | undefined> {
    const institutions = await this.getInstitutions();
    return institutions.find((institution) => institution.id === id);
  },
};
