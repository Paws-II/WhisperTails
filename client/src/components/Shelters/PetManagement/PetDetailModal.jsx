import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Tag,
  Stethoscope,
  FileText,
  Clock,
  Calendar,
} from "lucide-react";
import ConfirmationDialog from "../../../Common/ConfirmationDialog";

const PetDetailModal = ({ pet, onClose, onStatusUpdate }) => {
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const statusOptions = [
    { value: "active", label: "Active", color: "green" },
    { value: "resolved", label: "Resolved", color: "blue" },
    { value: "archived", label: "Archived", color: "gray" },
  ];

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
    setShowStatusDialog(true);
  };

  const confirmStatusUpdate = () => {
    onStatusUpdate(pet._id, selectedStatus);
    setShowStatusDialog(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === pet.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? pet.photos.length - 1 : prev - 1
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#4a5568]/20 bg-[#31323e] shadow-2xl">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#4a5568]/20 bg-[#31323e] p-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {pet.petName || "Unnamed Pet"}
              </h2>
              <p className="text-sm text-[#bfc0d1] mt-1">
                {pet.category} Pet Details
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-[#bfc0d1] transition-all hover:bg-[#4a5568]/30 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="relative h-80 overflow-hidden rounded-xl bg-[#1e202c]">
                <img
                  src={pet.photos[currentImageIndex]}
                  alt={`Pet ${currentImageIndex + 1}`}
                  className="h-full w-full object-cover"
                />
                {pet.photos.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
                    >
                      →
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {pet.photos.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 w-2 rounded-full transition-all ${
                            idx === currentImageIndex
                              ? "bg-white w-6"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-[#4a5568]/20 bg-[#1e202c]/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                  <Tag size={18} className="text-[#4a5568]" />
                  Pet Information
                </h3>
                <div className="space-y-3">
                  {pet.species && (
                    <div>
                      <p className="text-xs text-[#bfc0d1]/60 mb-1">Species</p>
                      <p className="text-sm text-white font-medium">
                        {pet.species}
                      </p>
                    </div>
                  )}
                  {pet.breed && pet.breed !== "Mixed/Unknown" && (
                    <div>
                      <p className="text-xs text-[#bfc0d1]/60 mb-1">Breed</p>
                      <p className="text-sm text-white font-medium">
                        {pet.breed}
                      </p>
                    </div>
                  )}
                  {pet.approximateAge && (
                    <div>
                      <p className="text-xs text-[#bfc0d1]/60 mb-1">Age</p>
                      <p className="text-sm text-white font-medium">
                        {pet.approximateAge}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-[#bfc0d1]/60 mb-1">Category</p>
                    <span className="inline-block rounded-lg bg-[#4a5568]/30 px-3 py-1 text-sm font-semibold text-[#4a5568]">
                      {pet.category}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-[#bfc0d1]/60 mb-1">
                      Current Status
                    </p>
                    <span className="inline-block rounded-lg bg-[#4a5568]/30 px-3 py-1 text-sm font-semibold text-white">
                      {pet.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#4a5568]/20 bg-[#1e202c]/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                  <User size={18} className="text-[#4a5568]" />
                  Owner Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-[#4a5568]" />
                    <div>
                      <p className="text-xs text-[#bfc0d1]/60">Name</p>
                      <p className="text-sm text-white font-medium">
                        {pet.ownerName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-[#4a5568]" />
                    <div>
                      <p className="text-xs text-[#bfc0d1]/60">Email</p>
                      <p className="text-sm text-white font-medium">
                        {pet.ownerEmail}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-[#4a5568]" />
                    <div>
                      <p className="text-xs text-[#bfc0d1]/60">Phone</p>
                      <p className="text-sm text-white font-medium">
                        {pet.ownerPhone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {pet.location?.address && (
              <div className="mt-6 rounded-xl border border-[#4a5568]/20 bg-[#1e202c]/50 p-5">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                  <MapPin size={18} className="text-[#4a5568]" />
                  Location
                </h3>
                <p className="text-sm text-[#bfc0d1]">{pet.location.address}</p>
                {pet.location.latitude && pet.location.longitude && (
                  <p className="mt-2 text-xs text-[#bfc0d1]/60">
                    Coordinates: {pet.location.latitude.toFixed(6)},{" "}
                    {pet.location.longitude.toFixed(6)}
                  </p>
                )}
              </div>
            )}

            {(pet.healthNotes || pet.ownerNote || pet.fosterDetails) && (
              <div className="mt-6 rounded-xl border border-[#4a5568]/20 bg-[#1e202c]/50 p-5">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                  <FileText size={18} className="text-[#4a5568]" />
                  Additional Notes
                </h3>
                <div className="space-y-3">
                  {pet.healthNotes && (
                    <div>
                      <p className="text-xs text-[#bfc0d1]/60 mb-1">
                        Health Notes
                      </p>
                      <p className="text-sm text-white">{pet.healthNotes}</p>
                    </div>
                  )}
                  {pet.ownerNote && (
                    <div>
                      <p className="text-xs text-[#bfc0d1]/60 mb-1">
                        Owner Note
                      </p>
                      <p className="text-sm text-white">{pet.ownerNote}</p>
                    </div>
                  )}
                  {pet.fosterDetails && (
                    <>
                      {pet.fosterDetails.reason && (
                        <div>
                          <p className="text-xs text-[#bfc0d1]/60 mb-1">
                            Foster Reason
                          </p>
                          <p className="text-sm text-white">
                            {pet.fosterDetails.reason}
                          </p>
                        </div>
                      )}
                      {pet.fosterDetails.duration && (
                        <div>
                          <p className="text-xs text-[#bfc0d1]/60 mb-1">
                            Duration
                          </p>
                          <p className="text-sm text-white">
                            {pet.fosterDetails.duration}
                          </p>
                        </div>
                      )}
                      {pet.fosterDetails.careNotes && (
                        <div>
                          <p className="text-xs text-[#bfc0d1]/60 mb-1">
                            Care Notes
                          </p>
                          <p className="text-sm text-white">
                            {pet.fosterDetails.careNotes}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 rounded-xl border border-[#4a5568]/20 bg-[#1e202c]/50 p-5">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <Stethoscope size={18} className="text-[#4a5568]" />
                Update Pet Status
              </h3>
              <div className="flex flex-wrap gap-3">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleStatusClick(option.value)}
                    disabled={pet.status === option.value}
                    className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${
                      pet.status === option.value
                        ? "bg-[#4a5568]/50 text-[#bfc0d1]/50 cursor-not-allowed"
                        : "bg-[#4a5568] text-white hover:bg-[#5a6678] hover:shadow-lg active:scale-95"
                    }`}
                  >
                    Mark as {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#bfc0d1]/60">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} />
                <span>
                  Added:{" "}
                  {new Date(pet.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} />
                <span>
                  Updated:{" "}
                  {new Date(pet.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showStatusDialog}
        onClose={() => setShowStatusDialog(false)}
        onConfirm={confirmStatusUpdate}
        title="Update Pet Status"
        message={`Are you sure you want to mark this pet as "${selectedStatus}"? The owner will be notified of this change.`}
        type="info"
        confirmText="Update Status"
        cancelText="Cancel"
      />
    </>
  );
};
export default PetDetailModal;
