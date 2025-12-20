import React from "react";

const CostSummary = ({ formData, maintenanceCost, getTotalAdoptionCost }) => {
  return (
    <div className="rounded-2xl border border-[#4a5568]/20 bg-[#31323e] p-6">
      <h3 className="mb-4 text-lg font-bold text-white">Cost Summary</h3>

      <div className="space-y-3">
        <CostRow label="Vaccinated" value={formData.vaccinated ? 500 : 0} />
        <CostRow
          label="Spayed / Neutered"
          value={formData.spayedNeutered ? 400 : 0}
        />
        <CostRow
          label="Special Needs"
          value={formData.specialNeeds ? 100 : 0}
        />
        <CostRow
          label="House Trained"
          value={formData.houseTrained ? 1000 : 0}
        />

        <Divider />

        <CostRow label="Maintenance Cost" value={maintenanceCost} bold />
        <CostRow label="Donation" value={parseFloat(formData.donation) || 0} />

        <Divider />

        <div className="flex justify-between text-lg font-bold">
          <span className="text-white">Total Adoption Cost</span>
          <span className="text-[#4a5568]">₹{getTotalAdoptionCost()}</span>
        </div>
      </div>
    </div>
  );
};

const CostRow = ({ label, value, bold }) => (
  <div className="flex justify-between text-sm">
    <span
      className={bold ? "font-semibold text-[#bfc0d1]" : "text-[#bfc0d1]/70"}
    >
      {label}
    </span>
    <span className={bold ? "font-bold text-white" : "text-white"}>
      ₹{value}
    </span>
  </div>
);

const Divider = () => <div className="border-t border-[#4a5568]/20 pt-3" />;

export default CostSummary;
