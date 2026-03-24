import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Github } from "lucide-react";
import Input from "../Common/Input";
import Button from "../Common/Button";
import BouncingDots from "../Common/BouncingDots";
import { NavLink, useNavigate } from "react-router-dom";
import { required, minLength, email, match } from "../../utils/validationRules";
import useFormValidation from "../../hooks/useFormValidation";

function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const validationRules = {
    fullName: [required("Full name")],
    email: [required("Email"), email()],
    password: [required("Password"), minLength(6)],
    confirmPassword: [required("Confirm password"), match("password")],
  };

  const { values, errors, handleChange, validate } = useFormValidation(
    {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationRules,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const registerUser = register(values);
      if (registerUser) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-md bg-background rounded-2xl p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Your name"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName}</p>
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}

          <Button
            htmlType="submit"
            type="primary"
            disabled={isLoading}
            text={isLoading ? <BouncingDots /> : "Create Account"}
            optionalClassName="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
          />
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-text/50"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-text">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-text/50 rounded-xl hover:bg-section"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              className="w-5 h-5"
              alt="Google"
            />
            Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-text/50 rounded-xl hover:bg-section"
          >
            <Github size={20} aria-hidden="true" />
            GitHub
          </button>
        </div>
      </div>

      <p className="mt-8 text-text/70">
        Already have an account?{" "}
        <NavLink
          to="/login"
          className="text-blue-500 font-semibold hover:underline"
        >
          Sign in
        </NavLink>
      </p>
    </>
  );
}

export default RegisterForm;
