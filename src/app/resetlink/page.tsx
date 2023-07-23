"use client";
import { Mail } from "lucide-react";

export default function resetlink() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Mail size={48} color="#6c70ea" strokeWidth={1.25} />
      <h4 className="text-[20px] w-[450px] text-center my-3">
        We have sent a password reset link to your registered email ID
      </h4>
      <h6 className="text-[15px] w-[400px] text-center">
        Click on the 'Reset Password' link sent to your email ID and create a
        new password
      </h6>
    </div>
  );
}
