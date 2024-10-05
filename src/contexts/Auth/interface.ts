import { User } from "firebase/auth";

// Define interfaces for our context state and props
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  resendEmailVerification: (user: User) => Promise<void>;
}

export interface AuthProviderProps {
  children: JSX.Element;
}