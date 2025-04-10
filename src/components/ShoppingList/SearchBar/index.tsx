import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { value, onChange, placeholder = 'Search' } = props;
  const [localValue, setLocalValue] = useState(value);
  const debouncedSearchTerm = useDebounce(localValue, 500);

  // Synchronize local state with props
  useEffect(() => {
    onChange(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Handle input changes with delay for performance optimization
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    setLocalValue(newValue);
  };

  // Clear search query
  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        value={localValue}
        onChange={handleChange}
        className="text-lg md:text-lg h-10 pl-10 pr-10"
        placeholder={placeholder}
      />
      {localValue && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="h-6 w-6"
            title="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
