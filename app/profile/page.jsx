"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, logOut } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <div>
      <h1>Welcome, {user?.displayName || user?.email}</h1>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}
