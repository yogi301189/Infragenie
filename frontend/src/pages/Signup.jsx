import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ Signed up");
      window.location.href = "/";
    } catch (err) {
      console.error("Signup error:", err);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Email is already registered.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        default:
          setError("Signup failed. Please try again.");
      }
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("✅ Google Signup/Login successful");
      window.location.href = "/";
    } catch (error) {
      console.error("Google Sign-up Error:", error);
      alert("Google sign-up failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center px-4">
      <div className="bg-[#0f0f1a] p-8 rounded-xl shadow-md border border-slate-700 max-w-sm w-full">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">📝 Sign Up for InfraGenie</h2>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
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
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>

        <div className="my-4 flex items-center justify-center">
          <span className="text-slate-500 text-xs">or</span>
        </div>

        {/* 🔐 Google Sign-Up Button */}
        <button
          onClick={handleGoogleSignup}
          className="w-full bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-100 flex items-center justify-center"
        >
          <img src="/icons/google-icon.svg" alt="Google" className="h-5 mr-2" />
          Sign up with Google
        </button>

        <p className="text-slate-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
