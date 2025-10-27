"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, githubSignIn, facebookSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await githubSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/about">About</Link>
        </li>
        {user && (
          <li className="p-2 cursor-pointer">
            <Link href="/profile">Profile</Link>
          </li>
        )}
      </ul>

      {loading ? null : !user ? (
        <div className="flex gap-2">
          <button
            onClick={handleGoogleSignIn}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Google
          </button>
          <button
            onClick={handleGithubSignIn}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            GitHub
          </button>
          <button
            onClick={handleFacebookSignIn}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Facebook
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <p className="font-medium">Welcome, {user.displayName}</p>
          <button
            onClick={handleSignOut}
            className="bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
