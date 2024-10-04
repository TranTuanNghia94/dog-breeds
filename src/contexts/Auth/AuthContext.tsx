import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { AuthContextType, AuthProviderProps } from "./interface";


const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}


export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [user, setUser] = useState<User | null>();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);


    const signup = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Signup failed');
        }
    }


    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Login failed');
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Logout failed');
        }
    }


    const value = {
        user: user ?? null,
        loading,
        signup,
        login,
        logout,
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>

    )

}