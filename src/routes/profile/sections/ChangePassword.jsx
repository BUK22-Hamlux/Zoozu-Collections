import { useState } from "react";
import ProfileCard from "../../../components/Profile/ProfileCard";
import Input from "../../../components/Common/Input";
import Button from "../../../components/Common/Button";
import BouncingDots from "../../../components/Common/BouncingDots";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../../contexts/AuthContext";
import useFormValidation from "../../../hooks/useFormValidation";
import { required, minLength, match } from "../../../utils/validationRules";

function ChangePassword() {
  const { updatePassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const validationRules = {
    currentPassword: [required("current password")],
    newPassword: [required("new password"), minLength(6)],
    // match() checks that confirmPassword === values.newPassword
    confirmPassword: [required("confirm password"), match("newPassword")],
  };

  const { values, errors, handleChange, validate, resetForm, setErrors } =
    useFormValidation(
      { currentPassword: "", newPassword: "", confirmPassword: "" },
      validationRules,
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run format/length checks first
    if (!validate()) return;

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // updatePassword returns null on success or an error string on failure.
      // It checks the current password against the stored one in localStorage.
      const error = updatePassword(values.currentPassword, values.newPassword);

      if (error) {
        // Show the error on the currentPassword field specifically
        setErrors((prev) => ({ ...prev, currentPassword: error }));
        toast.error(error);
        return;
      }

      toast.success("Password updated successfully!");
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileCard title="Change Password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="currentPassword"
          label="Current Password"
          icon={Lock}
          type="password"
          placeholder="••••••••"
          value={values.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
        />

        <Input
          name="newPassword"
          label="New Password"
          icon={Lock}
          type="password"
          placeholder="••••••••"
          value={values.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
        />

        <Input
          name="confirmPassword"
          label="Confirm New Password"
          icon={Lock}
          type="password"
          placeholder="••••••••"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Button
          htmlType="submit"
          type="primary"
          disabled={isLoading}
          text={isLoading ? <BouncingDots /> : "Update Password"}
          optionalClassName="px-6 py-2.5"
        />
      </form>
    </ProfileCard>
  );
}

export default ChangePassword;
