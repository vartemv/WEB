import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FormData {
  name: string;
  category: string;
  price: number;
  quantity: number;
  min_stock_level: number;
}

interface FormDataContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  // selectedItems: Set<number>;
  selectedItems: Set<{ id: number; label: string; quantity: number }>;
  // setSelectedItems: React.Dispatch<React.SetStateAction<Set<number>>>;
  setSelectedItems: React.Dispatch<React.SetStateAction<Set<{ id: number; label: string; quantity: number }>>>;
  // toggleItemSelection: (itemId: number) => void;
  toggleItemSelection: (item_id: number, label: string) => void;
  changeItemQuantity: (item_id: number, quantity: number) => void;
  deselectAllItems: () => void;
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};

interface FormDataProviderProps {
  children: ReactNode;
}

export const FormDataProvider: React.FC<FormDataProviderProps> = ({ children }) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    min_stock_level: 0,
  });

  const [selectedItems, setSelectedItems] = useState<Set<{ id: number; label: string; quantity: number }>>(new Set());

  const toggleItemSelection = (item_id: number, name: string) => {
    const newSelectedItems = new Set(selectedItems);
    const existingItem = Array.from(newSelectedItems).find(item => item.id === item_id && item.label === name);
    if (existingItem) {
      newSelectedItems.delete(existingItem);
    } else {
      newSelectedItems.add({ id: item_id, label: name, quantity: 0 });
    }
  
    setSelectedItems(newSelectedItems);
  };

  const changeItemQuantity = (item_id: number, quantity: number) => {
    const newSelectedItems = new Set(selectedItems);
    const updatedItems = Array.from(newSelectedItems).map(item => {
      if (item.id === item_id) {
        return { ...item, quantity };
      }
      return item;
    });

    setSelectedItems(new Set(updatedItems));
  };

  const deselectAllItems = () => {
    setSelectedItems(new Set());
  };

  return (
    <FormDataContext.Provider
      value={{
        formData,
        setFormData,
        selectedItems,
        setSelectedItems,
        toggleItemSelection,
        changeItemQuantity,
        deselectAllItems,
        isSheetOpen,
        setIsSheetOpen,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
