/**
 * Hook for working with shopping list
 * Provides interface for working with store and undo last action function
 */

import { useState, useCallback, useEffect } from 'react';
import { useShoppingStore } from '@/store/useShoppingStore';
import { ShoppingItem } from '@/types';

// Action types for history
type ActionType = 'ADD' | 'UPDATE' | 'DELETE' | 'TOGGLE';

// Interface for history record
interface HistoryRecord {
  action: ActionType;
  listId: string;
  itemId?: string;
  data?: any;
  timestamp: number;
}

export const useShoppingList = (listId: string) => {
  // Get methods and data from store
  const { lists, addItem, updateItem, deleteItem, toggleItemCompleted } =
    useShoppingStore();

  // State for storing action history
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  // Loading state for API request simulation
  const [loading, setLoading] = useState(false);
  // Error state
  const [error, setError] = useState<string | null>(null);

  // Get current list
  const currentList = lists.find((list) => list.id === listId);
  const items = currentList?.items || [];

  // Add record to history
  const addToHistory = (record: Omit<HistoryRecord, 'timestamp'>) => {
    setHistory((prev) => [...prev, { ...record, timestamp: Date.now() }]);
  };

  // Function to add item with API request simulation
  const addItemWithHistory = useCallback(
    async (item: Omit<ShoppingItem, 'id' | 'createdAt' | 'updatedAt'>) => {
      setLoading(true);
      setError(null);

      try {
        // API request simulation
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Add item to store
        addItem(listId, item);

        // Add record to history
        addToHistory({
          action: 'ADD',
          listId,
          data: item,
        });
      } catch (err) {
        setError('Error adding item');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [listId, addItem]
  );

  // Function to update item with API request simulation
  const updateItemWithHistory = useCallback(
    async (
      itemId: string,
      item: Partial<Omit<ShoppingItem, 'id' | 'createdAt' | 'updatedAt'>>
    ) => {
      setLoading(true);
      setError(null);

      try {
        // Find current item state for history
        const currentItem = items.find((i) => i.id === itemId);
        if (!currentItem) throw new Error('Item not found');

        // API request simulation
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Update item in store
        updateItem(listId, itemId, item);

        // Add record to history
        addToHistory({
          action: 'UPDATE',
          listId,
          itemId,
          data: { before: currentItem, after: { ...currentItem, ...item } },
        });
      } catch (err) {
        setError('Error updating item');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [listId, updateItem, items]
  );

  // Function to delete item with API request simulation
  const deleteItemWithHistory = useCallback(
    async (itemId: string) => {
      setLoading(true);
      setError(null);

      try {
        // Find current item state for history
        const currentItem = items.find((i) => i.id === itemId);
        if (!currentItem) throw new Error('Item not found');

        // API request simulation
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Delete item from store
        deleteItem(listId, itemId);

        // Add record to history
        addToHistory({
          action: 'DELETE',
          listId,
          itemId,
          data: currentItem,
        });
      } catch (err) {
        setError('Error deleting item');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [listId, deleteItem, items]
  );

  // Function to mark item as purchased with API request simulation
  const toggleItemCompletedWithHistory = useCallback(
    async (itemId: string) => {
      setLoading(true);
      setError(null);

      try {
        // Find current item state for history
        const currentItem = items.find((i) => i.id === itemId);
        if (!currentItem) throw new Error('Item not found');

        // API request simulation
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mark item as purchased/not purchased in store
        toggleItemCompleted(listId, itemId);

        // Add record to history
        addToHistory({
          action: 'TOGGLE',
          listId,
          itemId,
          data: { completed: !currentItem.completed },
        });
      } catch (err) {
        setError('Error changing item status');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [listId, toggleItemCompleted, items]
  );

  // Function to undo last action
  const undoLastAction = useCallback(async () => {
    // Check if there are records in history
    if (history.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      // Get last record from history
      const lastRecord = history[history.length - 1];

      // API request simulation
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Undo action depending on its type
      switch (lastRecord.action) {
        case 'ADD':
          // If it was an addition, delete the item
          if (lastRecord.itemId) {
            deleteItem(lastRecord.listId, lastRecord.itemId);
          }
          break;

        case 'UPDATE':
          // If it was an update, restore previous state
          if (lastRecord.itemId && lastRecord.data?.before) {
            const { id, createdAt, updatedAt, ...itemData } =
              lastRecord.data.before;
            updateItem(lastRecord.listId, lastRecord.itemId, itemData);
          }
          break;

        case 'DELETE':
          // If it was a deletion, add the item back
          if (lastRecord.data) {
            const { id, createdAt, updatedAt, ...itemData } = lastRecord.data;
            addItem(lastRecord.listId, itemData);
          }
          break;

        case 'TOGGLE':
          // If it was a purchase status toggle, change status back
          if (lastRecord.itemId) {
            toggleItemCompleted(lastRecord.listId, lastRecord.itemId);
          }
          break;
      }

      // Remove last record from history
      setHistory((prev) => prev.slice(0, -1));
    } catch (err) {
      setError('Error undoing last action');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [history, addItem, updateItem, deleteItem, toggleItemCompleted]);

  // Synchronization with localStorage when list changes
  useEffect(() => {
    if (currentList) {
      // In a real application, there would be an API call here
      // But we already use persist middleware in Zustand
      // which automatically saves data to localStorage
    }
  }, [currentList]);

  return {
    items,
    loading,
    error,
    history,
    addItem: addItemWithHistory,
    updateItem: updateItemWithHistory,
    deleteItem: deleteItemWithHistory,
    toggleItemCompleted: toggleItemCompletedWithHistory,
    undoLastAction,
  };
};
