"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

export default function Forgotpass() {
  const router = useRouter();
  const [user, setUser] = React.useState({ email: "" });
  const [loading, setLoading] = React.useState(false);

  const onContinue = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpass", user);
      console.log("Please check your email", response.data);
      router.push("/resetlink");
    } catch (error: any) {
      console.log("Failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h3>{loading ? "Processing" : ""}</h3>
      <h1 className="text-3xl p-3">Forgot Your Password?</h1>
      <p className="text-left text-[15px] p-3">
        Enter your email address and we will send you instructions to reset your
        password.
      </p>
      <label htmlFor="email" className="p-2">
        Email
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email..."
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onContinue}
      >
        Continue
      </button>
      <Link href="/login" className="p-2">
        Visit Login Page
      </Link>
      <Link href="/signup" className="p-2">
        New User
      </Link>
    </div>
  );
}
