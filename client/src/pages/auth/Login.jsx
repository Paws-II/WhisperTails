import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-800">
      <div
        className="
          w-full max-w-md p-6 rounded-xl shadow-lg
          bg-gray-800/80 border border-gray-700
        "
      >
        <h2 className="mb-6 text-3xl font-semibold text-center text-blue-400">
          Login
        </h2>

        <button
          type="button"
          className="
            w-full py-2 mb-5 rounded-lg font-medium
            flex items-center justify-center gap-2
            bg-gray-900/60 text-gray-200
            border border-gray-600
            hover:bg-gray-900 transition
          "
        >
          <span
            className="
              w-5 h-5 rounded-full bg-white
              flex items-center justify-center
              text-xs font-bold text-gray-800
            "
          >
            G
          </span>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center my-4">
          <div className="grow h-px bg-gray-700" />
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="grow h-px bg-gray-700" />
        </div>

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
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm text-gray-300">Password</label>
              <button
                type="button"
                className="text-xs text-blue-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              className="
                w-full px-4 py-2 rounded-lg
                bg-gray-900 text-gray-200
                border border-gray-700
                focus:outline-none focus:border-blue-500
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full py-2 mt-4 font-semibold rounded-lg text-white
              bg-blue-500 hover:bg-blue-600 transition
            "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
