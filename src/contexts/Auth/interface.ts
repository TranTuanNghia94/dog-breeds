import { User } from "firebase/auth";

// Define interfaces for our context state and props
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: JSX.Element;
}