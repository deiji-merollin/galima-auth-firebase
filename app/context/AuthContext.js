import { createContext, useContext, useState, useEffect } from "react";
import {
GoogleAuthProvider,
signInWithPopup,
signOut,
onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

// Create a context for authentication
const AuthContext = createContext();

// Auth provider component
export const AuthContextProvider = ({ children }) => {
const [user, setUser] = useState(null);

// Google sign-in
const googleSignIn = async () => {
try {
const provider = new GoogleAuthProvider();
await signInWithPopup(auth, provider);
} catch (error) {
console.error("Google sign-in error:", error);
}
};

// Log out
const logOut = async () => {
try {
await signOut(auth);
} catch (error) {
console.error("Sign-out error:", error);
}
};

// Listen for auth state changes
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser || null);
  });

  // Cleanup listener on unmount
  return () => unsubscribe();
}, []);


return (
<AuthContext.Provider value={{ user, googleSignIn, logOut }}>
{children}
</AuthContext.Provider>
);
};

// Custom hook to use AuthContext
export const UserAuth = () => useContext(AuthContext);
