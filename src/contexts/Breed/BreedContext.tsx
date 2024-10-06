import { createContext, useContext, useEffect, useState} from "react";
import { BreedsContextType, BreedsProviderProps, LikedPhoto, UserBreeds } from "./interface";
import { useAuth } from "../Auth/AuthContext";
import { arrayUnion, doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const BreedsContext = createContext<BreedsContextType>({} as BreedsContextType);

export function useBreeds(): BreedsContextType {
    const context = useContext(BreedsContext);
    if (context === undefined) {
      throw new Error('useBreeds must be used within a BreedsProvider');
    }
    return context;
  }
  
  // Provider component
  export const BreedsProvider = ({ children }: BreedsProviderProps): JSX.Element => {
    const [userBreeds, setUserBreeds] = useState<UserBreeds>({
      favoriteBreeds: [],
      likedPhotos: []
    });
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
  
    useEffect(() => {
      if (user) {
        fetchUserBreeds();
      }
    }, [user]);
  
    const fetchUserBreeds = async (): Promise<void> => {
      if (!user) return;
  
      try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
  
        if (userDoc.exists()) {
          setUserBreeds(userDoc.data() as UserBreeds);
        } else {
          await setDoc(userRef, {
            favoriteBreeds: [],
            likedPhotos: []
          });
        }
      } catch (error) {
        console.error('Error fetching user breeds:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const addFavoriteBreed = async (breed: string): Promise<void> => {
      if (!user) return;
  
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          favoriteBreeds: arrayUnion(breed)
        });
        setUserBreeds(prev => ({
          ...prev,
          favoriteBreeds: [...prev.favoriteBreeds, breed]
        }));
      } catch (error) {
        throw new Error('Failed to add favorite breed');
      }
    };

    const addListOfFavoriteBreeds = async (breeds: string[]): Promise<void> => {
      if (!user) return;
  
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          favoriteBreeds: breeds
        });
        setUserBreeds(prev => ({
          ...prev,
          favoriteBreeds: [...breeds]
        }));
      } catch (error) {
        throw new Error('Failed to add favorite breed');
      }
    };
  
    const removeFavoriteBreed = async (breed: string): Promise<void> => {
      if (!user) return;
  
      try {
        const userRef = doc(db, 'users', user.uid);
        const updatedBreeds = userBreeds.favoriteBreeds.filter(b => b !== breed);
        await updateDoc(userRef, {
          favoriteBreeds: updatedBreeds
        });
        setUserBreeds(prev => ({
          ...prev,
          favoriteBreeds: updatedBreeds
        }));
      } catch (error) {
        throw new Error('Failed to remove favorite breed');
      }
    };
  
    const likePhoto = async (breedName: string, imageUrl: string): Promise<void> => {
      if (!user) return;
  
      try {
        const userRef = doc(db, 'users', user.uid);
        const newLikedPhoto: LikedPhoto = {
          breedName,
          imageUrl,
          timestamp: Timestamp.now()
        };
        await updateDoc(userRef, {
          likedPhotos: arrayUnion(newLikedPhoto)
        });
        setUserBreeds(prev => ({
          ...prev,
          likedPhotos: [...prev.likedPhotos, newLikedPhoto]
        }));
      } catch (error) {
        throw new Error('Failed to like photo');
      }
    };
  
    const value = {
      favoriteBreeds: userBreeds.favoriteBreeds,
      likedPhotos: userBreeds.likedPhotos,
      loading,
      addFavoriteBreed,
      addListOfFavoriteBreeds,
      removeFavoriteBreed,
      likePhoto
    };
  
    return (
      <BreedsContext.Provider value={value}>
        {children}
      </BreedsContext.Provider>
    );
  }