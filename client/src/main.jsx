import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import Login from "./pages/auth/Login.jsx";
import SignupTrainer from "./pages/auth/SignupTrainer.jsx";
import SignupOwner from "./pages/auth/SignupOwner.jsx";
import OwnerDashboard from "./pages/Owners/OwnerDashboard.jsx";
import TrainerDashboard from "./pages/Trainers/TrainerDashboard.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signupTrainer" element={<SignupTrainer />} />
        <Route path="/signupOwner" element={<SignupOwner />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
