import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Logged in");
      navigate("/"); // Redirect after login
    } catch (err) {
      console.error("Login error:", err.code);
      switch (err.code) {
        case "auth/user-not-found":
          setError("User not found. Please sign up.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        default:
          setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center px-4">
      <div className="bg-[#0f0f1a] p-8 rounded-xl shadow-md border border-slate-700 max-w-sm w-full">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">🔐 Login to InfraGenie</h2>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">Login</Button>
        </form>
        <p className="text-slate-400 text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-400 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
