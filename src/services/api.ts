/**
 * Service for API simulation using localStorage
 * Adds artificial delay to simulate network requests
 */

import { ShoppingList } from '@/types';

// Constants
const STORAGE_KEY = 'shopping-lists-data';
const DEFAULT_DELAY = 500; // Delay in ms to simulate API call

/**
 * API delay simulation
 */
const delay = (ms: number = DEFAULT_DELAY): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Get data from localStorage
 */
const getData = async (): Promise<ShoppingList[]> => {
  await delay();
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Save data to localStorage
 */
const saveData = async (data: ShoppingList[]): Promise<void> => {
  await delay();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * API for working with shopping lists
 */
export const api = {
  /**
   * Get all lists
   */
  getLists: async (): Promise<ShoppingList[]> => {
    return getData();
  },

  /**
   * Get list by ID
   */
  getListById: async (id: string): Promise<ShoppingList | null> => {
    const lists = await getData();
    return lists.find((list) => list.id === id) || null;
  },

  /**
   * Create new list
   */
  createList: async (list: ShoppingList): Promise<ShoppingList> => {
    const lists = await getData();
    const newLists = [...lists, list];
    await saveData(newLists);
    return list;
  },

  /**
   * Update list
   */
  updateList: async (list: ShoppingList): Promise<ShoppingList> => {
    const lists = await getData();
    const newLists = lists.map((l) => (l.id === list.id ? list : l));
    await saveData(newLists);
    return list;
  },

  /**
   * Delete list
   */
  deleteList: async (id: string): Promise<void> => {
    const lists = await getData();
    const newLists = lists.filter((list) => list.id !== id);
    await saveData(newLists);
  },
};
