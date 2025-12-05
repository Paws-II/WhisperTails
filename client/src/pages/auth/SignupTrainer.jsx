import React from "react";

const SignupTrainer = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-800">
      <div
        className="
          w-full max-w-md p-6 rounded-xl shadow-lg 
          bg-gray-800/80 border border-gray-700
        "
      >
        <h2 className="mb-6 text-3xl font-semibold text-center text-blue-400">
          Signup for Trainers
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full px-4 py-2 rounded-lg
                bg-gray-900 text-gray-200 
                border border-gray-700
                focus:outline-none focus:border-blue-500
              "
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="
                w-full px-4 py-2 rounded-lg
                bg-gray-900 text-gray-200 
                border border-gray-700
                focus:outline-none focus:border-blue-500
              "
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter password"
              className="
                w-full px-4 py-2 rounded-lg
                bg-gray-900 text-gray-200
                border border-gray-700
                focus:outline-none focus:border-blue-500
              "
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="
                w-full px-4 py-2 rounded-lg
                bg-gray-900 text-gray-200
                border border-gray-700
                focus:outline-none focus:border-blue-500
              "
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4" />
            <p className="text-sm text-gray-300">
              I agree to the{" "}
              <span className="text-blue-400 cursor-pointer">
                Terms & Conditions
              </span>
            </p>
          </div>

          <button
            type="submit"
            className="
              w-full py-2 mt-4 font-semibold rounded-lg text-white
              bg-blue-500 hover:bg-blue-600 transition
            "
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupTrainer;
