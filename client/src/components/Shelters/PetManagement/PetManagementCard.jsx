import React from "react";
import { MapPin, User, Tag, Clock } from "lucide-react";

const PetManagementCard = ({ pet, onShowDetails }) => {
  const getCategoryColor = (category) => {
    const colors = {
      LOST: "bg-red-500/20 text-red-400 border-red-500/30",
      FOUND: "bg-green-500/20 text-green-400 border-green-500/30",
      OWNED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      FOSTER: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    };
    return colors[category] || colors.OWNED;
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-500/20 text-green-400",
      resolved: "bg-blue-500/20 text-blue-400",
      archived: "bg-gray-500/20 text-gray-400",
    };
    return colors[status] || colors.active;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="group rounded-2xl border border-[#4a5568]/20 bg-[#31323e] overflow-hidden transition-all hover:border-[#4a5568]/40 hover:shadow-lg hover:shadow-[#4a5568]/20">
      <div className="relative h-48 overflow-hidden bg-[#1e202c]">
        <img
          src={pet.photos[0]}
          alt={pet.petName || "Pet"}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold backdrop-blur-sm ${getCategoryColor(
              pet.category
            )}`}
          >
            <Tag size={12} />
            {pet.category}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold backdrop-blur-sm ${getStatusColor(
              pet.status
            )}`}
          >
            {pet.status}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2">
          {pet.petName || "Unnamed Pet"}
        </h3>

        {pet.species && (
          <p className="text-sm text-[#bfc0d1] mb-3">
            {pet.species}
            {pet.breed && pet.breed !== "Mixed/Unknown"
              ? ` • ${pet.breed}`
              : ""}
          </p>
        )}

        <div className="flex items-center gap-2 mb-2">
          <User size={14} className="text-[#4a5568]" />
          <span className="text-sm text-[#bfc0d1]">{pet.ownerName}</span>
        </div>

        {pet.location?.address && (
          <div className="flex items-start gap-2 mb-2">
            <MapPin size={14} className="text-[#4a5568] mt-0.5 shrink-0" />
            <span className="text-sm text-[#bfc0d1] line-clamp-1">
              {pet.location.address}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          <Clock size={14} className="text-[#4a5568]" />
          <span className="text-xs text-[#bfc0d1]/60">
            Added {formatDate(pet.createdAt)}
          </span>
        </div>

        <button
          onClick={onShowDetails}
          className="w-full rounded-lg bg-[#4a5568] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#5a6678] hover:shadow-lg hover:shadow-[#4a5568]/30 active:scale-95"
        >
          Show Details
        </button>
      </div>
    </div>
  );
};

export default PetManagementCard;
