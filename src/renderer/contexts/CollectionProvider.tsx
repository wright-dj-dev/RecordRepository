import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface CollectionContextValue {
  collections: Collection[];
  fetchCollections: () => Promise<void>;
}

interface CollectionProviderProps {
  children: ReactNode;
}

export const CollectionContext = createContext<CollectionContextValue | undefined>(undefined);

export const CollectionProvider: React.FC<CollectionProviderProps> = ({ children }) => {
  const [collections, setCollections] = useState<Collection[]>([]);

  const fetchCollections = async () => {
    try {
      const collectionsData = (await window.electron.ipcRenderer.invoke(
        'get-collections',
      )) as Collection[];
      setCollections(collectionsData);
    } catch (error) {
      console.error('Database error:', error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <CollectionContext.Provider value={{ collections, fetchCollections }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollections = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollections must be used within a CollectionProvider');
  }
  return context;
};