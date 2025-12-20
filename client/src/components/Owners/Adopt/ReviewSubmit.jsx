import React, { useState, useEffect } from "react";
import axios from "axios";
import { Check, Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ReviewSubmit = ({ pet, applicationData, onSubmit, onBack }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(agreedToTerms);
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Review & Submit</h2>
        <p className="text-sm text-[#bfc0d1]">
          Please review your application before submitting
        </p>
      </div>

      {/* Pet Summary */}
      <div className="rounded-2xl border border-[#60519b]/20 bg-[#31323e] p-6">
        <h3 className="text-lg font-bold text-white mb-4">Selected Pet</h3>

        <div className="flex gap-4">
          {pet.coverImage || pet.images?.[0] ? (
            <img
              src={pet.coverImage || pet.images[0]}
              alt={pet.name}
              className="h-24 w-24 rounded-xl object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-xl bg-[#1e202c]/50 flex items-center justify-center">
              <span className="text-4xl">🐾</span>
            </div>
          )}

          <div className="flex-1">
            <h4 className="text-xl font-bold text-white mb-2">{pet.name}</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-[#bfc0d1]">
              <div>
                <span className="text-[#bfc0d1]/60">Species:</span>{" "}
                <span className="capitalize">{pet.species}</span>
              </div>
              <div>
                <span className="text-[#bfc0d1]/60">Breed:</span>{" "}
                <span className="capitalize">{pet.breed}</span>
              </div>
              <div>
                <span className="text-[#bfc0d1]/60">Age:</span> {pet.age}{" "}
                {pet.ageUnit}
              </div>
              <div>
                <span className="text-[#bfc0d1]/60">Gender:</span>{" "}
                <span className="capitalize">{pet.gender}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="rounded-2xl border border-[#60519b]/20 bg-[#31323e] p-6">
        <h3 className="text-lg font-bold text-white mb-4">Cost Summary</h3>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#bfc0d1]">Adoption Fee</span>
            <span className="text-white font-semibold">
              ${pet.adoptionFee || 0}
            </span>
          </div>

          {pet.donation > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-[#bfc0d1]">Suggested Donation</span>
              <span className="text-white font-semibold">${pet.donation}</span>
            </div>
          )}

          <div className="border-t border-[#60519b]/20 pt-3 flex justify-between">
            <span className="text-white font-bold">Total Cost</span>
            <span className="text-[#60519b] font-bold text-lg">
              ${pet.totalAdoptionCost || pet.adoptionFee || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Application Summary */}
      <div className="rounded-2xl border border-[#60519b]/20 bg-[#31323e] p-6">
        <h3 className="text-lg font-bold text-white mb-4">
          Application Summary
        </h3>

        <div className="space-y-4 text-sm">
          {/* Basic Info */}
          <div>
            <p className="text-[#bfc0d1]/60 mb-2">Applicant</p>
            <p className="text-white font-medium">{applicationData.fullName}</p>
            <p className="text-[#bfc0d1]">{applicationData.email}</p>
          </div>

          {/* Living Situation */}
          <div>
            <p className="text-[#bfc0d1]/60 mb-2">Living Situation</p>
            <p className="text-white">
              <span className="capitalize">
                {applicationData.residenceType}
              </span>
              {" • "}
              <span className="capitalize">{applicationData.ownOrRent}</span>
              {applicationData.ownOrRent === "rent" &&
                ` • Pets ${
                  applicationData.petAllowed === "yes"
                    ? "Allowed"
                    : "Not Allowed"
                }`}
            </p>
          </div>

          {/* Household */}
          <div>
            <p className="text-[#bfc0d1]/60 mb-2">Household</p>
            <p className="text-white">
              {applicationData.numberOfPeople} people
              {applicationData.hasChildren && " • Has children"}
              {applicationData.hasOtherPets && " • Has other pets"}
            </p>
          </div>

          {/* Experience */}
          <div>
            <p className="text-[#bfc0d1]/60 mb-2">Experience</p>
            <p className="text-white capitalize">
              {applicationData.experienceLevel} level
              {applicationData.ownedPetsBefore && " • Owned pets before"}
            </p>
          </div>

          {/* Adoption Reason */}
          <div>
            <p className="text-[#bfc0d1]/60 mb-2">Why adopt this pet?</p>
            <p className="text-white leading-relaxed">
              {applicationData.adoptionReason}
            </p>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="rounded-2xl border border-[#60519b]/20 bg-[#31323e] p-6">
        <h3 className="text-lg font-bold text-white mb-4">
          Terms & Conditions
        </h3>

        <div className="rounded-lg bg-[#1e202c]/50 p-4 mb-4 max-h-48 overflow-y-auto text-sm text-[#bfc0d1] leading-relaxed space-y-2">
          <p>
            By submitting this application, you agree to the following terms:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              All information provided in this application is true and accurate
            </li>
            <li>
              You understand that this is an application, not a guarantee of
              adoption
            </li>
            <li>
              The shelter reserves the right to approve or deny any application
            </li>
            <li>You agree to provide a safe and loving home for the pet</li>
            <li>
              You will provide proper food, water, shelter, and veterinary care
            </li>
            <li>You agree to pay the adoption fee as specified</li>
            <li>You understand that adoption fees are non-refundable</li>
            <li>You agree to follow up meetings and home visits if required</li>
          </ul>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            id="agreedToTerms"
            className="mt-1 h-5 w-5 rounded border-[#60519b]/20 bg-[#1e202c] text-[#60519b] focus:ring-[#60519b]/50"
          />
          <label htmlFor="agreedToTerms" className="text-sm text-white">
            I have read and agree to the terms and conditions, and I understand
            the adoption fee of{" "}
            <span className="font-bold text-[#60519b]">
              ${pet.totalAdoptionCost || pet.adoptionFee || 0}
            </span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          disabled={submitting}
          className="flex-1 rounded-xl border-2 border-[#60519b]/30 bg-transparent px-6 py-3 text-base font-semibold text-[#60519b] transition-all hover:bg-[#60519b]/10 active:scale-95 disabled:opacity-50"
        >
          Back to Edit
        </button>

        <button
          onClick={handleSubmit}
          disabled={!agreedToTerms || submitting}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#60519b] to-[#7d6ab8] px-6 py-3 text-base font-bold text-white shadow-lg shadow-[#60519b]/30 transition-all hover:shadow-xl hover:shadow-[#60519b]/40 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Check size={20} strokeWidth={2.5} />
              Submit Application
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
