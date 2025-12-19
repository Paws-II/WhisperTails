import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Award,
  TrendingUp,
  Users,
  Camera,
  Save,
  Shield,
  AlertCircle,
} from "lucide-react";
import NavbarShelter from "../../components/Shelters/NavbarShelter";
import FullPageLoader from "../../Common/FullPageLoader";
import FullPageError from "../../Common/FullPageError";
import ShelterToast from "../../Common/ShelterToast";
import { useSocket } from "../../../hooks/useSocket";
import defaultAvatar from "../../assets/Shelter/default-shelter.png";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ShelterUpdateProfile = () => {
  const { emit, on } = useSocket();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    bio: "",
    specialization: "",
    experience: 0,
    capacity: 0,
  });

  useEffect(() => {
    fetchProfile();

    // Listen for real-time updates
    const unsubProfile = on("profile:updated", (data) => {
      setProfile(data.profile);
      showToast("success", "Profile Updated", "Changes synced in real-time");
    });

    const unsubAvatar = on("avatar:updated", (data) => {
      setProfile((prev) => ({ ...prev, avatar: data.avatar }));
      showToast("success", "Avatar Updated", "Profile picture updated");
    });

    return () => {
      unsubProfile();
      unsubAvatar();
    };
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/api/shelter/profile`, {
        withCredentials: true,
      });

      if (response.data.success) {
        const profileData = response.data.profile;
        setProfile(profileData);
        setFormData({
          name: profileData.name || "",
          phone: profileData.phone || "",
          address: profileData.address || "",
          bio: profileData.bio || "",
          specialization: profileData.specialization || "",
          experience: profileData.experience || 0,
          capacity: profileData.capacity || 0,
        });
      }
    } catch (err) {
      console.error("Fetch profile error:", err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "experience" || name === "capacity" ? Number(value) : value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast("error", "File Too Large", "Avatar must be under 2MB");
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const response = await axios.put(
        `${API_URL}/api/shelter/profile/avatar`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        setProfile((prev) => ({ ...prev, avatar: response.data.avatar }));
        setAvatarFile(null);
        setAvatarPreview(null);
        showToast(
          "success",
          "Avatar Updated",
          "Profile picture updated successfully"
        );
        emit("profile:avatar:updated", { avatar: response.data.avatar });
      }
    } catch (err) {
      console.error("Avatar upload error:", err);
      showToast(
        "error",
        "Upload Failed",
        err.response?.data?.message || "Failed to update avatar"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await axios.put(
        `${API_URL}/api/shelter/profile`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        setProfile(response.data.profile);
        showToast(
          "success",
          "Profile Updated",
          "Your shelter profile has been updated"
        );
        emit("profile:updated", { profile: response.data.profile });
      }
    } catch (err) {
      console.error("Update profile error:", err);
      showToast(
        "error",
        "Update Failed",
        err.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  if (loading) {
    return (
      <FullPageLoader
        title="Loading Profile…"
        subtitle="Fetching your shelter information"
      />
    );
  }

  if (error) return <FullPageError message={error} onRetry={fetchProfile} />;

  const currentAvatar =
    avatarPreview ||
    (profile?.avatar && profile.avatar !== "url" && profile.avatar.trim() !== ""
      ? profile.avatar
      : defaultAvatar);

  return (
    <div className="min-h-screen bg-[#1e202c] flex">
      <NavbarShelter onLogout={handleLogout} />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-[#4a5568] p-2">
                <Shield size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Update Profile</h1>
            </div>
            <p className="text-[#bfc0d1]/80">
              Manage your shelter information and settings
            </p>
          </div>

          {/* Avatar Section */}
          <div className="mb-8 rounded-2xl border border-[#4a5568]/20 bg-[#31323e] p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
              <Camera size={20} />
              Profile Picture
            </h2>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative">
                <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-[#4a5568]">
                  <img
                    src={currentAvatar}
                    alt="Shelter avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1">
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className="mb-2 inline-block cursor-pointer rounded-lg bg-[#4a5568] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#5a6678]"
                >
                  Choose File
                </label>
                <p className="text-xs text-[#bfc0d1]/60">
                  Max size: 2MB. Formats: JPG, PNG, GIF, WEBP
                </p>

                {avatarFile && (
                  <button
                    onClick={handleAvatarUpload}
                    disabled={saving}
                    className="mt-3 flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                  >
                    <Save size={16} />
                    {saving ? "Uploading..." : "Upload Avatar"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="rounded-2xl border border-[#4a5568]/20 bg-[#31323e] p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                <User size={20} />
                Basic Information
              </h2>

              <div className="space-y-4">
                {/* Email (Read-only) */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#bfc0d1]">
                    <Mail size={16} />
                    Email
                    <span className="rounded bg-[#4a5568]/30 px-2 py-0.5 text-xs text-[#bfc0d1]/60">
                      Read-only
                    </span>
                  </label>
                  <input
                    type="email"
                    value={profile?.email || ""}
                    disabled
                    className="w-full rounded-lg border border-[#4a5568]/20 bg-[#1e202c]/50 px-4 py-2.5 text-[#bfc0d1]/50 cursor-not-allowed"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#bfc0d1]">
                    <Shield size={16} />
                    Shelter Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter shelter name"
                    className="w-full rounded-lg border border-[#4a5568]/20 bg-[#1e202c] px-4 py-2.5 text-white placeholder-[#bfc0d1]/40 focus:border-[#4a5568] focus:outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#bfc0d1]">
                    <Phone size={16} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full rounded-lg border border-[#4a5568]/20 bg-[#1e202c] px-4 py-2.5 text-white placeholder-[#bfc0d1]/40 focus:border-[#4a5568] focus:outline-none"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#bfc0d1]">
                    <MapPin size={16} />
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter shelter address"
                    className="w-full rounded-lg border border-[#4a5568]/20 bg-[#1e202c] px-4 py-2.5 text-white placeholder-[#bfc0d1]/40 focus:border-[#4a5568] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="rounded-2xl border border-[#4a5568]/20 bg-[#31323e] p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                <Award size={20} />
                Professional Details
              </h2>

              <div className="space-y-4">
                {/* Specialization */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#bfc0d1]">
                    <Award size={16} />
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="e.g., Dogs, Cats, Exotic Animals"
                    className="w-full rounded-lg border border-[#4a5568]/20 bg-[#1e202c] px-4 py-2.5 text-white placeholder-[#bfc0d1]/40 focus:border-[#4a5568] focus:outline-none"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#bfc0d1]">
                    <TrendingUp size={16} />
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="0"
                    placeholder="Years of experience"
                    className="w-full rounded-lg border border-[#4a5568]/20 bg-[#1e202c] px-4 py-2.5 text-white placeholder-[#bfc0d1]/40 focus:border-[#4a5568] focus:outline-none"
                  />
                </div>

                {/* Capacity */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#bfc0d1]">
                    <Users size={16} />
                    Shelter Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    min="0"
                    placeholder="Maximum capacity"
                    className="w-full rounded-lg border border-[#4a5568]/20 bg-[#1e202c] px-4 py-2.5 text-white placeholder-[#bfc0d1]/40 focus:border-[#4a5568] focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-[#bfc0d1]/60">
                    Current: {profile?.currentPets || 0} / {formData.capacity}
                  </p>
                </div>

                {/* Bio */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#bfc0d1]">
                    <FileText size={16} />
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about your shelter..."
                    className="w-full rounded-lg border border-[#4a5568]/20 bg-[#1e202c] px-4 py-2.5 text-white placeholder-[#bfc0d1]/40 focus:border-[#4a5568] focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="rounded-lg border border-[#4a5568]/20 bg-[#31323e] px-6 py-2.5 text-sm font-semibold text-[#bfc0d1] transition-colors hover:bg-[#3a3b47]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-[#4a5568] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5a6678] disabled:opacity-50"
              >
                <Save size={16} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {toast && (
        <ShelterToast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default ShelterUpdateProfile;
