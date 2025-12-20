import React from "react";
import { Check } from "lucide-react";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isCompleted = currentStep > index;
          const isDisabled = currentStep < index;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`
                    relative flex h-12 w-12 items-center justify-center rounded-full
                    transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-linear-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30"
                        : isActive
                        ? "bg-linear-to-br from-[#60519b] to-[#7d6ab8] shadow-lg shadow-[#60519b]/30 scale-110"
                        : "bg-[#31323e] border-2 border-[#60519b]/20"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check size={20} className="text-white" strokeWidth={3} />
                  ) : (
                    <span
                      className={`text-sm font-bold ${
                        isActive || isCompleted
                          ? "text-white"
                          : "text-[#bfc0d1]/40"
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>

                <div className="mt-3 text-center">
                  <p
                    className={`text-xs font-semibold transition-colors ${
                      isActive
                        ? "text-[#60519b]"
                        : isCompleted
                        ? "text-white"
                        : "text-[#bfc0d1]/40"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 -mt-12">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isCompleted
                        ? "bg-linear-to-r from-green-500 to-green-600"
                        : "bg-[#60519b]/20"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
