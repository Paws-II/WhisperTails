import React from "react";
import { AlertTriangle, X } from "lucide-react";

const ConfirmDeleteModal = ({ petName, onConfirm, onCancel, loading }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#31323e] rounded-2xl border border-red-500/30 shadow-2xl p-6 animate-slideUp">
        <button
          onClick={onCancel}
          disabled={loading}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#1e202c] text-[#bfc0d1] hover:text-white transition-all disabled:opacity-50"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 rounded-full bg-red-500/20">
            <AlertTriangle size={40} className="text-red-400" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-2">Delete Pet?</h3>
            <p className="text-sm text-[#bfc0d1]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">{petName}</span>?
              <br />
              This action cannot be undone.
            </p>
          </div>

          <div className="flex gap-3 w-full pt-2">
            <button
              onClick={onCancel}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl bg-[#1e202c] hover:bg-[#3a3b47] text-white font-semibold transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
