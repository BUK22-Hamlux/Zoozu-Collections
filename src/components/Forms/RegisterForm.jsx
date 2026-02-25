import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Github } from "lucide-react";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { NavLink } from "react-router-dom";

function RegisterForm() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Valid email is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 chars";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    register(formData);
  };

  return (
    <>
      <div className="w-full max-w-md bg-background rounded-2xl p-8  shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Your name"
            onChange={handleChange}
            value={formData.fullName}
            name="fullName"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName}</p>
          )}
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            onChange={handleChange}
            value={formData.email}
            name="email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
          <Input
            label="Password"
            type="password"
            onChange={handleChange}
            placeholder="••••••••"
            value={formData.password}
            name="password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            onChange={handleChange}
            value={formData.confirmPassword}
            name="confirmPassword"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}

          <Button
            text="Create Account"
            type="primary"
            optionalClassName="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
          />
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-text/50"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-text ">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-text/50 rounded-xl hover:bg-section transition-colors text-text font-medium">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              className="w-5 h-5"
              alt="Google"
            />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-text/50 rounded-xl hover:bg-section transition-colors text-text font-medium">
            <Github size={20} />
            GitHub
          </button>
        </div>
      </div>

      <p className="mt-8 text-text/70">
        Already have an account?{" "}
        <NavLink
          to={"/login"}
          className="text-blue-500 font-semibold cursor-pointer hover:underline"
        >
          Sign in
        </NavLink>
      </p>
    </>
  );
}

export default RegisterForm;
