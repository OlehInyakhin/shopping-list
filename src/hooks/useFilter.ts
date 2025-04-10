/**
 * Hook for filtering and searching items in the shopping list
 */

import { useState, useCallback, useMemo } from 'react';
import { ShoppingItem } from '@/types';

type FilterOptions = {
  category: string | null;
  completed: boolean | null;
  searchQuery: string;
};

export const useFilter = (items: ShoppingItem[]) => {
  // Filter state
  const [filter, setFilter] = useState<FilterOptions>({
    category: null,
    completed: null,
    searchQuery: '',
  });

  // Function to update category filter
  const filterByCategory = useCallback((category: string | null) => {
    setFilter((prev) => ({ ...prev, category }));
  }, []);

  // Function to update purchase status filter
  const filterByCompleted = useCallback((completed: boolean | null) => {
    setFilter((prev) => ({ ...prev, completed }));
  }, []);

  // Function to update search query
  const setSearchQuery = useCallback((searchQuery: string) => {
    setFilter((prev) => ({ ...prev, searchQuery }));
  }, []);

  // Function to reset all filters
  const resetFilters = useCallback(() => {
    setFilter({
      category: null,
      completed: null,
      searchQuery: '',
    });
  }, []);

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Filter by category
      if (filter.category && item.category.id !== filter.category) {
        return false;
      }

      // Filter by purchase status
      if (filter.completed !== null && item.completed !== filter.completed) {
        return false;
      }

      // Search by name (case insensitive)
      if (
        filter.searchQuery &&
        !item.name.toLowerCase().includes(filter.searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [items, filter]);

  // Get unique categories from the items list
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    items.forEach((item) => uniqueCategories.add(item.category.id));
    return Array.from(uniqueCategories);
  }, [items]);

  return {
    filter,
    filteredItems,
    categories,
    filterByCategory,
    filterByCompleted,
    setSearchQuery,
    resetFilters,
  };
};
