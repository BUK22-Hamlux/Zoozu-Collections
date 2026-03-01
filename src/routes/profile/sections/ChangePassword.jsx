import { useState } from "react";
import ProfileCard from "../../../components/Profile/ProfileCard";
import ProfileInput from "../../../components/Profile/ProfileInput";
import Button from "../../../components/Common/Button";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

function ChangePassword() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (field) => (e) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };
  // validation function
  const validate = () => {
    const newErrors = {};

    if (!passwords.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwords.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwords.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!passwords.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);

      // simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Password updated:", passwords);

      toast.success("Password updated successfully!");

      // reset form
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      toast.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileCard title="Change Password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <ProfileInput
          label="Current Password"
          icon={Lock}
          type="password"
          placeholder="••••••••"
          value={passwords.currentPassword}
          onChange={handlePasswordChange("currentPassword")}
          error={errors.currentPassword}
        />

        <ProfileInput
          label="New Password"
          icon={Lock}
          type="password"
          placeholder="••••••••"
          value={passwords.newPassword}
          onChange={handlePasswordChange("newPassword")}
          error={errors.newPassword}
        />

        <ProfileInput
          label="Confirm New Password"
          icon={Lock}
          type="password"
          placeholder="••••••••"
          value={passwords.confirmPassword}
          onChange={handlePasswordChange("confirmPassword")}
          error={errors.confirmPassword}
        />

        <Button
          text={isLoading ? "Updating..." : "Update Password"}
          type="primary"
          optionalClassName="px-6 py-2.5"
          disabled={isLoading}
        />
      </form>
    </ProfileCard>
  );
}

export default ChangePassword;
