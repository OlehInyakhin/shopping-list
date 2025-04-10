import { useState } from 'react';
import { Undo2 } from 'lucide-react';
import { useShoppingStore } from '@/store/useShoppingStore';
import { useShoppingList } from '@/hooks/useShoppingList';
import { useFilter } from '@/hooks/useFilter';
import { ShoppingItem } from '@/types';
import { ShoppingListItem } from '@/components/ShoppingList/ShoppingListItem';
import { AddItemForm } from '@/components/ShoppingList/AddItemForm';
import { EditItemForm } from '@/components/ShoppingList/EditItemForm';
import { FilterPanel } from '@/components/ShoppingList/FilterPanel';
import { SearchBar } from '@/components/ShoppingList/SearchBar';
import { Button } from '@/components/ui/button';

export const ShoppingList = () => {
  // Get data and methods for working with the shopping list
  const { lists, currentListId } = useShoppingStore();
  const listId = currentListId ?? '';
  const {
    items,
    loading,
    error,
    deleteItem,
    toggleItemCompleted,
    undoLastAction,
    history,
  } = useShoppingList(listId);
  const currListName = lists.find((list) => list.id === listId)?.name ?? '';

  // State for editing an item
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Use the filter hook for searching and filtering items
  const {
    filter,
    filteredItems,
    categories,
    filterByCategory,
    filterByCompleted,
    setSearchQuery,
    resetFilters,
  } = useFilter(items);

  // Event handlers
  const handleToggleComplete = (id: string) => {
    toggleItemCompleted(id);
  };

  const handleEdit = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setEditingItem(item);
      setIsEditDialogOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(id);
    }
  };

  if (!currentListId) {
    return (
      <div className="container mx-auto p-4 max-w-3xl text-center py-12">
        <p className="text-gray-500">Select or create a shopping list</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      {/* Title and undo button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Shopping List: <em>{currListName}</em>
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={undoLastAction}
          disabled={history.length === 0 || loading}
          title="Undo last action"
        >
          <Undo2 className="mr-2 h-4 w-4" />
          Undo
        </Button>
      </div>

      <div className="flex items-start gap-4">
        {/* Search and filtering */}
        <SearchBar
          value={filter.searchQuery}
          onChange={setSearchQuery}
          placeholder="Search items..."
        />

        {/* Add item form */}
        <AddItemForm listId={listId} />
      </div>

      {/* Filter panel */}
      <FilterPanel
        categories={categories}
        selectedCategory={filter.category}
        selectedStatus={filter.completed}
        onCategoryChange={filterByCategory}
        onStatusChange={filterByCompleted}
        onReset={resetFilters}
      />

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Items list */}
      <div className="space-y-2 relative">
        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center text-center py-4 absolute w-full h-full bg-gray-50/40 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 m-auto"></div>
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {items.length === 0
              ? 'List is empty. Add items to purchase.'
              : 'No items matching the filters.'}
          </div>
        ) : (
          filteredItems.map((item) => (
            <ShoppingListItem
              key={item.id}
              item={item}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Edit item form */}
      <EditItemForm
        listId={listId}
        item={editingItem}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSuccess={() => setEditingItem(null)}
      />
    </div>
  );
};

export default ShoppingList;
