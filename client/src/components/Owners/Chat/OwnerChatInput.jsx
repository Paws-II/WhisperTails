import React, { useState, useRef } from "react";
import { Send, Image, Smile, X } from "lucide-react";

const OwnerChatInput = ({ onSendMessage, isReadOnly }) => {
  const [messageInput, setMessageInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

  const commonEmojis = [
    "😀",
    "😂",
    "❤️",
    "👍",
    "🙏",
    "😊",
    "🎉",
    "🔥",
    "✨",
    "👏",
    "🥰",
    "😍",
    "🤗",
    "😎",
    "🤔",
    "😅",
    "🙌",
    "💪",
    "🎊",
    "🌟",
    "💯",
    "🎯",
    "🎈",
    "🎁",
    "🌈",
    "⭐",
    "💖",
    "💕",
    "🌸",
    "🌺",
    "🐾",
    "🐶",
    "🐱",
    "🐰",
    "🐻",
    "🐼",
    "🦊",
    "🐨",
    "🐯",
    "🦁",
  ];

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        setImageFile(blob);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(blob);
        e.preventDefault();
      }
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const insertEmoji = (emoji) => {
    setMessageInput((prev) => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleSend = () => {
    if (!messageInput.trim() && !imageFile) return;

    onSendMessage(messageInput, imageFile);
    setMessageInput("");
    clearImage();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isReadOnly) {
    return null;
  }

  return (
    <div className="bg-[#31323e] border-t border-white/10 p-4">
      {imagePreview && (
        <div className="mb-3 relative inline-block">
          <img
            src={imagePreview}
            alt="Preview"
            className="h-20 w-20 object-cover rounded-lg border border-white/10"
          />
          <button
            onClick={clearImage}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-1 transition-all hover:scale-110"
          >
            <X size={12} className="text-white" />
          </button>
        </div>
      )}

      <div className="flex items-end gap-2">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2.5 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-110 shrink-0"
          title="Attach image"
        >
          <Image size={20} className="text-white/60" />
        </button>

        <div className="relative shrink-0">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2.5 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-110"
            title="Add emoji"
          >
            <Smile size={20} className="text-white/60" />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2 left-0 bg-[#1e202c] border border-white/10 rounded-lg p-3 shadow-xl max-w-[280px] max-h-[300px] overflow-y-auto">
              <div className="grid grid-cols-8 gap-1">
                {commonEmojis.map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => insertEmoji(emoji)}
                    className="text-2xl hover:bg-white/10 rounded p-1 transition-all hover:scale-125"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            onPaste={handlePaste}
            rows={1}
            className="w-full bg-[#1e202c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#60519b] transition-colors resize-none max-h-32"
            style={{
              minHeight: "42px",
              height: "auto",
            }}
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!messageInput.trim() && !imageFile}
          className="bg-[#60519b] hover:bg-[#7d6ab8] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#60519b] rounded-lg p-2.5 transition-all duration-200 hover:scale-110 disabled:hover:scale-100 shrink-0"
          title="Send message"
        >
          <Send size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default OwnerChatInput;
