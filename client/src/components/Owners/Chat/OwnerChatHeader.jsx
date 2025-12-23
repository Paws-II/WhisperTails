import React, { useState, useRef } from "react";
import {
  User,
  Circle,
  MoreVertical,
  Video,
  Image as ImageIcon,
  X as XIcon,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const OwnerChatHeader = ({
  room,
  userRole,
  isOppositeOnline,
  isTyping,
  wallpaper,
  onWallpaperChange,
  onBlockRoom,
  onCloseRoom,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showWallpaperPicker, setShowWallpaperPicker] = useState(false);
  const wallpaperInputRef = useRef(null);

  const presetWallpapers = [
    { id: "default", name: "Default", url: null },
    {
      id: "preset1",
      name: "Nature",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    },
    {
      id: "preset2",
      name: "Ocean",
      url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
    },
    {
      id: "preset3",
      name: "Mountains",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    },
    {
      id: "preset4",
      name: "Desert",
      url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    },
    {
      id: "preset5",
      name: "Forest",
      url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    },
    {
      id: "preset6",
      name: "Abstract",
      url: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
    },
  ];

  const oppositeProfile =
    userRole === "owner" ? room.shelterProfile : room.ownerProfile;

  const handleWallpaperSelect = async (wallpaperUrl) => {
    try {
      const response = await fetch(
        `${API_URL}/api/chat/rooms/${room._id}/wallpaper`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ wallpaper: wallpaperUrl }),
        }
      );

      const data = await response.json();
      if (data.success) {
        onWallpaperChange(wallpaperUrl);
        setShowWallpaperPicker(false);
      }
    } catch (error) {
      console.error("Wallpaper change error:", error);
    }
  };

  const handleCustomWallpaperUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    const formData = new FormData();
    formData.append("wallpaper", file);

    try {
      const response = await fetch(
        `${API_URL}/api/chat/rooms/${room._id}/wallpaper/upload`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        onWallpaperChange(data.wallpaperUrl);
        setShowWallpaperPicker(false);
      }
    } catch (error) {
      console.error("Wallpaper upload error:", error);
    }
  };

  return (
    <div className="bg-[#31323e] border-b border-white/10 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-[#60519b]/20 flex items-center justify-center overflow-hidden ring-2 ring-transparent hover:ring-[#60519b]/30 transition-all">
            {oppositeProfile?.avatar ? (
              <img
                src={oppositeProfile.avatar}
                alt={oppositeProfile.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User size={20} className="text-[#60519b]" />
            )}
          </div>
          {isOppositeOnline && (
            <Circle
              size={8}
              className="absolute bottom-0 right-0 text-green-500 fill-green-500 ring-2 ring-[#31323e]"
            />
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">
            {oppositeProfile?.name || "Unknown User"}
          </h3>
          <p className="text-xs text-white/60">
            {isTyping ? (
              <span className="italic">typing...</span>
            ) : (
              room.petId?.name || ""
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {}}
          className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-110"
          title="Start video call"
        >
          <Video size={20} className="text-white" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowWallpaperPicker(!showWallpaperPicker)}
            className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-110"
            title="Change wallpaper"
          >
            <ImageIcon size={20} className="text-white" />
          </button>

          {showWallpaperPicker && (
            <div className="absolute right-0 top-full mt-2 bg-[#31323e] border border-white/10 rounded-lg shadow-xl z-20 w-72 p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">
                  Choose Wallpaper
                </h3>
                <button
                  onClick={() => setShowWallpaperPicker(false)}
                  className="p-1 rounded hover:bg-white/10 transition-all hover:scale-110"
                >
                  <XIcon size={16} className="text-white/60" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                {presetWallpapers.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() =>
                      handleWallpaperSelect(preset.url || "default")
                    }
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      wallpaper === (preset.url || "default")
                        ? "border-[#60519b] scale-105"
                        : "border-white/10 hover:border-white/30 hover:scale-105"
                    }`}
                  >
                    {preset.url ? (
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1e202c] flex items-center justify-center">
                        <span className="text-xs text-white/60">Default</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                      <p className="text-xs text-white truncate">
                        {preset.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <input
                type="file"
                ref={wallpaperInputRef}
                accept="image/*"
                onChange={handleCustomWallpaperUpload}
                className="hidden"
              />
              <button
                onClick={() => wallpaperInputRef.current?.click()}
                className="w-full bg-[#60519b] hover:bg-[#7d6ab8] text-white text-sm py-2 rounded-lg transition-all flex items-center justify-center gap-2 hover:scale-105"
              >
                <ImageIcon size={16} />
                Upload Custom Wallpaper
              </button>
            </div>
          )}
        </div>

        {userRole === "shelter" && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-110"
            >
              <MoreVertical size={20} className="text-white" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-2 bg-[#31323e] border border-white/10 rounded-lg shadow-xl z-10 min-w-[160px]">
                <button
                  onClick={() => {
                    onCloseRoom();
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <XIcon size={16} />
                  Close Chat
                </button>
                <button
                  onClick={() => {
                    onBlockRoom();
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                  Block Chat
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerChatHeader;
