"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => signInWithPopup(auth, new GoogleAuthProvider());
  const githubSignIn = () => signInWithPopup(auth, new GithubAuthProvider());
  const facebookSignIn = () => signInWithPopup(auth, new FacebookAuthProvider());

  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, googleSignIn, githubSignIn, facebookSignIn, createUser, signIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Make sure this export exists and matches your import
export const UserAuth = () => {
  return useContext(AuthContext);
};
