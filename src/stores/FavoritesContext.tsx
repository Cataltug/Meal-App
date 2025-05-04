import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import {doc, setDoc, getDoc, collection} from "firebase/firestore";
import { db } from "../firebase/config";

export type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

type FavoritesContextType = {
    favorites: Meal[];
    addFavorite: (meal: Meal) => void;
    removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined> (
    undefined
);

export const FavoritesProvider = ({children}: {children: ReactNode}) => {
    const [favorites, setFavorites] = useState<Meal[]>([]);

    const addFavorite = async (meal: Meal) => {
        setFavorites((prev) => [...prev, meal])
    };

    const saveFavoritesToFireStore = async (favorites: Meal[]) => {
        await setDoc(doc(collection(db, "favorites")), {favorites})
    }

    const loadFavoritesFromFirestore = async (): Promise<Meal[]> => {
        const docSnap = await getDoc(doc(db, "favorites"));
        return docSnap.exists() ? docSnap.data().favorites : [];
    }

    const removeFavorite = (id: string) => {
        setFavorites((prev) => prev.filter((meal) => meal.idMeal !== id))
    }

    useEffect(() => {
      loadFavoritesFromFirestore().then(data => setFavorites(data));
    
    }, [])

    useEffect(() => {
      saveFavoritesToFireStore(favorites)
    
      
    }, [favorites])
    
    
    return(
        <FavoritesContext.Provider
        value={{favorites, addFavorite, removeFavorite}}>
            {children}
        </FavoritesContext.Provider>
    )
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if(!context) {
        throw new Error("useFavorites should be used with FavoritesProvider");
    }
    return context;
}