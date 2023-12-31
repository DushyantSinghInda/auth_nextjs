"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
  });
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.data);
    setData({
      ...data,
      id: res.data.data._id,
      email: res.data.data.email,
      name: res.data.data.username,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2
        className={
          data.id === ""
            ? ""
            : "my-3 p-3 rounded border-2 border-dashed hover:border-solid border-[white] "
        }
      >
        {
          <Link href={`/profile/${data.id}`}>
            {
              <h2 className="text-center mb-2 text-2xl font-[600]">
                {data.name}
              </h2>
            }{" "}
            {<h3 className="text-xl italic ">{data.email}</h3>}
          </Link>
        }
      </h2>
      <hr />
      <button
        onClick={logout}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="mt-4 bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get User Details
      </button>
    </div>
  );
}
