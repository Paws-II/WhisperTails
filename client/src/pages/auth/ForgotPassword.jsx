import React, { useState } from "react";
import axios from "axios";
import RequestOtp from "../../components/auth/RequestOtp";
import VerifyOTP from "../../components/auth/VerifyOTP";
import ResetPassword from "../../components/auth/ResetPassword";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setMessage({ type: "error", text: "Please enter your email" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/forgot-password/request`,
        { email: formData.email },
        { withCredentials: true }
      );

      if (response.data.success) {
        setMessage({
          type: "success",
          text: "OTP sent to your email. Please check your inbox.",
        });
        setStep(2);
      }
    } catch (err) {
      console.error("Request OTP error:", err);
      const errorMessage = err.response?.data?.message || "Failed to send OTP";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      setMessage({ type: "error", text: "Please enter the OTP" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/forgot-password/verify-otp`,
        { email: formData.email, otp: formData.otp },
        { withCredentials: true }
      );

      if (response.data.success) {
        setMessage({
          type: "success",
          text: "OTP verified! Now set your new password.",
        });
        setStep(3);
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      const errorMessage =
        err.response?.data?.message || "Invalid or expired OTP";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!formData.newPassword || !formData.confirmPassword) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }
    if (formData.newPassword.length < 8) {
      setMessage({
        type: "error",
        text: "Password must be at least 8 characters long",
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/forgot-password/reset`,
        {
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setMessage({
          type: "success",
          text: "Password reset successful! Redirecting to login...",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err) {
      console.error("Reset password error:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to reset password";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/forgot-password/resend-otp`,
        { email: formData.email },
        { withCredentials: true }
      );

      if (response.data.success) {
        setMessage({ type: "success", text: "New OTP sent to your email" });
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to resend OTP";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div
        className="
          w-full max-w-md p-6 rounded-xl shadow-lg
          bg-gray-800/80 border border-gray-700
        "
      >
        <h2 className="mb-6 text-3xl font-semibold text-center text-blue-400">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Reset Password"}
        </h2>

        {message.text && (
          <div
            className={
              message.type === "error"
                ? "mb-4 p-3 rounded-lg text-sm bg-red-900/30 text-red-400 border border-red-500"
                : "mb-4 p-3 rounded-lg text-sm bg-green-900/30 text-green-400 border border-green-500"
            }
          >
            {message.text}
          </div>
        )}

        {step === 1 && (
          <RequestOtp
            formData={formData}
            loading={loading}
            handleInputChange={handleInputChange}
            handleRequestOTP={handleRequestOTP}
          />
        )}

        {step === 2 && (
          <VerifyOTP
            formData={formData}
            loading={loading}
            handleInputChange={handleInputChange}
            handleVerifyOTP={handleVerifyOTP}
            handleResendOTP={handleResendOTP}
            setStep={setStep}
          />
        )}

        {step === 3 && (
          <ResetPassword
            formData={formData}
            loading={loading}
            handleInputChange={handleInputChange}
            handleResetPassword={handleResetPassword}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
