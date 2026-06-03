import { useMemo } from 'react';

export const useSearch = <T>(
  items: T[],
  query: string,
  selector: (item: T) => string,
): T[] => {
  return useMemo(() => {
    if (!query.trim()) return items;
    const lowered = query.toLowerCase();
    return items.filter((item) => selector(item).toLowerCase().includes(lowered));
  }, [items, query, selector]);
};
