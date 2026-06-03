import { useEffect, useMemo, useState } from 'react';
import { councilService } from '../services/councilService';
import { useSearch } from './useSearch';
import type { CouncilMember } from '../types/CouncilMember';

export const useCouncil = (searchTerm: string) => {
  const [members, setMembers] = useState<CouncilMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await councilService.getCouncilMembers();
        setMembers(data);
      } catch {
        setError('Unable to load governing council details.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const filtered = useSearch(
    members,
    searchTerm,
    (member) => `${member.name} ${member.designation} ${member.email}`,
  );

  const designations = useMemo(
    () => ['All Designations', ...new Set(members.map((member) => member.designation))],
    [members],
  );

  return { members: filtered, loading, error, designations };
};
