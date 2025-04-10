import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useShoppingStore } from '@/store/useShoppingStore';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import logoSrc from '@/assets/logo.svg';
import { ThemeToggle } from '@/components/ThemeToggle';

function Header() {
  const { lists, createList, currentListId, setCurrentList } =
    useShoppingStore();
  const [newListName, setNewListName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Set the first list as current on load if lists exist and current is not selected
  useEffect(() => {
    if (lists.length > 0 && !currentListId) {
      setCurrentList(lists[0].id);
    }
  }, [lists, currentListId, setCurrentList]);

  // Handler for creating a new list
  const handleCreateList = () => {
    if (newListName) {
      createList(newListName);
      setNewListName('');
      setIsDialogOpen(false);
    }
  };

  // Handler for changing the current list
  const handleListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentList(e.target.value.trim());
  };

  return (
    <header className="bg-card border-b shadow">
      <div className="container mx-auto p-4 max-w-3xl flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">
            <img
              src={logoSrc}
              alt="Shopping List"
              className="h-8 w-8 inline-block mr-2"
            />
          </h1>
          {lists.length > 1 && (
            <select
              value={currentListId || ''}
              onChange={handleListChange}
              className="border rounded-md p-1 text-sm bg-background border-input"
            >
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-1 h-4 w-4" /> New List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New List</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <Input
                  placeholder="List Name"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateList()}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateList}
                    disabled={!newListName.trim()}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}

export default Header;
