import ShelterProfile from "../../models/profiles/ShelterProfile.js";

const shelterDashboardController = {
  getDashboardData: async (req, res) => {
    try {
      const profile = await ShelterProfile.findOne({
        shelterId: req.userId,
      }).populate("shelterId", "email role");

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: "Profile not found",
        });
      }

      const stats = {
        totalPets: profile.currentPets || 0,
        capacity: profile.capacity || 0,
        pendingApplications: 0,
        scheduledCheckups: 0,
        scheduledMeetings: 0,
        activeChats: 0,
      };

      const recentApplications = [];
      const upcomingCheckups = [];
      const scheduledMeetings = [];
      const recentlyAddedPets = [];

      return res.json({
        success: true,
        data: {
          profile: {
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            address: profile.address,
            bio: profile.bio,
            specialization: profile.specialization,
            experience: profile.experience,
            capacity: profile.capacity,
            currentPets: profile.currentPets,
            avatar: profile.avatar,
            isVerified: profile.isVerified,
            profileCompleted: profile.profileCompleted,
          },
          stats,
          recentApplications,
          upcomingCheckups,
          scheduledMeetings,
          recentlyAddedPets,
        },
      });
    } catch (err) {
      console.error("Get shelter dashboard error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch dashboard data",
      });
    }
  },

  getStats: async (req, res) => {
    try {
      const profile = await ShelterProfile.findOne({
        shelterId: req.userId,
      });

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: "Profile not found",
        });
      }

      const stats = {
        totalPets: profile.currentPets || 0,
        capacity: profile.capacity || 0,
        pendingApplications: 0,
        scheduledCheckups: 0,
        scheduledMeetings: 0,
        activeChats: 0,
      };

      return res.json({
        success: true,
        stats,
      });
    } catch (err) {
      console.error("Get shelter stats error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch stats",
      });
    }
  },
};

export default shelterDashboardController;
