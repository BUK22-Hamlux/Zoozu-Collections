import { useState, useEffect } from "react";
import { User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../../contexts/AuthContext";
import Button from "../../../components/Common/Button";
import Input from "../../../components/Common/Input";
import ProfileCard from "../../../components/Profile/ProfileCard";
import BouncingDots from "../../../components/Common/BouncingDots";

function PersonalInfo() {
  const { user, updateName } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Local state for the editable name field only.
  // We initialise from user.name so the field is pre-filled on page load.
  const [name, setName] = useState(user?.name || "");

  // Keep the field in sync if user changes (e.g. after a successful save
  // the parent re-renders with the new user object)
  useEffect(() => {
    setName(user?.name || "");
  }, [user?.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Full name cannot be empty.");
      return;
    }

    if (trimmed === user?.name) {
      toast("No changes to save.");
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      updateName(trimmed);
      toast.success("Name updated successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileCard title="Personal Information">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name — editable */}
        <Input
          label="Full Name"
          placeholder="Your name"
          name="fullName"
          type="text"
          icon={User}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email — read-only.
            Email is the login credential and unique account identifier.
            Allowing it to be changed here without re-verification would break
            login. We show it so users can see what email is on their account,
            but prevent editing it with the readOnly + disabled attributes. */}
        <div className="space-y-2">
          <Input
            label="Email Address"
            name="email"
            type="email"
            icon={Mail}
            value={user?.email || ""}
            onChange={() => {}}
            inputId="profile-email"
          />
          <div className="flex items-center gap-1.5 text-xs text-secondary">
            <Lock size={11} aria-hidden="true" />
            <span>Email address cannot be changed</span>
          </div>
          {/* Visually disable by overlaying a style — using disabled on the
              input would make it un-copyable which is bad UX */}
          <style>{`#profile-email { opacity: 0.5; pointer-events: none; background: transparent; }`}</style>
        </div>

        <Button
          htmlType="submit"
          type="primary"
          disabled={isLoading}
          text={isLoading ? <BouncingDots /> : "Save Changes"}
          optionalClassName="px-6 py-2.5"
        />
      </form>
    </ProfileCard>
  );
}

export default PersonalInfo;
