import React from "react";

const NextSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-end px-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent"></div>

      {/* Main content box on the right */}
      <div className="relative z-30 max-w-2xl w-full mr-12">
        <div
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20"
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(167, 139, 250, 0.3)",
          }}
        >
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-white leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Companion
              </span>
            </h2>

            <p className="text-lg text-white/80 leading-relaxed">
              Every pet deserves a loving home. Browse through our collection of
              adorable animals waiting to meet their forever families. Start
              your journey today.
            </p>

            <div className="flex gap-4 pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                Browse Pets
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements around the box */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Card peek area - where cards will slide behind */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[200px] pointer-events-none z-10">
        {/* This creates the layering effect where cards appear to go behind */}
      </div>
    </div>
  );
};

export default NextSection;
