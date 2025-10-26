import { useState, useMemo } from 'react';

interface Group {
  groupId: number;
  name: string;
  intro: string;
  safetyTag: string;
  coverImageUrl: string;
  createdAt: string;
  capacity: number;
}

export const useSearch = (groups: Group[] | undefined) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = useMemo(() => {
    if (!groups) return [];
    if (!searchQuery.trim()) return groups;

    const query = searchQuery.toLowerCase().trim();
    return groups.filter(
      (group) =>
        group.name.toLowerCase().includes(query) || group.intro.toLowerCase().includes(query)
    );
  }, [groups, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredGroups,
  };
};
