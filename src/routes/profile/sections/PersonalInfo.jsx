import { useState } from "react";
import { User, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../../contexts/AuthContext";
import Button from "../../../components/Common/Button";
import ProfileInput from "../../../components/Profile/ProfileInput";
import ProfileCard from "../../../components/Profile/ProfileCard";

function PersonalInfo() {
  const { handleProfileInfo, personalInfo } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleProfileInfoUpdate = async (e) => {
    e.preventDefault();

    if (!personalInfo.fullName.trim() || !personalInfo.email.trim()) {
      toast.error("please input your detail");
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Updated profile info:", personalInfo);

      toast.success("profile updated successfully");
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ProfileCard title="Personal Information">
        <form onSubmit={handleProfileInfoUpdate} className="space-y-4">
          <ProfileInput
            label="Full Name"
            placeholder="Your Name"
            icon={User}
            value={personalInfo.fullName}
            onChange={handleProfileInfo("fullName")}
          />

          <ProfileInput
            label="Email Address"
            placeholder="Your Email"
            icon={Mail}
            value={personalInfo.email}
            onChange={handleProfileInfo("email")}
          />

          <Button
            text={isLoading ? "Saving..." : "Save Changes"}
            type="primary"
            optionalClassName="px-6 py-2.5"
            disabled={isLoading}
          />
        </form>
      </ProfileCard>
    </div>
  );
}

export default PersonalInfo;
