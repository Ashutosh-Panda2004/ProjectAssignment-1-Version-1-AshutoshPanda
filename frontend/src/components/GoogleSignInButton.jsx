import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleSignInButton = () => {
  const handleSignIn = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleSignIn}
        className="group relative flex items-center justify-center gap-3 w-64 py-3 px-6 
        bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-full shadow-lg 
        hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300
        before:absolute before:inset-0 before:border before:border-gray-200 
        before:rounded-full before:transition-all before:duration-300
        hover:before:scale-105 before:opacity-0 hover:before:opacity-100"
      >
        <FcGoogle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
        <span className="text-gray-700">Sign in with Google</span>
      </button>
      <div className="flex items-center gap-3">
        <div className="h-px w-16 bg-white/20"></div>
        <span className="text-white/60 text-sm">or continue with email</span>
        <div className="h-px w-16 bg-white/20"></div>
      </div>
    </div>
  );
};

export default GoogleSignInButton;