import React, { useState } from "react";
import Input from "../Common/Input";
import { Github } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Common/Button";
import { useAuth } from "../../contexts/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.email.includes("@"))
      newErrors.email = "Valid email is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 chars";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    login(formData);
    navigate("/dashboard");
  };

  return (
    <>
      <div className="w-full max-w-md bg-background rounded-2xl p-8 border border-text/10 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="you@example.com"
            type="email"
            label="Email Address"
            onChange={handleChange}
            value={formData.email}
            name="email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
          <Input
            placeholder="••••••••"
            type="password"
            label="Password"
            onChange={handleChange}
            value={formData.password}
            name="password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
          <div className="flex justify-between text-sm items-center text-text">
            <label className="flex gap-2 items-center">
              <input type="checkbox" className=""></input>Remember me
            </label>
            <NavLink>Forgot Password?</NavLink>
          </div>
          <Button
            text="Sign In"
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
        Don't have an account?{" "}
        <NavLink
          to={"/register"}
          className="text-blue-500 font-semibold cursor-pointer hover:underline"
        >
          Sign up
        </NavLink>
      </p>
    </>
  );
}

export default LoginForm;
