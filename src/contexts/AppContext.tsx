import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  avatar: string;
  storeName: string;
}

interface AppContextType {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
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

  useEffect(() => {
    localStorage.setItem('agro_profile', JSON.stringify(profile));
  }, [profile]);

  return (
    <AppContext.Provider value={{ profile, setProfile }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
