"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/app/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔹 Email/Password Methods
  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // 🔹 OAuth Providers
  const googleSignIn = () => signInWithPopup(auth, new GoogleAuthProvider());
  const githubSignIn = () => signInWithPopup(auth, new GithubAuthProvider());
  const facebookSignIn = () => signInWithPopup(auth, new FacebookAuthProvider());

  // 🔹 Logout
  const logOut = () => signOut(auth);

  // 🔹 Track User State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        googleSignIn,
        githubSignIn,
        facebookSignIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
