import React from "react";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  X,
} from "lucide-react";

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "info",
  confirmText = "Confirm",
  cancelText = "Cancel",
  showCancel = true,
}) => {
  if (!isOpen) return null;

  const icons = {
    info: <AlertCircle size={48} className="text-blue-500" />,
    success: <CheckCircle size={48} className="text-green-500" />,
    error: <XCircle size={48} className="text-red-500" />,
    warning: <AlertTriangle size={48} className="text-yellow-500" />,
  };

  const buttonColors = {
    info: "bg-blue-500 hover:bg-blue-600",
    success: "bg-green-500 hover:bg-green-600",
    error: "bg-red-500 hover:bg-red-600",
    warning: "bg-yellow-500 hover:bg-yellow-600",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#31323e] rounded-2xl shadow-2xl max-w-md w-full border border-white/10 animate-fadeIn">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              {icons[type]}
              <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-white/80 text-sm mb-6 leading-relaxed ml-16">
            {message}
          </p>

          <div className="flex gap-3 justify-end">
            {showCancel && (
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all font-medium"
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={onConfirm}
              className={`px-6 py-2.5 rounded-lg text-white transition-all font-medium ${buttonColors[type]}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
