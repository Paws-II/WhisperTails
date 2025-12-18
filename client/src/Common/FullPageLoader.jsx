import React from "react";
import { PawPrint } from "lucide-react";

const FullPageLoader = ({
  title = "Loading your dashboard…",
  subtitle = "Fetching the latest updates for you",
}) => {
  return (
    <div className="min-h-screen bg-[#1e202c] flex items-center justify-center px-4">
      <div className="relative flex flex-col items-center text-center">
        <div className="relative mb-6 h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-[#60519b]/30 border-t-[#60519b] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <PawPrint size={32} className="text-[#60519b] animate-pulse" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        <p className="mt-2 text-sm text-[#bfc0d1]">{subtitle}</p>
      </div>
    </div>
  );
};

export default FullPageLoader;
