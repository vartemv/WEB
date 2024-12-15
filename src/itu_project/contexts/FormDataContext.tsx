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
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    min_stock_level: 0,
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
