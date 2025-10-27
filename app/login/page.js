"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const { login, googleSignIn, githubSignIn, facebookSignIn } = UserAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/profile");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  const handleOAuth = async (provider) => {
    try {
      await provider();
      router.push("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-2 mt-6">
          <button
            onClick={() => handleOAuth(googleSignIn)}
            className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Continue with Google
          </button>
          <button
            onClick={() => handleOAuth(githubSignIn)}
            className="bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
          >
            Continue with GitHub
          </button>
          <button
            onClick={() => handleOAuth(facebookSignIn)}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
