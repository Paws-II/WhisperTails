import React, { useState } from "react";
import { MapPin, Calendar, Heart, AlertCircle, Home, Eye } from "lucide-react";
import PetDetailsModal from "./PetDetailsModal";

const PetCard = ({ pet, onPetDeleted, onPetEdit }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "OWNED":
        return <Heart size={16} className="text-green-400" />;
      case "LOST":
      case "FOUND":
        return <AlertCircle size={16} className="text-red-400" />;
      case "FOSTER":
        return <Home size={16} className="text-blue-400" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "OWNED":
        return "border-green-500/30 bg-green-500/10";
      case "LOST":
      case "FOUND":
        return "border-red-500/30 bg-red-500/10";
      case "FOSTER":
        return "border-blue-500/30 bg-blue-500/10";
      default:
        return "border-[#60519b]/30 bg-[#60519b]/10";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="group rounded-2xl border border-[#60519b]/20 bg-[#31323e] overflow-hidden transition-all duration-300 hover:border-[#60519b]/40 hover:shadow-xl hover:shadow-[#60519b]/20 hover:-translate-y-1">
        {/* Image with Gradient Overlay */}
        <div className="relative aspect-video overflow-hidden bg-[#1e202c]/50">
          <img
            src={pet.photos[0]}
            alt={pet.petName || "Pet"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e202c]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* View Details Button Overlay */}
          <button
            onClick={() => setShowDetails(true)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <div className="px-6 py-3 rounded-xl bg-[#60519b] hover:bg-[#7d6ab8] text-white font-semibold shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300 flex items-center gap-2">
              <Eye size={18} />
              View Details
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white truncate">
                {pet.petName || "Unnamed Pet"}
              </h3>
              {pet.species && (
                <p className="text-sm text-[#bfc0d1] truncate">
                  {pet.species}{" "}
                  {pet.breed &&
                    pet.breed !== "Mixed/Unknown" &&
                    `• ${pet.breed}`}
                </p>
              )}
            </div>
            <span
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold shrink-0 ${getCategoryColor(
                pet.category
              )}`}
            >
              {getCategoryIcon(pet.category)}
              {pet.category}
            </span>
          </div>

          {pet.location?.address && (
            <div className="flex items-start gap-2 text-xs text-[#bfc0d1]">
              <MapPin size={14} className="mt-0.5 shrink-0 text-[#60519b]" />
              <span className="line-clamp-2">{pet.location.address}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-[#60519b]/20">
            <div className="flex items-center gap-1.5 text-xs text-[#bfc0d1]">
              <Calendar size={14} className="text-[#60519b]" />
              {formatDate(pet.createdAt)}
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded ${
                pet.status === "active"
                  ? "bg-green-500/20 text-green-400"
                  : pet.status === "resolved"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-gray-500/20 text-[#bfc0d1]/60"
              }`}
            >
              {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <PetDetailsModal
          pet={pet}
          onClose={() => setShowDetails(false)}
          onDelete={(petId) => {
            if (onPetDeleted) onPetDeleted(petId);
          }}
          onEdit={(petData) => {
            if (onPetEdit) onPetEdit(petData);
          }}
        />
      )}
    </>
  );
};

export default PetCard;
