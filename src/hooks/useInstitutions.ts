import { useEffect, useMemo, useState } from 'react';
import { institutionService } from '../services/institutionService';
import { DISTRICTS, PAGE_SIZE } from '../utils/constants';
import type { Institution } from '../types/Institution';

export type SortKey = 'name' | 'district' | 'category';

export const useInstitutions = (
  searchTerm: string,
  district: string,
  category: string,
  sortBy: SortKey,
  page: number,
) => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInstitutions = async () => {
      try {
        setLoading(true);
        const data = await institutionService.getInstitutions();
        setInstitutions(data);
      } catch {
        setError('Unable to load institutions directory.');
      } finally {
        setLoading(false);
      }
    };

    void loadInstitutions();
  }, []);

  const filteredInstitutions = useMemo(() => {
    const loweredSearch = searchTerm.toLowerCase();

    return institutions
      .filter((institution) =>
        district === 'All Districts' ? true : institution.district === district,
      )
      .filter((institution) =>
        category === 'All Categories' ? true : institution.category === category,
      )
      .filter((institution) =>
        loweredSearch
          ? `${institution.name} ${institution.district} ${institution.category}`
              .toLowerCase()
              .includes(loweredSearch)
          : true,
      )
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [institutions, searchTerm, district, category, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredInstitutions.length / PAGE_SIZE));

  const districts = useMemo(
    () => DISTRICTS,
    [],
  );

  const pagedInstitutions = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredInstitutions.slice(start, start + PAGE_SIZE);
  }, [filteredInstitutions, page]);

  return {
    institutions,
    filteredInstitutions,
    pagedInstitutions,
    loading,
    error,
    totalPages,
    districts,
  };
};
