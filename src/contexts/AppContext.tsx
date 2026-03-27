import React, { createContext, useContext, useState, useEffect } from 'react';
import { Crop, Product } from '@/types';

interface UserProfile {
  name: string;
  avatar: string;
  storeName: string;
}

interface AppContextType {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  crops: Crop[];
  setCrops: React.Dispatch<React.SetStateAction<Crop[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('agro_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      name: 'Agricultor',
      avatar: '',
      storeName: 'Minha Loja Agro'
    };
  });

  const [crops, setCrops] = useState<Crop[]>(() => {
    const saved = localStorage.getItem('agro_crops');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [];
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('agro_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('agro_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('agro_crops', JSON.stringify(crops));
  }, [crops]);

  useEffect(() => {
    localStorage.setItem('agro_products', JSON.stringify(products));
  }, [products]);

  return (
    <AppContext.Provider value={{ profile, setProfile, crops, setCrops, products, setProducts }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
