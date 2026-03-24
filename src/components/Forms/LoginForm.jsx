import { useState } from "react";
import BouncingDots from "../Common/BouncingDots";
import Input from "../Common/Input";
import { Github } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Common/Button";
import useFormValidation from "../../hooks/useFormValidation";
import { required, email, minLength } from "../../utils/validationRules";
import { useAuth } from "../../contexts/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const validationRules = {
    email: [required("Email"), email()],
    password: [required("Password"), minLength(6)],
  };

  const { values, errors, handleChange, validate } = useFormValidation(
    {
      email: "",
      password: "",
    },
    validationRules,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const loginUser = login(values);
      if (loginUser) {
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
      <div className="w-full max-w-md bg-background rounded-2xl p-8 border border-text/10 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="you@example.com"
            type="email"
            label="Email Address"
            onChange={handleChange}
            value={values.email}
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
            value={values.password}
            name="password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
          <div className="flex justify-between text-sm items-center text-text">
            <label className="flex gap-2 items-center">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          {/* Same fix as RegisterForm — htmlType="submit" required after the
              Button accessibility update changed how the HTML type is set. */}
          <Button
            disabled={isLoading}
            text={isLoading ? <BouncingDots /> : "Sign In"}
            type="primary"
            htmlType="submit"
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
            className="flex items-center justify-center gap-2 px-4 py-2 border border-text/50 rounded-xl hover:bg-section transition-colors text-text font-medium"
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
            className="flex items-center justify-center gap-2 px-4 py-2 border border-text/50 rounded-xl hover:bg-section transition-colors text-text font-medium"
          >
            <Github size={20} aria-hidden="true" />
            GitHub
          </button>
        </div>
      </div>

      <p className="mt-8 text-text/70">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-500 font-semibold cursor-pointer hover:underline"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}

export default LoginForm;
