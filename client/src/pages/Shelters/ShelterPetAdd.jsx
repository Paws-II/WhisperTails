import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Heart,
  Upload,
  X,
  Loader2,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  PawPrint,
  Stethoscope,
  Activity,
  FileText,
} from "lucide-react";
import NavbarShelter from "../../components/Shelters/NavbarShelter";
import ShelterToast from "../../Common/ShelterToast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ShelterPetAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "unknown",
    age: "",
    ageUnit: "years",
    size: "medium",
    color: "",
    vaccinated: false,
    neutered: false,
    trained: false,
    specialNeeds: false,
    medicalNotes: "",
    temperament: [],
    adoptionFee: "",
    description: "",
  });

  const temperamentOptions = [
    "Friendly",
    "Playful",
    "Calm",
    "Energetic",
    "Affectionate",
    "Independent",
    "Protective",
    "Social",
    "Shy",
    "Curious",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTemperamentToggle = (trait) => {
    setFormData((prev) => ({
      ...prev,
      temperament: prev.temperament.includes(trait)
        ? prev.temperament.filter((t) => t !== trait)
        : [...prev.temperament, trait],
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      setToast({
        type: "error",
        title: "Too Many Images",
        message: "You can upload a maximum of 5 images",
      });
      return;
    }

    setImages((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Pet name is required";
    }

    if (!formData.species.trim()) {
      return "Species is required";
    }

    if (!formData.age || Number(formData.age) <= 0) {
      return "Please enter a valid age";
    }

    if (!formData.gender) {
      return "Please select gender";
    }

    if (!formData.size) {
      return "Please select pet size";
    }

    if (formData.temperament.length === 0) {
      return "Please select at least one temperament trait";
    }

    if (formData.specialNeeds && !formData.medicalNotes.trim()) {
      return "Medical notes are required for special needs pets";
    }

    if (!formData.description.trim()) {
      return "Pet description is required";
    }

    if (images.length === 0) {
      return "Please upload at least one pet image";
    }

    if (Number(formData.adoptionFee) < 0) {
      return "Adoption fee cannot be negative";
    }

    return null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setToast({
        type: "error",
        title: "Form Incomplete",
        message: validationError,
      });
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "temperament") {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      images.forEach((image) => {
        submitData.append("images", image);
      });

      const response = await axios.post(
        `${API_URL}/api/shelter/pets`,
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setToast({
          type: "success",
          title: "Pet Added Successfully",
          message: `${formData.name} has been added to your shelter`,
        });

        setTimeout(() => {
          navigate("/shelter-dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Add pet error:", error);
      setToast({
        type: "error",
        title: "Failed to Add Pet",
        message:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e202c] flex">
      <NavbarShelter />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
          <div className="mb-8">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-[#4a5568] p-4">
                <Heart size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Add New Pet</h1>
                <p className="mt-1 text-[#bfc0d1]/80">
                  Create a profile for a new pet available for adoption
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-2xl border border-[#4a5568]/20 bg-[#31323e] p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-[#4a5568] p-2">
                  <PawPrint size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Basic Information
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#bfc0d1]">
                    Pet Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Max"
                    className="w-full rounded-xl border border-[#4a5568]/30 bg-[#1e202c] px-4 py-3 text-white placeholder-[#bfc0d1]/40 transition-all focus:border-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4a5568]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#bfc0d1]">
                    Species <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Dog, Cat"
                    className="w-full rounded-xl border border-[#4a5568]/30 bg-[#1e202c] px-4 py-3 text-white placeholder-[#bfc0d1]/40 transition-all focus:border-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4a5568]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#bfc0d1]">
                    Breed
                  </label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    placeholder="e.g., Golden Retriever"
                    className="w-full rounded-xl border border-[#4a5568]/30 bg-[#1e202c] px-4 py-3 text-white placeholder-[#bfc0d1]/40 transition-all focus:border-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4a5568]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#bfc0d1]">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-[#4a5568]/30 bg-[#1e202c] px-4 py-3 text-white transition-all focus:border-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4a5568]/20"
                  >
                    <option value="unknown">Unknown</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#bfc0d1]">
                    Age
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="0"
                      className="flex-1 rounded-xl border border-[#4a5568]/30 bg-[#1e202c] px-4 py-3 text-white placeholder-[#bfc0d1]/40 transition-all focus:border-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4a5568]/20"
                    />
                    <select
                      name="ageUnit"
                      value={formData.ageUnit}
                      onChange={handleInputChange}
                      className="rounded-xl border border-[#4a5568]/30 bg-[#1e202c] px-4 py-3 text-white transition-all focus:border-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4a5568]/20"
                    >
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#bfc0d1]">
                    Size
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-[#4a5568]/30 bg-[#1e202c] px-4 py-3 text-white transition-all focus:border-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4a5568]/20"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-[#bfc0d1]">
                    Color / Markings
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    placeholder="e.g., Brown with white chest"
                    className="w-full rounded-xl border border-[#4a5568]/30 bg-[#1e202c] px-4 py-3 text-white placeholder-[#bfc0d1]/40 transition-all focus:border-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4a5568]/20"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#4a5568]/20 bg-[#31323e] p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-[#5a6678] p-2">
                  <Stethoscope size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Health Information
                </h2>
              </div>

              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#4a5568]/20 bg-[#1e202c] p-4 transition-all hover:border-[#4a5568]/40">
                    <input
                      type="checkbox"
                      name="vaccinated"
                      checked={formData.vaccinated}
                      onChange={handleInputChange}
                      className="h-5 w-5 rounded border-[#4a5568] text-[#4a5568] focus:ring-2 focus:ring-[#4a5568]/20"
                    />
                    <span className="text-sm font-medium text-[#bfc0d1]">
                      Vaccinated
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#4a5568]/20 bg-[#1e202c] p-4 transition-all hover:border-[#4a5568]/40">
                    <input
                      type="checkbox"
                      name="neutered"
                      checked={formData.neutered}
                      onChange={handleInputChange}
                      className="h-5 w-5 rounded border-[#4a5568] text-[#4a5568] focus:ring-2 focus:ring-[#4a5568]/20"
                    />
                    <span className="text-sm font-medium text-[#bfc0d1]">
                      Spayed / Neutered
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#4a5568]/20 bg-[#1e202c] p-4 transition-all hover:border-[#4a5568]/40">
                    <input
                      type="checkbox"
                      name="specialNeeds"
                      checked={formData.specialNeeds}
                      onChange={handleInputChange}
                      className="h-5 w-5 rounded border-[#4a5568] text-[#4a5568] focus:ring-2 focus:ring-[#4a5568]/20"
                    />
                    <span className="text-sm font-medium text-[#bfc0d1]">
                      Special Needs
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#4a5568]/20 bg-[#1e202c] p-4 transition-all hover:border-[#4a5568]/40">
                    <input
                      type="checkbox"
                      name="trained"
                      checked={formData.trained}
                      onChange={handleInputChange}
                      className="h-5 w-5 rounded border-[#4a5568] text-[#4a5568] focus:ring-2 focus:ring-[#4a5568]/20"
                    />
                    <span className="text-sm font-medium text-[#bfc0d1]">
                      House Trained
                    </span>
                  </label>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#bfc0d1]">
                    Medical Notes
                  </label>
                  <textarea
                    name="medicalNotes"
                    value={formData.medicalNotes}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Any medical conditions, medications, or special care instructions..."
                    className="w-full rounded-xl border border-[#4a5568]/30 bg-[#1e202c] px-4 py-3 text-white placeholder-[#bfc0d1]/40 transition-all focus:border-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4a5568]/20"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#4a5568]/20 bg-[#31323e] p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-[#6a7788] p-2">
                  <Activity size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Behavior & Temperament
                </h2>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-[#bfc0d1]">
                  Select traits that describe this pet
                </label>
                <div className="flex flex-wrap gap-2">
                  {temperamentOptions.map((trait) => (
                    <button
                      key={trait}
                      type="button"
                      onClick={() => handleTemperamentToggle(trait)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        formData.temperament.includes(trait)
                          ? "bg-[#4a5568] text-white shadow-lg"
                          : "bg-[#1e202c] text-[#bfc0d1] hover:bg-[#4a5568]/30"
                      }`}
                    >
                      {trait}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#4a5568]/20 bg-[#31323e] p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-[#7a8898] p-2">
                  <Upload size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Pet Photos</h2>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-[#bfc0d1]">
                  Upload up to 5 images
                </label>

                {imagePreviews.length > 0 && (
                  <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="group relative">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="h-32 w-full rounded-xl border border-[#4a5568]/20 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {images.length < 5 && (
                  <label className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#4a5568]/30 bg-[#1e202c] p-8 transition-all hover:border-[#4a5568] hover:bg-[#1e202c]/80">
                    <Upload
                      size={40}
                      className="mb-3 text-[#4a5568] transition-transform group-hover:scale-110"
                    />
                    <p className="text-sm font-medium text-[#bfc0d1]">
                      Click to upload images
                    </p>
                    <p className="mt-1 text-xs text-[#bfc0d1]/60">
                      PNG, JPG, GIF up to 2MB
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-[#4a5568]/20 bg-[#31323e] p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-[#4a5568] p-2">
                  <FileText size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Additional Details
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#bfc0d1]">
                    Adoption Fee ($)
                  </label>
                  <input
                    type="number"
                    name="adoptionFee"
                    value={formData.adoptionFee}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full rounded-xl border border-[#4a5568]/30 bg-[#1e202c] px-4 py-3 text-white placeholder-[#bfc0d1]/40 transition-all focus:border-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4a5568]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#bfc0d1]">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="Tell potential adopters about this pet's personality, habits, and what makes them special..."
                    className="w-full rounded-xl border border-[#4a5568]/30 bg-[#1e202c] px-4 py-3 text-white placeholder-[#bfc0d1]/40 transition-all focus:border-[#4a5568] focus:outline-none focus:ring-2 focus:ring-[#4a5568]/20"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/shelter-dashboard")}
                className="rounded-xl border border-[#4a5568]/30 bg-transparent px-8 py-3 font-semibold text-[#bfc0d1] transition-all hover:bg-[#4a5568]/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="group relative overflow-hidden rounded-xl bg-[#4a5568] px-8 py-3 font-semibold text-white transition-all hover:bg-[#5a6678] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={20} className="animate-spin" />
                    Adding Pet...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Heart size={20} />
                    Add Pet
                  </span>
                )}
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

export default ShelterPetAdd;
