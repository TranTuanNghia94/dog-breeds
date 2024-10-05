import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
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
            const result = await createUserWithEmailAndPassword(auth, email, password);
            sendEmailVerification(result.user)
            return result
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Signup failed');
        }
    }


    const resendEmailVerification = async (user: User) => {
        try {
            await sendEmailVerification(user)
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Resend email verification failed');
        }
    }


    const login = async (email: string, password: string) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result
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
        resendEmailVerification
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>

    )

}