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
  selectedItems: Set<number>;
  setSelectedItems: React.Dispatch<React.SetStateAction<Set<number>>>;
  toggleItemSelection: (itemId: number) => void;
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

  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  const toggleItemSelection = (itemId: number) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId);
    } else {
      newSelectedItems.add(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

  // Deselect all items
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
        deselectAllItems,
        isSheetOpen,
        setIsSheetOpen,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
