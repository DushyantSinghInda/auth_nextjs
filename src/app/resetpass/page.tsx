"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function resetpass() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    new_pass: "",
    conf_new_pass: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = React.useState("");

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log(urlToken);
    setToken(urlToken || "");
  }, []);

  const reset = async () => {
    try {
      setLoading(true);
      if (user.new_pass.length > 0) {
        if (user.new_pass == user.conf_new_pass) {
          const response = await axios.post("/api/users/resetpass", {
            user,
            token,
          });
          console.log("Password Changed successfully", response);
          toast.success("Password Changed successfully");
          router.push("/login");
        } else {
          console.log("Password Mismatch");
          toast.error("Password Mismatch");
        }
      }
    } catch (error: any) {
      console.log("Reset password failed", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <h1 className="text-2xl">Reset Your Password Here</h1>
      <br />
      <label htmlFor="new_pass">New Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg my-2 focus:outline-none focus:border-gray-600 text-black mb-5"
        type="password"
        id="new_pass"
        value={user.new_pass}
        onChange={(e) => setUser({ ...user, new_pass: e.target.value })}
        placeholder="New Password*"
      />
      <label htmlFor="conf_new_pass">Confirm New Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg my-2 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="password"
        value={user.conf_new_pass}
        onChange={(e) => setUser({ ...user, conf_new_pass: e.target.value })}
        placeholder="Confirm New Password*"
      />
      <button
        onClick={reset}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 my-3"
      >
        Reset Password
        {/* {buttonDisabled ? "No Login" : "Login"} */}
      </button>
    </div>
  );
}
