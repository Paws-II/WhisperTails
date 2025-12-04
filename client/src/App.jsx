import React from "react";
import Navbar from "./pages/Guests/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 relative">
      <h1 className="text-4xl font-semibold text-blue-400 mb-8">
        This is working!.....
      </h1>

      <div className="w-fit max-w-4xl bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-xl">
        <Navbar />
      </div>
    </div>
  );
};

export default App;
