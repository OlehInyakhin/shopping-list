import { Edit, Trash2 } from 'lucide-react';
import { useShoppingStore } from '@/store/useShoppingStore';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ShoppingItem } from '@/types';

type ShoppingListItemProps = {
  item: ShoppingItem;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export const ShoppingListItem: React.FC<ShoppingListItemProps> = (props) => {
  const { item, onToggleComplete, onEdit, onDelete } = props;
  const { units } = useShoppingStore();
  const handleToggleComplete = () => {
    onToggleComplete(item.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(item.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(item.id);
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 border rounded-lg mb-2 transition-all',
        item.completed
          ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      )}
    >
      <div className="flex items-center space-x-4 flex-1">
        <Checkbox
          className="bg-white dark:bg-black/40 dark:border-gray-700"
          checked={item.completed}
          onCheckedChange={handleToggleComplete}
          id={`item-${item.id}`}
        />
        <div className="flex flex-col">
          <label
            htmlFor={`item-${item.id}`}
            className={cn(
              'text-xl font-medium cursor-pointer transition-all',
              item.completed
                ? 'text-gray-500 dark:text-gray-400 line-through'
                : 'text-gray-900 dark:text-gray-100'
            )}
          >
            {item.name}
          </label>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span>
              {item.quantity}{' '}
              {units.find((unit) => unit.id === item.unit)?.name ?? item.unit}
            </span>
            <span className="mx-2">•</span>
            <span>{item.category.name}</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleEdit}
          className="h-8 w-8 dark:hover:bg-gray-700"
          title="Edit"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
