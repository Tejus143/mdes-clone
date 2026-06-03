import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type AppContextState = {
  globalSearch: string;
  setGlobalSearch: (value: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const AppContext = createContext<AppContextState | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [globalSearch, setGlobalSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const value = useMemo(
    () => ({
      globalSearch,
      setGlobalSearch,
      darkMode,
      toggleDarkMode,
    }),
    [globalSearch, darkMode],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
