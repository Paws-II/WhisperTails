import React from "react";
import { AlertCircle } from "lucide-react";

const FullPageError = ({
  title = "Something went wrong",
  message = "We couldn’t load the data. Please try again.",
  actionLabel = "Retry",
  onAction,
}) => {
  return (
    <div className="min-h-screen bg-[#1e202c] flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20">
          <AlertCircle size={28} className="text-red-400" />
        </div>

        <h2 className="text-xl font-bold text-red-400">{title}</h2>

        <p className="mt-2 text-sm text-[#bfc0d1]">{message}</p>

        {onAction && (
          <button
            onClick={onAction}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-red-500/20 px-6 py-2 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/30 hover:scale-105 active:scale-95"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default FullPageError;
