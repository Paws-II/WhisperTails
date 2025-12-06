import React from "react";

const ResetPassword = ({
  formData,
  loading,
  handleInputChange,
  handleResetPassword,
}) => (
  <form onSubmit={handleResetPassword} className="space-y-5">
    <div>
      <label className="block mb-1 text-sm text-gray-300">New Password</label>
      <input
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleInputChange}
        placeholder="Enter new password"
        required
        className="w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block mb-1 text-sm text-gray-300">
        Confirm Password
      </label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        placeholder="Confirm new password"
        required
        className="w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:border-blue-500"
      />
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full py-2 mt-4 font-semibold rounded-lg text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50 transition"
    >
      {loading ? "Resetting..." : "Reset Password"}
    </button>
  </form>
);

export default ResetPassword;
