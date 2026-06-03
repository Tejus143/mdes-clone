import { institutionsMock } from '../data/mockData';
import { officialMdesService } from './officialMdesService';
import type { Institution } from '../types/Institution';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const shouldUseOfficialSource = import.meta.env.VITE_USE_OFFICIAL_MDES !== 'false';

const mergeInstitutionData = (officialInstitutions: Institution[]) => {
  if (!officialInstitutions.length) {
    return institutionsMock;
  }

  const merged = [...institutionsMock];
  const existingIds = new Set(merged.map((institution) => institution.id));

  officialInstitutions.forEach((institution) => {
    if (!existingIds.has(institution.id)) {
      merged.push(institution);
    }
  });

  return merged;
};

export const institutionService = {
  async getInstitutions(): Promise<Institution[]> {
    if (!shouldUseOfficialSource) {
      await wait(300);
      return institutionsMock;
    }

    try {
      const [officialInstitutions] = await Promise.all([
        officialMdesService.getInstitutionDirectories(),
        wait(200),
      ]);

      return mergeInstitutionData(officialInstitutions);
    } catch {
      await wait(300);
      return institutionsMock;
    }
  },

  async getInstitutionById(id: string): Promise<Institution | undefined> {
    const institutions = await this.getInstitutions();
    return institutions.find((institution) => institution.id === id);
  },
};
