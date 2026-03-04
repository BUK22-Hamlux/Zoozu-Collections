import toast from "react-hot-toast";
import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const register = (userData) => {
    setUser({ name: userData.fullName, email: userData.email });
    toast.success("Registration successful");
  };

  const login = (userData) => {
    setUser({ email: userData.email, password: userData.password });
    toast.success("Login successful");
    setLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setLoggedIn(false);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        loggedIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
