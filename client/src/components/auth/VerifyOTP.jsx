const VerifyOTP = ({
  formData,
  loading,
  handleInputChange,
  handleVerifyOTP,
  handleResendOTP,
  setStep,
}) => (
  <form onSubmit={handleVerifyOTP} className="space-y-5">
    <div>
      <label className="block mb-1 text-sm text-gray-300">Enter OTP</label>
      <input
        type="text"
        name="otp"
        value={formData.otp}
        onChange={handleInputChange}
        placeholder="Enter 6-digit OTP"
        maxLength={6}
        required
        className="w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:border-blue-500"
      />
      <p className="mt-2 text-xs text-gray-400">OTP sent to {formData.email}</p>
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full py-2 font-semibold rounded-lg text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50 transition"
    >
      {loading ? "Verifying..." : "Verify OTP"}
    </button>

    <button
      type="button"
      onClick={handleResendOTP}
      disabled={loading}
      className="w-full py-2 font-semibold rounded-lg text-blue-400 bg-gray-900 hover:bg-gray-800 border border-gray-700 disabled:opacity-50 transition"
    >
      Resend OTP
    </button>

    <p className="mt-4 text-sm text-center text-gray-400">
      <button
        type="button"
        onClick={() => setStep(1)}
        className="text-blue-400 hover:underline"
      >
        Change Email
      </button>
    </p>
  </form>
);

export default VerifyOTP;
