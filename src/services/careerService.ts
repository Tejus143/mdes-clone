import { careersMock } from '../data/mockData';
import { officialMdesService } from './officialMdesService';
import type { Career } from '../types/Career';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const shouldUseOfficialSource = import.meta.env.VITE_USE_OFFICIAL_MDES !== 'false';

export const careerService = {
  async getCareers(): Promise<Career[]> {
    if (!shouldUseOfficialSource) {
      await wait(260);
      return careersMock;
    }

    try {
      const [officialCareers] = await Promise.all([officialMdesService.getCareers(), wait(180)]);
      return officialCareers.length ? officialCareers : careersMock;
    } catch {
      await wait(260);
      return careersMock;
    }
  },
};
