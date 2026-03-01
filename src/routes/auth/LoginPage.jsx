import React from "react";
import LoginForm from "../../components/Forms/LoginForm";

function LoginPage() {
  return (
    <div className="px-4 py-12 flex flex-col gap-4 items-center justify-center">
      <img src="/logo.png" className="w-20 h-fit" />
      <div className="text-center">
        <h1 className="font-bold text-text text-2xl lg:text-4xl">
          Welcome Back
        </h1>
        <p className="text-text/70 text-sm sm:text-base">
          Sign in to your account to continue
        </p>
      </div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
