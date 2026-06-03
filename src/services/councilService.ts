import { councilMock } from '../data/mockData';
import { officialMdesService } from './officialMdesService';
import type { CouncilMember } from '../types/CouncilMember';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const shouldUseOfficialSource = import.meta.env.VITE_USE_OFFICIAL_MDES !== 'false';

export const councilService = {
  async getCouncilMembers(): Promise<CouncilMember[]> {
    if (!shouldUseOfficialSource) {
      await wait(250);
      return councilMock;
    }

    try {
      const [officialCouncil] = await Promise.all([officialMdesService.getCouncilMembers(), wait(180)]);
      return officialCouncil.length ? officialCouncil : councilMock;
    } catch {
      await wait(250);
      return councilMock;
    }
  },
};
