import { Timestamp } from "firebase/firestore";

export interface LikedPhoto {
  breedName: string;
  imageUrl: string;
  timestamp: Timestamp;
}

export interface UserBreeds {
  favoriteBreeds: string[];
  likedPhotos: LikedPhoto[];
}

export interface BreedsProviderProps {
    children: JSX.Element;
  }

export interface BreedsContextType {
  favoriteBreeds: string[];
  likedPhotos: LikedPhoto[];
  loading: boolean;
  addFavoriteBreed: (breed: string) => Promise<void>;
  addListOfFavoriteBreeds: (breeds: string[]) => Promise<void>;
  removeFavoriteBreed: (breed: string) => Promise<void>;
  likePhoto: (breedName: string, imageUrl: string) => Promise<void>;
}
