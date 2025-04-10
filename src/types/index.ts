export type ShoppingItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: Category;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ShoppingList = {
  id: string;
  name: string;
  items: ShoppingItem[];
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: string;
  name: string;
};

export type Unit = {
  id: string;
  name: string;
  shortName: string;
};
