import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterX } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useShoppingStore } from '@/store/useShoppingStore';

type FilterPanelProps = {
  categories: string[];
  selectedCategory: string | null;
  selectedStatus: boolean | null;
  onCategoryChange: (category: string | null) => void;
  onStatusChange: (status: boolean | null) => void;
  onReset: () => void;
};

// Validation schema for the filter form
const filterSchema = z.object({
  category: z.string().nullable(),
  status: z.boolean().nullable(),
});

type FilterFormValues = z.infer<typeof filterSchema>;

export const FilterPanel: React.FC<FilterPanelProps> = (props) => {
  const {
    categories,
    selectedCategory,
    selectedStatus,
    onCategoryChange,
    onStatusChange,
    onReset,
  } = props;
  const { categories: categoriesList } = useShoppingStore();
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      category: selectedCategory,
      status: selectedStatus,
    },
  });

  // Update form when props change
  useEffect(() => {
    form.setValue('category', selectedCategory);
    form.setValue('status', selectedStatus);
  }, [selectedCategory, selectedStatus]);

  // Determine checkbox state based on selected status
  const getCheckboxState = () => {
    if (selectedStatus === null) return 'indeterminate';
    return selectedStatus;
  };

  return (
    <Form {...form}>
      <div className="flex text-left flex-col sm:flex-row gap-3 py-4">
        <div className="flex-1 sm:max-w-[200px]">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium block mb-1">
                  Category
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    onCategoryChange(value === 'all' ? null : value);
                  }}
                  value={field.value ?? 'all'}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {categoriesList.find((item) => item.id === category)
                          ?.name ?? category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex-1">
          <FormField
            control={form.control}
            name="status"
            render={() => (
              <FormItem>
                <FormLabel className="text-sm font-medium block mb-3">
                  Status
                </FormLabel>
                <div className="flex flex-wrap items-start gap-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-all"
                      checked={getCheckboxState() === 'indeterminate'}
                      onCheckedChange={() => onStatusChange(null)}
                    />
                    <label
                      htmlFor="status-all"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      All
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-completed"
                      checked={selectedStatus === true}
                      onCheckedChange={() => onStatusChange(true)}
                    />
                    <label
                      htmlFor="status-completed"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Purchased
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-active"
                      checked={selectedStatus === false}
                      onCheckedChange={() => onStatusChange(false)}
                    />
                    <label
                      htmlFor="status-active"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Not purchased
                    </label>
                  </div>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={onReset}
            className="w-full sm:w-auto"
            disabled={!selectedCategory && selectedStatus === null}
          >
            <FilterX className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </Form>
  );
};
