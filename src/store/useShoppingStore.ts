import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ShoppingItem, ShoppingList, Category, Unit } from '@/types';

type ShoppingStore = {
  // State
  lists: ShoppingList[];
  currentListId: string | null;
  categories: Category[];
  units: Unit[];

  // List actions
  createList: (name: string) => void;
  updateList: (id: string, name: string) => void;
  deleteList: (id: string) => void;
  setCurrentList: (id: string | null) => void;

  // Item actions
  addItem: (
    listId: string,
    item: Omit<ShoppingItem, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
  updateItem: (
    listId: string,
    itemId: string,
    item: Partial<Omit<ShoppingItem, 'id' | 'createdAt' | 'updatedAt'>>
  ) => void;
  deleteItem: (listId: string, itemId: string) => void;
  toggleItemCompleted: (listId: string, itemId: string) => void;

  // Category actions
  addCategory: (name: string) => void;
  updateCategory: (id: string, name: string) => void;
  deleteCategory: (id: string) => void;

  // Unit actions
  addUnit: (name: string, shortName: string) => void;
  updateUnit: (id: string, name: string, shortName: string) => void;
  deleteUnit: (id: string) => void;
};

// Generate unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Default categories
const defaultCategories: Category[] = [
  { id: generateId(), name: 'Fruits and vegetables' },
  { id: generateId(), name: 'Dairy products' },
  { id: generateId(), name: 'Meat and fish' },
  { id: generateId(), name: 'Groceries' },
  { id: generateId(), name: 'Beverages' },
  { id: generateId(), name: 'Bread and pastries' },
  { id: generateId(), name: 'Frozen foods' },
  { id: generateId(), name: 'Sweets' },
  { id: generateId(), name: 'Other' },
];

// Default units
const defaultUnits: Unit[] = [
  { id: generateId(), name: 'piece', shortName: 'pc' },
  { id: generateId(), name: 'kilogram', shortName: 'kg' },
  { id: generateId(), name: 'gram', shortName: 'g' },
  { id: generateId(), name: 'liter', shortName: 'l' },
  { id: generateId(), name: 'milliliter', shortName: 'ml' },
  { id: generateId(), name: 'pack', shortName: 'pk' },
  { id: generateId(), name: 'bottle', shortName: 'btl' },
  { id: generateId(), name: 'package', shortName: 'pkg' },
];

export const useShoppingStore = create<
  ShoppingStore,
  [['zustand/persist', ShoppingStore]]
>(
  persist(
    (set) => ({
      lists: [],
      currentListId: null,
      categories: defaultCategories,
      units: defaultUnits,

      // List methods
      createList: (name) => {
        const newList: ShoppingList = {
          id: generateId(),
          name,
          items: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          lists: [...state.lists, newList],
          currentListId: newList.id,
        }));
      },

      updateList: (id, name) => {
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === id ? { ...list, name, updatedAt: new Date() } : list
          ),
        }));
      },

      deleteList: (id) => {
        set((state) => ({
          lists: state.lists.filter((list) => list.id !== id),
          currentListId:
            state.currentListId === id ? null : state.currentListId,
        }));
      },

      setCurrentList: (id) => {
        set({ currentListId: id });
      },

      // Item methods
      addItem: (listId, item) => {
        const newItem: ShoppingItem = {
          id: generateId(),
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: [...list.items, newItem],
                  updatedAt: new Date(),
                }
              : list
          ),
        }));
      },

      updateItem: (listId, itemId, item) => {
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.map((listItem) =>
                    listItem.id === itemId
                      ? { ...listItem, ...item, updatedAt: new Date() }
                      : listItem
                  ),
                  updatedAt: new Date(),
                }
              : list
          ),
        }));
      },

      deleteItem: (listId, itemId) => {
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.filter((item) => item.id !== itemId),
                  updatedAt: new Date(),
                }
              : list
          ),
        }));
      },

      toggleItemCompleted: (listId, itemId) => {
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.map((item) =>
                    item.id === itemId
                      ? {
                          ...item,
                          completed: !item.completed,
                          updatedAt: new Date(),
                        }
                      : item
                  ),
                  updatedAt: new Date(),
                }
              : list
          ),
        }));
      },

      // Category methods
      addCategory: (name) => {
        const newCategory: Category = {
          id: generateId(),
          name,
        };

        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },

      updateCategory: (id, name) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id ? { ...category, name } : category
          ),
        }));
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id),
        }));
      },

      // Unit methods
      addUnit: (name, shortName) => {
        const newUnit: Unit = {
          id: generateId(),
          name,
          shortName,
        };

        set((state) => ({
          units: [...state.units, newUnit],
        }));
      },

      updateUnit: (id, name, shortName) => {
        set((state) => ({
          units: state.units.map((unit) =>
            unit.id === id ? { ...unit, name, shortName } : unit
          ),
        }));
      },

      deleteUnit: (id) => {
        set((state) => ({
          units: state.units.filter((unit) => unit.id !== id),
        }));
      },
    }),
    {
      name: 'shopping-store',
    }
  )
);
