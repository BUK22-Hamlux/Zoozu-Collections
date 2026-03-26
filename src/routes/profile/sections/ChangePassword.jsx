import { useState } from "react";
import ProfileCard from "../../../components/Profile/ProfileCard";
import Input from "../../../components/Common/Input";
import Button from "../../../components/Common/Button";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import useFormValidation from "../../../hooks/useFormValidation";
import { required, minLength, match } from "../../../utils/validationRules";

function ChangePassword() {
  const validationRules = {
    currentPassword: [required("current password")],
    newPassword: [required("new password"), minLength(6)],
    confirmPassword: [
      required("confirm password"),
      minLength(6),
      match("newPassword"),
    ],
  };
  const { values, errors, handleChange, validate, resetForm } =
    useFormValidation(
      {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationRules,
    );

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsLoading(true);

      // simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Password updated successfully!");
      resetForm();
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
