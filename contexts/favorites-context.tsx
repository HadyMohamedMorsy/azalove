"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
  selectedColor?: string;
}

interface FavoritesContextType {
  favoriteItems: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: number, selectedColor?: string) => void;
  isFavorite: (id: number, selectedColor?: string) => boolean;
  getTotalFavorites: () => number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavoriteItems((prev) => {
      const exists = prev.find(
        (favItem) =>
          favItem.id === item.id && favItem.selectedColor === item.selectedColor
      );

      if (!exists) {
        return [...prev, item];
      }

      return prev;
    });
  };

  const removeFromFavorites = (id: number, selectedColor?: string) => {
    setFavoriteItems((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.selectedColor === selectedColor)
      )
    );
  };

  const isFavorite = (id: number, selectedColor?: string) => {
    return favoriteItems.some(
      (item) => item.id === id && item.selectedColor === selectedColor
    );
  };

  const getTotalFavorites = () => {
    return favoriteItems.length;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteItems,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        getTotalFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
