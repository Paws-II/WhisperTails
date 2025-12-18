import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Heart,
  FileText,
  Stethoscope,
  MessageCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Shield,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import NavbarShelter from "../../components/Shelters/NavbarShelter";
import FullPageLoader from "../../Common/FullPageLoader";
import FullPageError from "../../Common/FullPageError";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ShelterDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [pets, setPets] = useState([]);
  const [applications, setApplications] = useState([]);
  const [checkups, setCheckups] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [stats, setStats] = useState({
    totalPets: 0,
    pendingApplications: 0,
    scheduledCheckups: 0,
    activeChats: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/api/auth/shelter/profile`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setProfile(response.data.profile);

        setStats({
          totalPets: 47,
          pendingApplications: 12,
          scheduledCheckups: 8,
          activeChats: 23,
        });

        setApplications([
          {
            id: 1,
            petName: "Luna",
            applicantName: "Sarah Johnson",
            status: "pending",
            date: "2025-12-18",
          },
          {
            id: 2,
            petName: "Max",
            applicantName: "John Smith",
            status: "approved",
            date: "2025-12-17",
          },
          {
            id: 3,
            petName: "Bella",
            applicantName: "Emma Davis",
            status: "pending",
            date: "2025-12-16",
          },
        ]);

        setCheckups([
          {
            id: 1,
            petName: "Rocky",
            type: "Vaccination",
            date: "2025-12-20",
            time: "10:00 AM",
          },
          {
            id: 2,
            petName: "Daisy",
            type: "Health Check",
            date: "2025-12-21",
            time: "2:30 PM",
          },
        ]);

        setMeetings([
          {
            id: 1,
            title: "Adoption Interview",
            ownerName: "Michael Brown",
            date: "2025-12-19",
            time: "3:00 PM",
          },
          {
            id: 2,
            title: "Pet Training Session",
            ownerName: "Lisa Anderson",
            date: "2025-12-22",
            time: "11:00 AM",
          },
        ]);

        setPets([
          { id: 1, name: "Charlie", breed: "Golden Retriever", age: 2 },
          { id: 2, name: "Milo", breed: "Beagle", age: 1 },
          { id: 3, name: "Lucy", breed: "Siamese Cat", age: 3 },
        ]);
      }
    } catch (err) {
      console.error("Data fetch error:", err);
      setError("Failed to load shelter data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) return <FullPageLoader />;
  if (error) return <FullPageError message={error} onRetry={fetchAllData} />;
  const shelterData = {
    name: profile?.name || "Shelter",
    email: profile?.email || "shelter@example.com",
    phone: profile?.phone || "Not set",
    address: profile?.address || "Not set",
    specialization: profile?.specialization || "General Care",
    experience: profile?.experience || 0,
    avatar:
      profile?.avatar && profile.avatar !== "something(url)"
        ? profile.avatar
        : null,
  };

  return (
    <div className="min-h-screen bg-[#1e202c] flex">
      <NavbarShelter onLogout={handleLogout} />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="group relative overflow-hidden rounded-2xl bg-[#4a5568] p-8 md:p-10 shadow-2xl shadow-[#4a5568]/20 transition-shadow hover:shadow-[#4a5568]/30">
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl tracking-tight leading-tight">
                    Welcome back, {shelterData.name}! 🏠
                  </h1>
                  <p className="max-w-2xl text-base font-medium text-white/90 md:text-lg leading-relaxed">
                    Managing care and finding homes for our furry friends
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-white/10 blur-xl" />
                    <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-[#31323e] bg-[#4a5568]">
                      {shelterData.avatar ? (
                        <img
                          src={shelterData.avatar}
                          alt="Shelter"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Shield size={40} className="text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-110" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Total Pets",
                value: stats.totalPets,
                icon: Heart,
                color: "bg-[#4a5568]",
              },
              {
                label: "Pending Applications",
                value: stats.pendingApplications,
                icon: FileText,
                color: "bg-[#5a6678]",
              },
              {
                label: "Scheduled Checkups",
                value: stats.scheduledCheckups,
                icon: Stethoscope,
                color: "bg-[#6a7788]",
              },
              {
                label: "Active Chats",
                value: stats.activeChats,
                icon: MessageCircle,
                color: "bg-[#7a8898]",
              },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="group cursor-pointer rounded-xl border border-[#4a5568]/20 bg-[#31323e] p-6 text-center transition-all duration-300 hover:border-[#4a5568]/50 hover:bg-[#31323e]/80 hover:shadow-lg hover:shadow-[#4a5568]/20 hover:scale-105"
                >
                  <div className="mb-4 flex justify-center">
                    <div className={`rounded-lg ${stat.color} p-3`}>
                      <Icon size={24} className="text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-white transition-transform group-hover:scale-110">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#bfc0d1]/80">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent Applications */}
              <div className="rounded-2xl border border-[#4a5568]/20 bg-[#31323e] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#4a5568] p-2">
                      <FileText size={20} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      Recent Applications
                    </h2>
                  </div>
                  <Link
                    to="/applications"
                    className="text-sm font-semibold text-[#4a5568] hover:text-[#5a6678] transition-colors"
                  >
                    View All →
                  </Link>
                </div>

                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="rounded-xl border border-[#4a5568]/10 bg-[#1e202c]/50 p-4 transition-all hover:border-[#4a5568]/30 hover:bg-[#1e202c]/80"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">
                          {app.petName}
                        </h3>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            app.status === "approved"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#bfc0d1]/80 mb-1">
                        {app.applicantName}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#bfc0d1]/60">
                        <Clock size={14} />
                        <span>{app.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Checkups */}
              <div className="rounded-2xl border border-[#4a5568]/20 bg-[#31323e] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#5a6678] p-2">
                      <Stethoscope size={20} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      Upcoming Checkups
                    </h2>
                  </div>
                  <Link
                    to="/checkup"
                    className="text-sm font-semibold text-[#4a5568] hover:text-[#5a6678] transition-colors"
                  >
                    View All →
                  </Link>
                </div>

                <div className="space-y-3">
                  {checkups.map((checkup) => (
                    <div
                      key={checkup.id}
                      className="rounded-xl border border-[#4a5568]/10 bg-[#1e202c]/50 p-4 transition-all hover:border-[#4a5568]/30 hover:bg-[#1e202c]/80"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-white">
                            {checkup.petName}
                          </h3>
                          <p className="text-sm text-[#4a5568]">
                            {checkup.type}
                          </p>
                        </div>
                        <CheckCircle size={20} className="text-[#4a5568]" />
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#bfc0d1]/60">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{checkup.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{checkup.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Scheduled Meetings */}
              <div className="rounded-2xl border border-[#4a5568]/20 bg-[#31323e] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#6a7788] p-2">
                      <Calendar size={20} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      Scheduled Meetings
                    </h2>
                  </div>
                  <Link
                    to="/schedule-meeting"
                    className="text-sm font-semibold text-[#4a5568] hover:text-[#5a6678] transition-colors"
                  >
                    View All →
                  </Link>
                </div>

                <div className="space-y-3">
                  {meetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="rounded-xl border border-[#4a5568]/10 bg-[#1e202c]/50 p-4 transition-all hover:border-[#4a5568]/30 hover:bg-[#1e202c]/80"
                    >
                      <h3 className="font-semibold text-white mb-1">
                        {meeting.title}
                      </h3>
                      <p className="text-sm text-[#bfc0d1]/80 mb-2">
                        {meeting.ownerName}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[#bfc0d1]/60">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{meeting.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{meeting.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recently Added Pets */}
              <div className="rounded-2xl border border-[#4a5568]/20 bg-[#31323e] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#7a8898] p-2">
                      <Heart size={20} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      Recently Added Pets
                    </h2>
                  </div>
                  <Link
                    to="/my-pets"
                    className="text-sm font-semibold text-[#4a5568] hover:text-[#5a6678] transition-colors"
                  >
                    View All →
                  </Link>
                </div>

                <div className="space-y-3">
                  {pets.map((pet) => (
                    <div
                      key={pet.id}
                      className="flex items-center gap-4 rounded-xl border border-[#4a5568]/10 bg-[#1e202c]/50 p-4 transition-all hover:border-[#4a5568]/30 hover:bg-[#1e202c]/80"
                    >
                      <div className="h-14 w-14 rounded-xl bg-[#4a5568]/20 flex items-center justify-center">
                        <Heart size={24} className="text-[#4a5568]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{pet.name}</h3>
                        <p className="text-sm text-[#bfc0d1]/80">{pet.breed}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#bfc0d1]/60">Age</p>
                        <p className="font-semibold text-[#4a5568]">
                          {pet.age}y
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shelter Profile Card */}
            <div className="rounded-2xl border border-[#4a5568]/20 bg-[#31323e] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-[#4a5568] p-2">
                  <Award size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Shelter Information
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 text-[#4a5568]" />
                  <div>
                    <p className="mb-1 text-xs text-[#bfc0d1]/60">Email</p>
                    <p className="text-sm text-[#bfc0d1]">
                      {shelterData.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 text-[#4a5568]" />
                  <div>
                    <p className="mb-1 text-xs text-[#bfc0d1]/60">Phone</p>
                    <p className="text-sm text-[#bfc0d1]">
                      {shelterData.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 text-[#4a5568]" />
                  <div>
                    <p className="mb-1 text-xs text-[#bfc0d1]/60">Address</p>
                    <p className="text-sm text-[#bfc0d1]">
                      {shelterData.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award size={18} className="mt-0.5 text-[#4a5568]" />
                  <div>
                    <p className="mb-1 text-xs text-[#bfc0d1]/60">
                      Specialization
                    </p>
                    <p className="text-sm text-[#bfc0d1]">
                      {shelterData.specialization}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp size={18} className="mt-0.5 text-[#4a5568]" />
                  <div>
                    <p className="mb-1 text-xs text-[#bfc0d1]/60">Experience</p>
                    <p className="text-sm text-[#bfc0d1]">
                      {shelterData.experience} years
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterDashboard;
