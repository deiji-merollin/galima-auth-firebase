"use client";
import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { createUser } = UserAuth(); // ✅ make sure it matches the export
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col w-80 gap-3">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="p-2 rounded bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded mt-2 hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
