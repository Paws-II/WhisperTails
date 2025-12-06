const RequestOtp = ({
  formData,
  loading,
  handleInputChange,
  handleRequestOTP,
}) => (
  <form onSubmit={handleRequestOTP} className="space-y-5">
    <div>
      <label className="block mb-1 text-sm text-gray-300">Email Address</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your registered email"
        required
        className="w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:border-blue-500"
      />
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full py-2 mt-4 font-semibold rounded-lg text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50 transition"
    >
      {loading ? "Sending OTP..." : "Send OTP"}
    </button>

    <p className="mt-4 text-sm text-center text-gray-400">
      Remember your password?{" "}
      <a href="/login" className="text-blue-400 hover:underline">
        Back to Login
      </a>
    </p>
  </form>
);

export default RequestOtp;
