import React from "react";
import { useAuth } from "../../contexts/AuthContext";

function WelcomeBanner() {
  const { user, loggedIn } = useAuth();
  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-purple-600 to-indigo-700 py-16 px-8 text-center shadow-xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Welcome back user
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 opacity-90">
              Here's what's happening with your account today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;
