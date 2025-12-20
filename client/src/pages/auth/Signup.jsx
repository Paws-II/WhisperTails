import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Shield } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1e202c] text-[#bfc0d1] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-linear-to-br from-[#60519b]/20 via-transparent to-[#31323e]/40" />
      <div className="absolute top-24 left-24 w-96 h-96 bg-[#60519b]/30 rounded-full blur-3xl" />
      <div className="absolute bottom-24 right-24 w-96 h-96 bg-[#60519b]/30 rounded-full blur-3xl" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl bg-[#31323e]/50 backdrop-blur-lg border border-[#60519b]/30 rounded-3xl shadow-2xl shadow-[#60519b]/30 p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join{" "}
            <span className="bg-linear-to-r from-[#60519b] to-[#8b7bc4] bg-clip-text text-transparent">
              Pamels
            </span>
          </h1>
          <p className="text-lg text-[#bfc0d1]/80">
            Choose how you want to be part of our pet-loving community
          </p>
        </div>

        {/* Buttons */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Owner */}
          <button
            onClick={() => navigate("/signupOwner")}
            className="group relative overflow-hidden rounded-2xl border border-[#60519b]/30 bg-[#1e202c]/60 p-8 hover:border-[#60519b] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#60519b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

            <div className="relative z-10 flex flex-col items-start space-y-4">
              <div className="w-14 h-14 bg-linear-to-br from-[#60519b] to-[#7a6aad] rounded-xl flex items-center justify-center shadow-lg shadow-[#60519b]/40">
                <Users className="text-white" size={28} />
              </div>

              <h2 className="text-2xl font-bold text-white">Pet Owner</h2>

              <p className="text-[#bfc0d1]/80 leading-relaxed">
                Adopt pets, access trainers, and manage your pet’s journey with
                expert guidance.
              </p>

              <div className="flex items-center text-[#60519b] font-semibold">
                Continue as Owner
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </div>
            </div>
          </button>

          {/* Shelter */}
          <button
            onClick={() => navigate("/signupShelter")}
            className="group relative overflow-hidden rounded-2xl border border-[#60519b]/30 bg-[#1e202c]/60 p-8 hover:border-[#60519b] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#60519b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

            <div className="relative z-10 flex flex-col items-start space-y-4">
              <div className="w-14 h-14 bg-linear-to-br from-[#60519b] to-[#7a6aad] rounded-xl flex items-center justify-center shadow-lg shadow-[#60519b]/40">
                <Shield className="text-white" size={28} />
              </div>

              <h2 className="text-2xl font-bold text-white">
                Shelter / Trainer
              </h2>

              <p className="text-[#bfc0d1]/80 leading-relaxed">
                List pets, connect with adopters, and grow your trusted presence
                on Pamels.
              </p>

              <div className="flex items-center text-[#60519b] font-semibold">
                Continue as Shelter
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-sm text-[#bfc0d1]/60">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#60519b] cursor-pointer hover:underline"
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
